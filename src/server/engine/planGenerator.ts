import { addDays } from 'date-fns'
import type { CornerstoneData, Rule, Node } from '../../shared/types.js'

export function generatePlan(cornerstoneData: CornerstoneData, rules: Rule[]): Omit<Node, 'id' | 'project_id'>[] {
  return rules.map(rule => {
    const baselineDateStr = cornerstoneData[rule.baseline]
    if (!baselineDateStr) {
      throw new Error(`基准点 "${rule.baseline}" 在基石时间数据中不存在`)
    }
    
    const baselineDate = new Date(baselineDateStr)
    const startDate = addDays(baselineDate, rule.offset_days)
    const endDate = addDays(startDate, rule.duration_days)
    
    return {
      name: rule.name,
      level: rule.level,
      profession: rule.profession,
      acceptance_standard: rule.acceptance_standard,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      is_custom: false
    }
  })
}
