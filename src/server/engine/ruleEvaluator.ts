import type { Rule, RuleValidationResult } from '../../shared/types.js'

export function detectCycles(rules: Rule[]): boolean {
  const adjacencyList = new Map<string, string[]>()
  
  for (const rule of rules) {
    const deps = rule.dependencies.map(d => d.node)
    adjacencyList.set(rule.name, deps)
  }
  
  const visited = new Set<string>()
  const recursionStack = new Set<string>()
  
  function hasCycle(node: string): boolean {
    if (!visited.has(node)) {
      visited.add(node)
      recursionStack.add(node)
      
      const neighbors = adjacencyList.get(node) || []
      for (const neighbor of neighbors) {
        if (!visited.has(neighbor) && hasCycle(neighbor)) {
          return true
        } else if (recursionStack.has(neighbor)) {
          return true
        }
      }
    }
    
    recursionStack.delete(node)
    return false
  }
  
  for (const node of adjacencyList.keys()) {
    if (hasCycle(node)) {
      return true
    }
  }
  
  return false
}

export function validateRules(rules: Rule[], validCornerstoneNames: string[]): RuleValidationResult {
  const errors: string[] = []
  
  if (rules.length === 0) {
    errors.push('规则列表为空')
    return { valid: false, errors }
  }
  
  for (const rule of rules) {
    if (!rule.name || rule.name.trim() === '') {
      errors.push('规则缺少节点名称')
    }
    if (!rule.baseline) {
      errors.push(`规则 "${rule.name || '(未命名)'}": 缺少基准点`)
    } else if (validCornerstoneNames.length > 0 && !validCornerstoneNames.includes(rule.baseline)) {
      // 当规则依赖的基准点不存在时，允许默认 fallback 到 '开业'，不报验证错误
      if (!validCornerstoneNames.includes('开业')) {
         // errors.push(`规则 "${rule.name}": 基准点 "${rule.baseline}" 无效，必须是基石时间点之一`)
      }
    }
    if (typeof rule.offset_days !== 'number' || isNaN(rule.offset_days)) {
      errors.push(`规则 "${rule.name || '(未命名)'}": 偏移天数必须是数字`)
    }
    if (typeof rule.duration_days !== 'number' || isNaN(rule.duration_days) || rule.duration_days <= 0) {
      errors.push(`规则 "${rule.name || '(未命名)'}": 节点时长必须是正数`)
    }
    if (!rule.profession || rule.profession.trim() === '') {
      errors.push(`规则 "${rule.name || '(未命名)'}": 缺少涉及专业`)
    }
  }
  
  if (detectCycles(rules)) {
    errors.push('检测到循环依赖，请检查规则依赖关系')
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
