import type { Project, Node, Dependency, Rule, ConflictDetectionResult, RuleValidationResult, CornerstoneData } from '../../shared/types'

const API_BASE = '/api'

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers
    },
    ...options
  })
  
  const data = await response.json()
  
  if (!data.success) {
    throw new Error(data.error || '请求失败')
  }
  
  return data.data
}

export const api = {
  async listProjects(): Promise<Project[]> {
    return fetchApi<Project[]>('/projects')
  },
  
  async createProject(name: string, description: string, cornerstoneData: CornerstoneData): Promise<{ id: number }> {
    return fetchApi('/projects', {
      method: 'POST',
      body: JSON.stringify({ name, description, cornerstone_data: cornerstoneData })
    })
  },
  
  async getProject(id: number): Promise<{ project: Project; nodes: Node[]; dependencies: Dependency[] }> {
    return fetchApi(`/projects/${id}`)
  },
  
  async updateProject(id: number, data: Partial<Project>): Promise<boolean> {
    return fetchApi(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  
  async deleteProject(id: number): Promise<boolean> {
    return fetchApi(`/projects/${id}`, { method: 'DELETE' })
  },
  
  async generatePlan(projectId: number): Promise<{ nodes: Node[]; dependencies: Dependency[]; conflicts: ConflictDetectionResult }> {
    return fetchApi(`/projects/${projectId}/generate`, { method: 'POST' })
  },
  
  async getNodes(projectId: number): Promise<Node[]> {
    return fetchApi(`/projects/${projectId}/nodes`)
  },
  
  async createNode(projectId: number, node: Omit<Node, 'id' | 'project_id'>): Promise<{ id: number }> {
    return fetchApi(`/projects/${projectId}/nodes`, {
      method: 'POST',
      body: JSON.stringify(node)
    })
  },
  
  async updateNode(id: number, data: Partial<Node>): Promise<boolean> {
    return fetchApi(`/nodes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  },
  
  async deleteNode(id: number): Promise<boolean> {
    return fetchApi(`/nodes/${id}`, { method: 'DELETE' })
  },
  
  async getConflicts(projectId: number): Promise<ConflictDetectionResult> {
    return fetchApi(`/projects/${projectId}/conflicts`, { method: 'POST' })
  },
  
  async listRules(): Promise<Rule[]> {
    return fetchApi<Rule[]>('/rules')
  },
  
  async importRules(file: File): Promise<{ count: number }> {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await fetch(`${API_BASE}/rules/import`, {
      method: 'POST',
      body: formData
    })
    
    const data = await response.json()
    
    if (!data.success) {
      throw new Error(data.error || '导入失败')
    }
    
    return data.data
  },
  
  async validateRules(cornerstoneNames: string[]): Promise<RuleValidationResult> {
    return fetchApi('/rules/validate', {
      method: 'POST',
      body: JSON.stringify({ cornerstoneNames })
    })
  },
  
  getRulesTemplateUrl(): string {
    return `${API_BASE}/rules/template`
  },
  
  getProjectExportUrl(projectId: number): string {
    return `${API_BASE}/projects/${projectId}/export`
  }
}
