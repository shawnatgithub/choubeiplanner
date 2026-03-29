import ExcelJS from 'exceljs'
import type { Rule, Project, Node, Conflict } from '../../shared/types'

export async function parseRulesFromExcel(buffer: Buffer): Promise<Rule[]> {
  const workbook = new ExcelJS.Workbook()
  await workbook.xlsx.load(buffer)
  const worksheet = workbook.getWorksheet(1)
  
  if (!worksheet) {
    throw new Error('Excel文件中未找到工作表')
  }
  
  const rules: Rule[] = []
  
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return
    
    const name = row.getCell(1).value?.toString() || ''
    if (!name) return
    
    const dependenciesCell = row.getCell(7).value?.toString() || ''
    let dependencies: Array<{ node: string; type: 'prerequisite' | 'must_before' }> = []
    
    if (dependenciesCell) {
      const depNames = dependenciesCell.split(',').map(s => s.trim()).filter(Boolean)
      dependencies = depNames.map(name => ({ node: name, type: 'prerequisite' as const }))
    }
    
    const defaultAcceptance = {
      '我方交付': { enabled: true, deadline: null },
      '业主验收': { enabled: true, deadline: null },
      '业主付款': { enabled: false, deadline: null }
    }
    
    rules.push({
      name,
      level: Number(row.getCell(2).value) || 1,
      profession: row.getCell(3).value?.toString() || '',
      baseline: row.getCell(4).value?.toString() || '',
      offset_days: Number(row.getCell(5).value) || 0,
      duration_days: Number(row.getCell(6).value) || 1,
      acceptance_standard: defaultAcceptance,
      dependencies
    })
  })
  
  return rules
}

export async function exportProjectToExcel(
  project: Project,
  nodes: Node[],
  conflicts: Conflict[]
): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook()
  
  const ws1 = workbook.addWorksheet('项目信息')
  ws1.addRow(['项目名称', project.name])
  ws1.addRow(['项目描述', project.description || ''])
  ws1.addRow(['创建时间', project.created_at])
  ws1.addRow(['更新时间', project.updated_at])
  ws1.addRow([])
  ws1.addRow(['基石时间点'])
  for (const [name, date] of Object.entries(project.cornerstone_data)) {
    ws1.addRow([name, date])
  }
  
  const ws2 = workbook.addWorksheet('节点列表')
  ws2.columns = [
    { header: '节点名称', key: 'name', width: 30 },
    { header: '分级', key: 'level', width: 8 },
    { header: '专业', key: 'profession', width: 15 },
    { header: '开始日期', key: 'start_date', width: 15 },
    { header: '结束日期', key: 'end_date', width: 15 },
    { header: '自定义', key: 'is_custom', width: 10 }
  ]
  
  for (const node of nodes) {
    ws2.addRow({
      name: node.name,
      level: node.level,
      profession: node.profession,
      start_date: node.start_date || '',
      end_date: node.end_date || '',
      is_custom: node.is_custom ? '是' : '否'
    })
  }
  
  const ws3 = workbook.addWorksheet('冲突报告')
  ws3.columns = [
    { header: '节点', key: 'nodeName', width: 30 },
    { header: '严重程度', key: 'severity', width: 12 },
    { header: '消息', key: 'message', width: 60 }
  ]
  
  for (const conflict of conflicts) {
    ws3.addRow({
      nodeName: conflict.nodeName,
      severity: conflict.severity === 'error' ? '错误' : '警告',
      message: conflict.message
    })
  }
  
  return await workbook.xlsx.writeBuffer() as Buffer
}

export async function generateRulesTemplate(): Promise<Buffer> {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('规则模板')
  
  worksheet.columns = [
    { header: '节点名称', key: 'name', width: 30 },
    { header: '节点分级', key: 'level', width: 10 },
    { header: '涉及专业', key: 'profession', width: 15 },
    { header: '基准点', key: 'baseline', width: 15 },
    { header: '偏移天数', key: 'offset_days', width: 12 },
    { header: '节点时长', key: 'duration_days', width: 12 },
    { header: '依赖节点', key: 'dependencies', width: 30 },
    { header: '验收标准', key: 'acceptance_standard', width: 30 }
  ]
  
  worksheet.addRow(['方案设计', 1, '设计', '项目签约', 0, 30, '', '我方交付,业主验收'])
  worksheet.addRow(['施工图设计', 2, '设计', '方案设计', 0, 45, '方案设计', '我方交付,业主验收'])
  worksheet.addRow(['施工招标', 2, '工程', '施工图设计', 0, 30, '施工图设计', '我方交付,业主验收'])
  
  return await workbook.xlsx.writeBuffer() as Buffer
}
