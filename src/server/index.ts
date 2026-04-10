import express from 'express'
import cors from 'cors'
import multer from 'multer'
import {
  createProject,
  listProjects,
  getProject,
  updateProject,
  deleteProject,
  createNode,
  getNodesByProject,
  updateNode,
  deleteNode,
  deleteNodesByProject,
  createDependency,
  getDependenciesByProject,
  deleteDependenciesByProject,
  listRules,
  clearRules,
  insertRulesBatch
} from './database/index.js'
import { parseRulesFromExcel, exportProjectToExcel, generateRulesTemplate } from './excel.js'
import { generatePlan } from './engine/planGenerator.js'
import { detectConflicts } from './engine/conflictDetector.js'
import { validateRules } from './engine/ruleEvaluator.js'
import type { CornerstoneData, Node, Dependency } from '../shared/types.js'

const app = express()
const upload = multer({ storage: multer.memoryStorage() })

app.use(cors())
app.use(express.json())

app.get('/api/projects', (req, res) => {
  try {
    const projects = listProjects()
    res.json({ success: true, data: projects })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/api/projects', (req, res) => {
  try {
    const { name, description, cornerstone_data } = req.body
    
    if (!name || !cornerstone_data) {
      res.status(400).json({ success: false, error: '缺少必要字段' })
      return
    }
    
    const id = createProject(name, description || '', cornerstone_data as CornerstoneData)
    res.json({ success: true, data: { id } })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.get('/api/projects/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const project = getProject(id)
    
    if (!project) {
      res.status(404).json({ success: false, error: '项目不存在' })
      return
    }
    
    const nodes = getNodesByProject(id)
    const dependencies = getDependenciesByProject(id)
    
    res.json({ success: true, data: { project, nodes, dependencies } })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.put('/api/projects/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const success = updateProject(id, req.body)
    res.json({ success })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.delete('/api/projects/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const success = deleteProject(id)
    res.json({ success })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/api/projects/:id/generate', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const project = getProject(projectId)
    
    if (!project) {
      res.status(404).json({ success: false, error: '项目不存在' })
      return
    }
    
    const rules = listRules()
    if (rules.length === 0) {
      res.status(400).json({ success: false, error: '没有可用的规则，请先导入规则' })
      return
    }
    
    const validation = validateRules(rules, Object.keys(project.cornerstone_data))
    if (!validation.valid) {
      res.status(400).json({ success: false, error: validation.errors.join('; ') })
      return
    }
    
    deleteNodesByProject(projectId)
    deleteDependenciesByProject(projectId)
    
    const generatedNodes = generatePlan(project.cornerstone_data, rules)
    
    const nodeNameToId = new Map<string, number>()
    
    for (const node of generatedNodes) {
      const id = createNode({
        project_id: projectId,
        name: node.name,
        level: node.level,
        profession: node.profession,
        acceptance_standard: node.acceptance_standard,
        start_date: node.start_date,
        end_date: node.end_date,
        is_custom: false,
        offset_remark: node.offset_remark,
        dependency_remark: node.dependency_remark
      })
      nodeNameToId.set(node.name, id)
    }
    
    const nodes = getNodesByProject(projectId)
    
    for (const rule of rules) {
      const nodeId = nodeNameToId.get(rule.name)
      if (!nodeId) continue
      
      for (const dep of rule.dependencies) {
        const dependsOnId = nodeNameToId.get(dep.node)
        if (!dependsOnId) continue
        
        createDependency({
          project_id: projectId,
          node_id: nodeId,
          depends_on: dependsOnId,
          type: dep.type
        })
      }
    }
    
    const dependencies = getDependenciesByProject(projectId)
    const conflicts = detectConflicts(nodes, dependencies)
    
    res.json({ 
      success: true, 
      data: { 
        nodes: getNodesByProject(projectId),
        dependencies: getDependenciesByProject(projectId),
        conflicts
      } 
    })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.get('/api/projects/:id/nodes', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const nodes = getNodesByProject(projectId)
    res.json({ success: true, data: nodes })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/api/projects/:id/nodes', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const nodeData = { ...req.body, project_id: projectId }
    const id = createNode(nodeData)
    res.json({ success: true, data: { id } })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.put('/api/nodes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const success = updateNode(id, req.body)
    res.json({ success })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.delete('/api/nodes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id)
    const success = deleteNode(id)
    res.json({ success })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/api/projects/:id/conflicts', (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const nodes = getNodesByProject(projectId)
    const dependencies = getDependenciesByProject(projectId)
    const conflicts = detectConflicts(nodes, dependencies)
    res.json({ success: true, data: conflicts })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.get('/api/rules', (req, res) => {
  try {
    const rules = listRules()
    res.json({ success: true, data: rules })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/api/rules/import', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, error: '请上传Excel文件' })
      return
    }
    
    const rules = await parseRulesFromExcel(req.file.buffer)
    
    clearRules()
    insertRulesBatch(rules)
    
    res.json({ success: true, data: { count: rules.length } })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.get('/api/rules/template', async (req, res) => {
  try {
    const buffer = await generateRulesTemplate()
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', 'attachment; filename=rules_template.xlsx')
    res.send(buffer)
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.post('/api/rules/validate', (req, res) => {
  try {
    const { cornerstoneNames } = req.body
    const rules = listRules()
    const result = validateRules(rules, cornerstoneNames || [])
    res.json({ success: true, data: result })
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

app.get('/api/projects/:id/export', async (req, res) => {
  try {
    const projectId = parseInt(req.params.id)
    const project = getProject(projectId)
    
    if (!project) {
      res.status(404).json({ success: false, error: '项目不存在' })
      return
    }
    
    const nodes = getNodesByProject(projectId)
    const dependencies = getDependenciesByProject(projectId)
    const conflicts = detectConflicts(nodes, dependencies)
    
    const buffer = await exportProjectToExcel(project, nodes, conflicts.conflicts)
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    res.setHeader('Content-Disposition', `attachment; filename=${project.name}.xlsx`)
    res.send(buffer)
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message })
  }
})

const PORT = process.env.PORT || 3003

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
