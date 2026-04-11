import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parse } from 'csv-parse/sync'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CSV_PATH = path.join(__dirname, '../plan-model-time-relation-revised.csv.xls')
const OUT_PATH = path.join(__dirname, '../src/server/engine/defaultRules.ts')

function parseRelativeTime(relativeTimeStr) {
  if (!relativeTimeStr || relativeTimeStr.trim() === '') return 0;
  let months = 0;
  const parts = relativeTimeStr.trim().split(' ');
  for (const part of parts) {
    if (part.includes('/')) {
      const [num, den] = part.split('/');
      if (num && den) {
        months += parseInt(num) / parseInt(den);
      }
    } else {
      months += parseInt(part);
    }
  }
  return Math.round(months * 30) || 0;
}

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

const rules = []
for (const record of records) {
  const name = record['节点']
  if (!name || name === '无' || name === '/') continue
  
  const levelStr = record['节点类型'] || ''
  let level = 3
  if (levelStr === 'M') level = 0
  else if (levelStr === 'S') level = 9
  else if (levelStr.startsWith('L')) level = parseInt(levelStr.replace('L', '')) || 3
  
  let baseline = record['参考时点']
  if (!baseline || baseline === '无') baseline = '开业'
  
  const duration_days = parseRelativeTime(record['相对时间(月)'])
  let offset_days = 0;
  const depRelation = record['依存关系(前X天，-X后X天，+X)'];
  if (depRelation && !isNaN(parseInt(depRelation))) {
    offset_days = parseInt(depRelation);
  } else {
    offset_days = -duration_days;
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
    duration_days: duration_days > 0 ? duration_days : 7,
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
