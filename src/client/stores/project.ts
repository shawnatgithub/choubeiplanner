import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Project, Node, Dependency, Rule, ConflictDetectionResult } from '../../shared/types'
import { api } from '../api'

export const useProjectStore = defineStore('project', () => {
  const projects = ref<Project[]>([])
  const currentProject = ref<Project | null>(null)
  const nodes = ref<Node[]>([])
  const dependencies = ref<Dependency[]>([])
  const conflicts = ref<ConflictDetectionResult>({ hasErrors: false, conflicts: [] })
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  async function loadProjects() {
    loading.value = true
    error.value = null
    try {
      projects.value = await api.listProjects()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }
  
  async function loadProject(id: number) {
    loading.value = true
    error.value = null
    try {
      const data = await api.getProject(id)
      currentProject.value = data.project
      nodes.value = data.nodes
      dependencies.value = data.dependencies
      await detectConflicts()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }
  
  async function createProject(name: string, description: string, cornerstoneData: Record<string, string>) {
    loading.value = true
    error.value = null
    try {
      const result = await api.createProject(name, description, cornerstoneData)
      await loadProjects()
      return result.id
    } catch (e) {
      error.value = (e as Error).message
      return null
    } finally {
      loading.value = false
    }
  }
  
  async function updateProject(id: number, data: Partial<Project>) {
    loading.value = true
    error.value = null
    try {
      await api.updateProject(id, data)
      if (currentProject.value?.id === id) {
        currentProject.value = { ...currentProject.value, ...data }
      }
      await loadProjects()
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function deleteProject(id: number) {
    loading.value = true
    error.value = null
    try {
      await api.deleteProject(id)
      projects.value = projects.value.filter(p => p.id !== id)
      if (currentProject.value?.id === id) {
        currentProject.value = null
        nodes.value = []
        dependencies.value = []
      }
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function generatePlan() {
    if (!currentProject.value) return false
    
    loading.value = true
    error.value = null
    try {
      const result = await api.generatePlan(currentProject.value.id)
      nodes.value = result.nodes
      dependencies.value = result.dependencies
      conflicts.value = result.conflicts
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function updateNode(nodeId: number, data: Partial<Node>) {
    loading.value = true
    error.value = null
    try {
      await api.updateNode(nodeId, data)
      const index = nodes.value.findIndex(n => n.id === nodeId)
      if (index !== -1) {
        nodes.value[index] = { ...nodes.value[index], ...data }
      }
      await detectConflicts()
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function createNode(node: Omit<Node, 'id' | 'project_id'>) {
    if (!currentProject.value) return null
    
    loading.value = true
    error.value = null
    try {
      const result = await api.createNode(currentProject.value.id, node)
      const newNode: Node = {
        ...node,
        id: result.id,
        project_id: currentProject.value.id
      }
      nodes.value.push(newNode)
      await detectConflicts()
      return result.id
    } catch (e) {
      error.value = (e as Error).message
      return null
    } finally {
      loading.value = false
    }
  }
  
  async function deleteNode(nodeId: number) {
    loading.value = true
    error.value = null
    try {
      await api.deleteNode(nodeId)
      nodes.value = nodes.value.filter(n => n.id !== nodeId)
      dependencies.value = dependencies.value.filter(d => d.node_id !== nodeId && d.depends_on !== nodeId)
      await detectConflicts()
      return true
    } catch (e) {
      error.value = (e as Error).message
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function detectConflicts() {
    if (!currentProject.value) return
    try {
      conflicts.value = await api.getConflicts(currentProject.value.id)
    } catch (e) {
      console.error('Failed to detect conflicts:', e)
    }
  }
  
  function clearCurrentProject() {
    currentProject.value = null
    nodes.value = []
    dependencies.value = []
    conflicts.value = { hasErrors: false, conflicts: [] }
  }
  
  return {
    projects,
    currentProject,
    nodes,
    dependencies,
    conflicts,
    loading,
    error,
    loadProjects,
    loadProject,
    createProject,
    updateProject,
    deleteProject,
    generatePlan,
    updateNode,
    createNode,
    deleteNode,
    detectConflicts,
    clearCurrentProject
  }
})
