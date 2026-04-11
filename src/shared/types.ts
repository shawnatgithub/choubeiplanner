export interface CornerstoneData {
  [key: string]: string
}

export interface AcceptanceStandard {
  [key: string]: {
    enabled: boolean
    deadline: string | null
  }
}

export interface Rule {
  id?: number
  name: string
  level: number
  profession: string
  acceptance_standard: AcceptanceStandard
  baseline: string
  offset_days: number
  duration_days: number
  dependencies: Array<{
    node: string
    type: 'prerequisite' | 'must_before'
  }>
  offset_remark?: string
  dependency_remark?: string
}

export interface Node {
  id?: number
  project_id: number
  name: string
  level: number
  profession: string
  acceptance_standard: AcceptanceStandard
  start_date: string | null
  end_date: string | null
  is_custom: boolean
  offset_remark?: string
  dependency_remark?: string
}

export interface Dependency {
  id?: number
  project_id: number
  node_id: number
  depends_on: number
  type: 'prerequisite' | 'must_before'
}

export interface Project {
  id: number
  name: string
  description: string | null
  created_at: string
  updated_at: string
  cornerstone_data: CornerstoneData
}

export interface Conflict {
  nodeId: number
  nodeName: string
  severity: 'warning' | 'error'
  message: string
  relatedNodeIds: number[]
}

export interface ConflictDetectionResult {
  hasErrors: boolean
  conflicts: Conflict[]
}

export interface GenerationReport {
  cornerstoneBasedNodes: { name: string; baseline: string }[]
  missingDependencyNodes: string[]
  suggestions: string[]
}

export interface RuleValidationResult {
  valid: boolean
  errors: string[]
}
