import Database from 'better-sqlite3'
import type { Project, Node, Dependency, Rule, CornerstoneData } from '../shared/types'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DB_PATH = process.env.DB_PATH || path.join(__dirname, '../../../data/planner.db')

export function ensureDatabaseDir() {
  const dbDir = path.dirname(DB_PATH)
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true })
  }
}

export function createDatabase(): Database.Database {
  ensureDatabaseDir()
  const db = new Database(DB_PATH)
  
  db.pragma('journal_mode = WAL')
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      cornerstone_data TEXT
    )
  `)
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS nodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      level INTEGER NOT NULL,
      profession TEXT NOT NULL,
      acceptance_standard TEXT NOT NULL,
      start_date DATE,
      end_date DATE,
      is_custom INTEGER DEFAULT 0,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
    )
  `)
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS dependencies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      project_id INTEGER NOT NULL,
      node_id INTEGER NOT NULL,
      depends_on INTEGER NOT NULL,
      type TEXT NOT NULL,
      FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
      FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE,
      FOREIGN KEY (depends_on) REFERENCES nodes(id) ON DELETE CASCADE
    )
  `)
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS rules (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      level INTEGER NOT NULL,
      profession TEXT NOT NULL,
      acceptance_standard TEXT,
      baseline TEXT,
      offset_days INTEGER,
      duration_days INTEGER,
      dependencies TEXT
    )
  `)
  
  return db
}

export const db = createDatabase()

export function createProject(name: string, description: string, cornerstoneData: CornerstoneData): number {
  const stmt = db.prepare(`
    INSERT INTO projects (name, description, cornerstone_data)
    VALUES (?, ?, ?)
  `)
  const result = stmt.run(name, description, JSON.stringify(cornerstoneData))
  return result.lastInsertRowid as number
}

export function listProjects(): Project[] {
  const stmt = db.prepare(`SELECT * FROM projects ORDER BY updated_at DESC`)
  const rows = stmt.all() as any[]
  return rows.map(row => ({
    ...row,
    cornerstone_data: JSON.parse(row.cornerstone_data || '{}')
  }))
}

export function getProject(id: number): Project | null {
  const stmt = db.prepare(`SELECT * FROM projects WHERE id = ?`)
  const row = stmt.get(id) as any
  if (!row) return null
  return {
    ...row,
    cornerstone_data: JSON.parse(row.cornerstone_data || '{}')
  }
}

export function updateProject(id: number, data: Partial<Project>): boolean {
  const fields: string[] = []
  const values: any[] = []
  
  if (data.name !== undefined) {
    fields.push('name = ?')
    values.push(data.name)
  }
  if (data.description !== undefined) {
    fields.push('description = ?')
    values.push(data.description)
  }
  if (data.cornerstone_data !== undefined) {
    fields.push('cornerstone_data = ?')
    values.push(JSON.stringify(data.cornerstone_data))
  }
  
  if (fields.length === 0) return false
  
  fields.push('updated_at = CURRENT_TIMESTAMP')
  values.push(id)
  
  const stmt = db.prepare(`UPDATE projects SET ${fields.join(', ')} WHERE id = ?`)
  const result = stmt.run(...values)
  return result.changes > 0
}

export function deleteProject(id: number): boolean {
  const stmt = db.prepare(`DELETE FROM projects WHERE id = ?`)
  const result = stmt.run(id)
  return result.changes > 0
}

export function createNode(node: Omit<Node, 'id'>): number {
  const stmt = db.prepare(`
    INSERT INTO nodes (project_id, name, level, profession, acceptance_standard, start_date, end_date, is_custom)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    node.project_id,
    node.name,
    node.level,
    node.profession,
    JSON.stringify(node.acceptance_standard),
    node.start_date,
    node.end_date,
    node.is_custom ? 1 : 0
  )
  return result.lastInsertRowid as number
}

export function getNodesByProject(projectId: number): Node[] {
  const stmt = db.prepare(`SELECT * FROM nodes WHERE project_id = ? ORDER BY level, start_date`)
  const rows = stmt.all(projectId) as any[]
  return rows.map(row => ({
    ...row,
    acceptance_standard: JSON.parse(row.acceptance_standard || '{}'),
    is_custom: row.is_custom === 1
  }))
}

export function updateNode(nodeId: number, data: Partial<Node>): boolean {
  const fields: string[] = []
  const values: any[] = []
  
  if (data.name !== undefined) {
    fields.push('name = ?')
    values.push(data.name)
  }
  if (data.level !== undefined) {
    fields.push('level = ?')
    values.push(data.level)
  }
  if (data.profession !== undefined) {
    fields.push('profession = ?')
    values.push(data.profession)
  }
  if (data.acceptance_standard !== undefined) {
    fields.push('acceptance_standard = ?')
    values.push(JSON.stringify(data.acceptance_standard))
  }
  if (data.start_date !== undefined) {
    fields.push('start_date = ?')
    values.push(data.start_date)
  }
  if (data.end_date !== undefined) {
    fields.push('end_date = ?')
    values.push(data.end_date)
  }
  if (data.is_custom !== undefined) {
    fields.push('is_custom = ?')
    values.push(data.is_custom ? 1 : 0)
  }
  
  if (fields.length === 0) return false
  
  values.push(nodeId)
  
  const stmt = db.prepare(`UPDATE nodes SET ${fields.join(', ')} WHERE id = ?`)
  const result = stmt.run(...values)
  return result.changes > 0
}

export function deleteNode(nodeId: number): boolean {
  const stmt = db.prepare(`DELETE FROM nodes WHERE id = ?`)
  const result = stmt.run(nodeId)
  return result.changes > 0
}

export function deleteNodesByProject(projectId: number): boolean {
  const stmt = db.prepare(`DELETE FROM nodes WHERE project_id = ?`)
  const result = stmt.run(projectId)
  return result.changes > 0
}

export function createDependency(dependency: Omit<Dependency, 'id'>): number {
  const stmt = db.prepare(`
    INSERT INTO dependencies (project_id, node_id, depends_on, type)
    VALUES (?, ?, ?, ?)
  `)
  const result = stmt.run(dependency.project_id, dependency.node_id, dependency.depends_on, dependency.type)
  return result.lastInsertRowid as number
}

export function getDependenciesByProject(projectId: number): Dependency[] {
  const stmt = db.prepare(`SELECT * FROM dependencies WHERE project_id = ?`)
  return stmt.all(projectId) as Dependency[]
}

export function deleteDependenciesByProject(projectId: number): boolean {
  const stmt = db.prepare(`DELETE FROM dependencies WHERE project_id = ?`)
  const result = stmt.run(projectId)
  return result.changes > 0
}

export function listRules(): Rule[] {
  const stmt = db.prepare(`SELECT * FROM rules ORDER BY level, name`)
  const rows = stmt.all() as any[]
  return rows.map(row => ({
    ...row,
    acceptance_standard: JSON.parse(row.acceptance_standard || '{}'),
    dependencies: JSON.parse(row.dependencies || '[]')
  }))
}

export function clearRules(): boolean {
  const stmt = db.prepare(`DELETE FROM rules`)
  stmt.run()
  return true
}

export function insertRule(rule: Omit<Rule, 'id'>): number {
  const stmt = db.prepare(`
    INSERT INTO rules (name, level, profession, acceptance_standard, baseline, offset_days, duration_days, dependencies)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  const result = stmt.run(
    rule.name,
    rule.level,
    rule.profession,
    JSON.stringify(rule.acceptance_standard),
    rule.baseline,
    rule.offset_days,
    rule.duration_days,
    JSON.stringify(rule.dependencies)
  )
  return result.lastInsertRowid as number
}

export function insertRulesBatch(rules: Omit<Rule, 'id'>[]): void {
  const insert = db.prepare(`
    INSERT INTO rules (name, level, profession, acceptance_standard, baseline, offset_days, duration_days, dependencies)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  
  const insertMany = db.transaction((rules: Omit<Rule, 'id'>[]) => {
    for (const rule of rules) {
      insert.run(
        rule.name,
        rule.level,
        rule.profession,
        JSON.stringify(rule.acceptance_standard),
        rule.baseline,
        rule.offset_days,
        rule.duration_days,
        JSON.stringify(rule.dependencies)
      )
    }
  })
  
  insertMany(rules)
}
