import { addDays } from 'date-fns'
import type { CornerstoneData, Rule, Node } from '../../shared/types.js'

export function generatePlan(cornerstoneData: CornerstoneData, rules: Rule[]): Omit<Node, 'id' | 'project_id'>[] {
  const nodes: Omit<Node, 'id' | 'project_id'>[] = []
  
  for (const rule of rules) {
    let baselineDateStr = cornerstoneData[rule.baseline]
    
    // 如果规则中的基石时间点在用户提供的数据中不存在，默认使用 '开业' 时间点或抛出异常
    if (!baselineDateStr) {
       if (cornerstoneData['开业']) {
         baselineDateStr = cornerstoneData['开业']
       } else {
         // 跳过没有匹配基准点的节点，或者根据业务逻辑处理
         continue;
       }
    }
    
    const baselineDate = new Date(baselineDateStr)
    const startDate = addDays(baselineDate, rule.offset_days)
    const endDate = addDays(startDate, rule.duration_days)
    
    nodes.push({
      name: rule.name,
      level: rule.level,
      profession: rule.profession,
      acceptance_standard: rule.acceptance_standard,
      start_date: startDate.toISOString().split('T')[0],
      end_date: endDate.toISOString().split('T')[0],
      is_custom: false,
      offset_remark: rule.offset_remark,
      dependency_remark: rule.dependency_remark
    })
  }
  
  return nodes
}
