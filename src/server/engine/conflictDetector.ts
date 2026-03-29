import { isBefore, isAfter, parseISO } from 'date-fns'
import type { Node, Dependency, Conflict, ConflictDetectionResult } from '../../shared/types.js'

export function detectConflicts(nodes: Node[], dependencies: Dependency[]): ConflictDetectionResult {
  const conflicts: Conflict[] = []
  const nodeMap = new Map<number, Node>()
  
  for (const node of nodes) {
    if (node.id) {
      nodeMap.set(node.id, node)
    }
  }
  
  for (const dep of dependencies) {
    const dependentNode = nodeMap.get(dep.node_id)
    const dependencyNode = nodeMap.get(dep.depends_on)
    
    if (!dependentNode || !dependencyNode) continue
    if (!dependentNode.start_date || !dependencyNode.end_date) continue
    
    if (dep.type === 'prerequisite') {
      if (isBefore(parseISO(dependentNode.start_date), parseISO(dependencyNode.end_date))) {
        conflicts.push({
          nodeId: dep.node_id,
          nodeName: dependentNode.name,
          severity: 'error',
          message: `前置依赖冲突: ${dependentNode.name} 必须在 ${dependencyNode.name} 完成后开始，但当前开始时间早于完成时间`,
          relatedNodeIds: [dep.depends_on]
        })
      }
    } else if (dep.type === 'must_before') {
      if (dependentNode.end_date && dependencyNode.start_date) {
        if (!isBefore(parseISO(dependentNode.end_date), parseISO(dependencyNode.start_date))) {
          conflicts.push({
            nodeId: dep.node_id,
            nodeName: dependentNode.name,
            severity: 'warning',
            message: `时序冲突: ${dependentNode.name} 必须在 ${dependencyNode.name} 之前完成，但当前结束时间晚于开始时间`,
            relatedNodeIds: [dep.depends_on]
          })
        }
      }
    }
  }
  
  for (const node of nodes) {
    if (!node.end_date) continue
    
    for (const [key, standard] of Object.entries(node.acceptance_standard)) {
      if (!standard.enabled || !standard.deadline) continue
      
      const deadline = parseISO(standard.deadline)
      if (isAfter(deadline, parseISO(node.end_date))) {
        conflicts.push({
          nodeId: node.id!,
          nodeName: node.name,
          severity: 'warning',
          message: `验收标准冲突: "${key}" 的截止时间 ${standard.deadline} 晚于节点结束时间 ${node.end_date}`,
          relatedNodeIds: []
        })
      }
    }
  }
  
  const hasErrors = conflicts.some(c => c.severity === 'error')
  
  return {
    hasErrors,
    conflicts
  }
}
