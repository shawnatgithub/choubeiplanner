import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { parse } from 'csv-parse/sync'
import { db, insertRulesBatch, clearRules } from './index.js'
import type { Rule } from '../../shared/types.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const CSV_PATH = path.join(__dirname, '../../../plan-model-time-relation-revised.csv.xls')

function parseRelativeTime(relativeTimeStr: string): number {
  if (!relativeTimeStr || relativeTimeStr.trim() === '') return 0;
  
  // 处理类似 "1 1/2" (一个半月) 的格式
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
  
  // 假设一个月按30天计算
  return Math.round(months * 30) || 0;
}

function parseDependencies(depStr: string): Array<{ node: string, type: 'prerequisite' | 'must_before' }> {
  if (!depStr || depStr === '无' || depStr === '自定义') return [];
  
  const deps: Array<{ node: string, type: 'prerequisite' | 'must_before' }> = [];
  
  // 尝试解析 "@1.1/商管服务协议签署" 格式
  const parts = depStr.split('\n');
  for (const part of parts) {
    const match = part.match(/@([0-9.]+)\/(.+)/);
    if (match && match[2]) {
      deps.push({
        node: match[2].trim(),
        type: 'prerequisite'
      });
    } else if (part.trim() && part.trim() !== '无' && part.trim() !== '自定义') {
      deps.push({
        node: part.trim(),
        type: 'prerequisite'
      });
    }
  }
  
  return deps;
}

export function importRulesFromCsv() {
  console.log('开始导入规则...')
  
  if (!fs.existsSync(CSV_PATH)) {
    console.error(`CSV文件不存在: ${CSV_PATH}`)
    return false
  }

  const content = fs.readFileSync(CSV_PATH, 'utf-8')
  
  // 去除可能的BOM头
  const cleanContent = content.replace(/^\uFEFF/, '')
  
  const records = parse(cleanContent, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true
  })
  
  const rules: Omit<Rule, 'id'>[] = []
  
  for (const rec of records) {
    const record = rec as Record<string, string>
    const name = record['节点']
    if (!name || name === '无' || name === '/') continue
    
    // 解析级别，例如 "L2" -> 2, "M" -> 0 (里程碑最高级), "S" -> 9 (特殊级)
    const levelStr = record['节点类型'] || ''
    let level = 3
    if (levelStr === 'M') level = 0
    else if (levelStr === 'S') level = 9
    else if (levelStr.startsWith('L')) level = parseInt(levelStr.replace('L', '')) || 3
    
    // 解析基准点，如果参考时点为空或无，则默认关联到开业
    let baseline = record['参考时点']
    if (!baseline || baseline === '无') {
      baseline = '开业'
    }
    
    // 解析持续时间
    const duration_days = parseRelativeTime(record['相对时间(月)'])
    
    // 解析偏移量 (前置/后置天数)
    let offset_days = 0;
    const depRelation = record['依存关系(前X天，-X后X天，+X)'];
    if (depRelation && !isNaN(parseInt(depRelation))) {
      offset_days = parseInt(depRelation);
    } else {
      // 如果没有明确定义，默认是在基准点之前减去持续时间
      offset_days = -duration_days;
    }
    
    const rule: Omit<Rule, 'id'> = {
      name: name,
      level: level,
      profession: record['节点职能'] || '综合',
      acceptance_standard: {
        '默认验收标准': {
          enabled: true,
          deadline: null
        }
      },
      baseline: baseline,
      offset_days: offset_days,
      duration_days: duration_days > 0 ? duration_days : 7, // 默认最少7天
      dependencies: parseDependencies(record['前置工作'])
    }
    
    rules.push(rule)
  }
  
  // 清空旧规则并插入新规则
  try {
    clearRules()
    insertRulesBatch(rules)
    console.log(`成功导入 ${rules.length} 条规则！`)
    return true
  } catch (error) {
    console.error('导入规则失败:', error)
    return false
  }
}

// 如果直接运行此脚本
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  importRulesFromCsv()
}
