# 筹备计划生成系统 - 设计文档

**项目名称：** ChoubeiPlanner
**创建日期：** 2026-03-22
**目标用户：** 商业地产项目经理

---

## 1. 整体架构

### 1.1 应用结构

- **主进程（Electron Main）**：负责窗口管理、文件系统操作、SQLite 数据库读写
- **渲染进程（React 前端）**：用户界面、交互逻辑、规则计算
- **进程通信**：IPC（Inter-Process Communication）用于前后端数据通信

### 1.2 目录结构

```
choubei-planner/
├── main/              # Electron 主进程
│   ├── index.ts       # 入口文件
│   ├── database.ts    # SQLite 数据库操作
│   ├── ipc.ts         # IPC 通信处理
│   └── excel.ts       # Excel 文件处理
├── renderer/          # React 前端
│   ├── App.tsx
│   ├── components/
│   │   ├── ProjectListEditor.tsx     # 项目列表/切换
│   │   ├── TimelineView.tsx          # 时间轴视图
│   │   ├── ListView.tsx               # 列表视图
│   │   ├── NodeEditor.tsx            # 节点编辑器
│   │   ├── RuleManager.tsx           # 规则管理
│   │   └── ConflictWarning.tsx       # 冲突警告
│   ├── engine/
│   │   ├── planGenerator.ts          # 计划生成引擎
│   │   ├── conflictDetector.ts       # 冲突检测
│   │   └── ruleEvaluator.ts          # 规则评估
│   └── types/
│       └── index.ts                   # 类型定义
├── database/          # SQLite 数据库文件
│   └── planner.db
└── rules/             # 规则文件目录
    └── default_rules.xlsx
```

### 1.3 技术栈

- Electron
- React + TypeScript
- Tailwind CSS
- SQLite3
- ExcelJS（读写 Excel 文件）
- date-fns（日期计算）

---

## 2. 数据模型

### 2.1 projects 表（项目信息）

```sql
CREATE TABLE projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,           -- 项目名称
  description TEXT,             -- 项目描述
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  cornerstone_data TEXT          -- JSON: 基石时间点
);
```

**cornerstone_data 示例：**
```json
{
  "项目签约": "2026-01-01",
  "动工": "2026-02-01",
  "竣工备案": "2026-10-31",
  "开业": "2026-12-01"
}
```

### 2.2 nodes 表（节点）

```sql
CREATE TABLE nodes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  name TEXT NOT NULL,           -- 节点名称
  level INTEGER NOT NULL,       -- 节点分级
  profession TEXT NOT NULL,     -- 涉及专业
  acceptance_standard TEXT NOT NULL,  -- JSON: 验收标准
  start_date DATE,              -- 开始日期
  end_date DATE,                -- 结束日期
  is_custom INTEGER DEFAULT 0,   -- 是否为自定义节点
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

**acceptance_standard JSON 示例：**
```json
{
  "我方交付": {
    "enabled": true,
    "deadline": "2026-01-08"
  },
  "业主验收": {
    "enabled": true,
    "deadline": "2026-01-15"
  },
  "业主付款": {
    "enabled": false,
    "deadline": null
  }
}
```

### 2.3 dependencies 表（依赖关系）

```sql
CREATE TABLE dependencies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  node_id INTEGER NOT NULL,     -- 当前节点
  depends_on INTEGER NOT NULL,  -- 依赖的节点
  type TEXT NOT NULL,           -- 类型: 'must_before'（冲突约束）或 'prerequisite'（前置依赖）
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (node_id) REFERENCES nodes(id) ON DELETE CASCADE,
  FOREIGN KEY (depends_on) REFERENCES nodes(id) ON DELETE CASCADE
);
```

### 2.4 rules 表（规则）

```sql
CREATE TABLE rules (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,           -- 节点名称
  level INTEGER NOT NULL,       -- 节点分级
  profession TEXT NOT NULL,     -- 涉及专业
  acceptance_standard TEXT,      -- 默认验收标准
  baseline TEXT,                -- 基准点（基石时间）
  offset_days INTEGER,          -- 偏移天数（正数顺推，负数倒推）
  duration_days INTEGER,        -- 节点时长（天）
  dependencies TEXT             -- JSON: 依赖的节点列表
);
```

**dependencies 字段示例：**
```json
[
  {"node": "项目签约", "type": "prerequisite"}
]
```

---

## 3. 核心功能模块

### 3.1 计划生成引擎（planGenerator.ts）

**功能：**
- 接收基石时间点和规则
- 遍历所有规则，根据基准点和偏移量计算每个节点的开始和结束时间
- 建立节点间的依赖关系
- 返回完整的节点列表

**核心逻辑：**
```typescript
function generatePlan(cornerstoneData: CornerstoneData, rules: Rule[]): Node[] {
  return rules.map(rule => {
    const baselineDate = cornerstoneData[rule.baseline];
    const startDate = addDays(baselineDate, rule.offset_days);
    const endDate = addDays(startDate, rule.duration_days);

    return {
      name: rule.name,
      level: rule.level,
      profession: rule.profession,
      acceptanceStandard: rule.acceptance_standard,
      startDate,
      endDate,
      isCustom: false
    };
  });
}
```

### 3.2 冲突检测引擎（conflictDetector.ts）

**功能：**
- 检测节点间的时序冲突
- 返回冲突列表及严重程度（黄色警告/红色错误）

**检测规则：**
1. **前置依赖冲突**：节点 A 必须在节点 B 完成后才能开始，但 A.start_date < B.end_date
2. **must_before 冲突**：节点 A 必须在节点 B 之前完成，但 A.end_date >= B.start_date
3. **验收标准时间冲突**：任意生效的验收标准时间 > 节点结束时间

**输出格式：**
```typescript
interface Conflict {
  nodeId: string;
  severity: 'warning' | 'error';
  message: string;
  relatedNodeIds: string[];
}
```

### 3.3 规则评估器（ruleEvaluator.ts）

**功能：**
- 验证规则的一致性（如循环依赖）
- 计算规则间的隐式约束

---

## 4. 用户界面设计

### 4.1 首页 / 项目列表
- **左侧**：项目列表（可搜索、过滤）
- **顶部**：新建项目、导入项目、导出项目按钮
- **右侧**：选中项目的详情预览（名称、描述、基石时间）

### 4.2 计划编辑页面
- **顶部栏**：项目名称、切换视图（时间轴/列表）、保存、导出
- **左侧面板**：项目信息（可编辑基石时间）、规则摘要
- **中央区域**：
  - **时间轴视图**：甘特图风格展示所有节点，可拖拽调整
  - **列表视图**：表格形式展示节点，可排序、筛选
- **底部面板**：冲突警告列表（黄色/红色标识）
- **操作**：点击节点弹出编辑器，可修改时间、依赖、验收标准

### 4.3 规则管理页面
- **顶部**：导入规则 Excel、导出规则 Excel
- **中央**：规则列表表格（可编辑）
- **验证区域**：规则一致性检查结果

### 4.4 节点编辑器（弹窗）
- 开始日期
- 结束日期
- 涉及专业（下拉选择）
- 节点分级（数字输入）
- 依赖关系（多选或手动配置）
- **验收标准区域**（3个卡片，每个包含）：
  - 启用/禁用开关
  - 截止时间选择器（仅启用时可设置）
  - 自动检测：最后生效的验收标准时间是否 ≤ 节点结束时间

---

## 5. 技术实现细节

### 5.1 IPC 通信设计

**主进程 → 渲染进程事件：**
- `project:list-updated` - 项目列表更新
- `project:loaded` - 项目加载完成
- `conflict-detected` - 冲突检测结果

**渲染进程 → 主进程调用：**
```typescript
// 项目管理
ipcRenderer.invoke('project:create', data)
ipcRenderer.invoke('project:list')
ipcRenderer.invoke('project:load', projectId)
ipcRenderer.invoke('project:update', projectId, data)
ipcRenderer.invoke('project:delete', projectId)
ipcRenderer.invoke('project:export', projectId, format)
ipcRenderer.invoke('project:import', filePath)

// 节点管理
ipcRenderer.invoke('node:create', projectId, data)
ipcRenderer.invoke('node:update', nodeId, data)
ipcRenderer.invoke('node:delete', nodeId)

// 规则管理
ipcRenderer.invoke('rule:list')
ipcRenderer.invoke('rule:import', filePath)
ipcRenderer.invoke('rule:export', format)
```

### 5.2 日期计算

使用 `date-fns` 库处理所有日期计算：
- `addDays(date, days)` - 顺推/倒推日期
- `differenceInDays(dateA, dateB)` - 计算天数差
- `isAfter`, `isBefore`, `isEqual` - 日期比较

### 5.3 Excel 文件格式

**规则 Excel 表头：**
| 节点名称 | 节点分级 | 涉及专业 | 基准点 | 偏移天数 | 节点时长 | 依赖节点 | 验收标准 |
|---------|---------|---------|-------|---------|---------|---------|---------|

**导出计划 Excel格式：**
- Sheet 1: 项目信息
- Sheet 2: 节点列表（包含时间、依赖、验收标准）
- Sheet 3: 冲突报告

---

## 6. 数据流设计

### 6.1 创建新项目流程

```
用户输入项目信息
    ↓
主进程：插入 projects 表
    ↓
前端：显示项目创建成功
    ↓
用户选择项目，进入编辑页面
    ↓
用户输入基石时间
    ↓
前端：调用 planGenerator 生成节点
    ↓
前端：调用 conflictDetector 检测冲突
    ↓
主进程：批量插入 nodes 和 dependencies 表
    ↓
前端：显示时间轴/列表视图
```

### 6.2 修改节点流程

```
用户编辑节点（时间、依赖、验收标准）
    ↓
前端：实时调用 conflictDetector 检测冲突
    ↓
前端：显示冲突警告（黄色/红色）
    ↓
用户确认修改，点击保存
    ↓
主进程：更新 nodes 表
    ↓
主进程：更新 dependencies 表
    ↓
前端：更新视图
```

### 6.3 导入规则流程

```
用户选择 Excel 文件
    ↓
主进程：解析 Excel 文件
    ↓
主进程：验证规则格式
    ↓
主进程：清空 rules 表，插入新规则
    ↓
前端：重新加载规则列表
    ↓
前端：提示规则已更新，是否重新生成当前项目计划？
```

---

## 7. 错误处理和边界情况

### 7.1 数据验证

**基石时间验证：**
- 必须填写全部4个基石时间点
- 时间顺序逻辑：项目签约 < 动工 < 竣工备案 < 开业
- 日期格式验证

**节点编辑验证：**
- 开始日期 ≤ 结束日期
- 依赖节点不能指向自己
- 循环依赖检测
- 生效的验收标准截止时间 ≤ 节点结束时间

**规则导入验证：**
- 必填字段检查
- 基准点必须是4个基石时间之一
- 偏移量和时长必须为整数
- 循环依赖检测

### 7.2 错误提示策略

| 错误类型 | 严重程度 | 提示方式 | 用户操作 |
|---------|---------|---------|---------|
| 必填字段缺失 | 错误 | 红色Toast | 阻止保存 |
| 日期格式错误 | 错误 | 红色Toast | 阻止保存 |
| 时序逻辑错误 | 错误 | 红色Toast + 高亮字段 | 阻止保存 |
| 节点依赖冲突 | 警告 | 黄色高亮节点 | 允许保存 |
| 验收标准时间冲突 | 警告 | 黄色高亮节点 + 提示信息 | 允许保存 |
| 循环依赖 | 错误 | 红色Toast | 阻止保存 |

### 7.3 边界情况

- **删除项目**：级联删除所有节点和依赖
- **删除节点**：检查是否有其他节点依赖该节点，如有则提示
- **离线运行**：首次启动时创建默认数据库和规则
- **文件损坏**：提供数据库重建选项
- **Excel 格式不兼容**：提供格式模板下载

---

## 8. 测试策略

### 8.1 单元测试

**核心引擎测试：**
- `planGenerator.test.ts`：测试各种基准点计算、正负偏移量
- `conflictDetector.test.ts`：测试各种冲突场景、边界条件
- `ruleEvaluator.test.ts`：测试循环依赖检测

**数据层测试：**
- `database.test.ts`：测试 CRUD 操作、级联删除
- `excel.test.ts`：测试 Excel 导入导出

### 8.2 集成测试

**端到端场景测试：**
- 创建项目 → 输入基石时间 → 生成计划 → 验证节点时间
- 修改节点时间 → 检测冲突 → 保存 → 重新加载验证
- 导入规则 → 重新生成计划 → 对比结果
- 导出计划 → 新项目导入 → 数据一致性验证

### 8.3 用户界面测试

**交互流程测试：**
- 时间轴视图拖拽节点
- 列表视图排序、筛选
- 节点编辑器各字段输入验证
- 视图切换（时间轴 ↔ 列表）保持状态

---

## 9. 部署和打包

### 9.1 开发环境

**启动开发服务器：**
```bash
# 安装依赖
npm install

# 启动开发模式
npm run dev
```

**开发时热重载：**
- 主进程变更：自动重启
- 渲染进程变更：React HMR

### 9.2 生产打包

**打包流程：**
```bash
# 构建 React 生产版本
npm run build:renderer

# 打包 Electron 应用
npm run build
```

**输出产物：**
- Windows: `dist/ChoubeiPlanner Setup x.x.x.exe`
- macOS: `dist/ChoubeiPlanner-x.x.x.dmg`

**打包配置：**
- 包含：应用程序代码、SQLite 数据库文件、默认规则文件
- 自动创建数据库目录：`~/Documents/ChoubeiPlanner/`
- 自动创建规则目录：`~/Documents/ChoubeiPlanner/rules/`

### 9.3 分发方式

**内部分发：**
- 文件共享服务
- 内部安装包仓库

**版本更新：**
- 内置 electron-updater 实现自动更新
- 版本检查 API（可选）

---

## 10. 扩展接口设计（远期规划）

### 10.1 AI 分析功能预留接口

**功能目标：**
未来接入大模型对项目计划进行智能分析，包括：
- 节点时间合理性分析
- 资源冲突预警
- 进度风险预测
- 优化建议

**接口设计：**

```typescript
// types/index.ts
interface AIAnalysisService {
  // 分析整个项目计划
  analyzeProject(projectId: string): Promise<AnalysisResult>;

  // 分析单个节点
  analyzeNode(projectId: string, nodeId: string): Promise<NodeAnalysis>;

  // 获取优化建议
  getOptimizationSuggestions(projectId: string): Promise<Suggestion[]>;
}

interface AnalysisResult {
  overallRisk: 'low' | 'medium' | 'high';
  riskFactors: RiskFactor[];
  bottlenecks: Bottleneck[];
  timelineHealth: number; // 0-100
}

interface RiskFactor {
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  affectedNodes: string[];
}
```

**实现方式预留：**

1. **服务抽象层**：创建 `renderer/services/aiAnalysisService.ts`
   - 目前提供空实现（mock 数据或占位）
   - 未来可替换为真实的 AI API 调用

2. **UI 预留位置**：
   - 计划编辑页面增加"AI 分析"按钮
   - 分析结果展示区域（初始隐藏或显示"功能开发中"）

3. **配置预留**：
   - `settings.json` 中预留 AI 配置项
   - API Key、模型选择、端点配置

**实现提示：**
> TODO: 远期接入大模型分析功能
> - 评估 AI 模型选择（如 Claude、GPT 或本地模型）
> - 考虑隐私和数据安全（项目数据是否允许发送到云端）
> - 设计提示词工程以获取有价值的分析结果

---

## 设计变更记录

| 日期 | 变更内容 |
|------|---------|
| 2026-03-22 | 初始设计完成 |
| 2026-03-22 | 增加 AI 分析功能预留接口（远期规划） |
