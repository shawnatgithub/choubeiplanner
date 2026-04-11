import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parse } from 'csv-parse/sync'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CSV_PATH = path.join(__dirname, '../plan-model-time-relation-revised.csv.xls')
const OUT_PATH = path.join(__dirname, '../src/server/engine/defaultRules.ts')

function parseDependencies(depStr) {
  if (!depStr || depStr === '无' || depStr === '自定义') return [];
  const deps = [];
  const parts = depStr.split('\n');
  for (const part of parts) {
    const match = part.match(/@([0-9.]+)\/(.+)/);
    if (match && match[2]) {
      deps.push({ node: match[2].trim(), type: 'prerequisite' });
    } else if (part.trim() && part.trim() !== '无' && part.trim() !== '自定义') {
      deps.push({ node: part.trim(), type: 'prerequisite' });
    }
  }
  return deps;
}

const content = fs.readFileSync(CSV_PATH, 'utf-8')
const cleanContent = content.replace(/^\uFEFF/, '')
const records = parse(cleanContent, { columns: true, skip_empty_lines: true, relax_column_count: true })

const validRecords = records.filter(r => r['节点'] && r['节点'] !== '无' && r['节点'] !== '/')

const nodeDates = new Map()
validRecords.forEach(r => {
  const dStr = r['计划完成时点（交总部)']
  if (dStr) {
    const d = new Date(dStr)
    if (!isNaN(d.getTime())) {
      nodeDates.set(r['节点'], d)
    }
  }
})

const kaiyeDate = nodeDates.get('开业') || new Date('2027-11-01')

const rules = []
for (const record of validRecords) {
  const name = record['节点']
  
  const levelStr = record['节点类型'] || ''
  let level = 3
  if (levelStr === 'M') level = 0
  else if (levelStr === 'S') level = 9
  else if (levelStr.startsWith('L')) level = parseInt(levelStr.replace('L', '')) || 3
  
  let baseline = record['参考时点']
  if (!baseline || baseline === '无') baseline = '开业'
  
  const nodeDate = nodeDates.get(name)
  let baseDate = nodeDates.get(baseline)
  if (!baseDate) {
    baseline = '开业'
    baseDate = kaiyeDate
  }
  
  let offset_days = 0
  if (nodeDate && baseDate) {
    offset_days = Math.round((nodeDate - baseDate) / (1000 * 60 * 60 * 24))
  } else {
    // Fallback if date is missing (e.g. "本项目无此节点")
    // Use the explicit '依存关系' or '相对时间' if available
    const depRelation = record['依存关系(前X天，-X后X天，+X)']
    if (depRelation && !isNaN(parseInt(depRelation))) {
      offset_days = parseInt(depRelation)
    } else {
      // Just fallback to 0
      offset_days = 0
    }
  }
  
  rules.push({
    name: name,
    level: level,
    profession: record['节点职能'] || '综合',
    acceptance_standard: {
      '默认验收标准': { enabled: true, deadline: null }
    },
    baseline: baseline,
    offset_days: offset_days,
    duration_days: 1, // 默认 1 天
    dependencies: parseDependencies(record['前置工作']),
    offset_remark: record['依存关系(前X天，-X后X天，+X)'] || '',
    dependency_remark: record['前置工作'] || ''
  })
}

const fileContent = `// 此文件由自动脚本生成，作为系统默认计划规则库
import type { Rule } from '../../shared/types.js'

export const defaultRules: Omit<Rule, 'id'>[] = ${JSON.stringify(rules, null, 2)}
`

fs.writeFileSync(OUT_PATH, fileContent)
console.log(`生成静态规则文件成功！共 ${rules.length} 条规则，保存在 ${OUT_PATH}`)
