<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import TimelineView from '@/components/project/TimelineView.vue'
import NodeEditor from '@/components/project/NodeEditor.vue'
import { ArrowLeft, RefreshCw, Download, Plus, AlertTriangle, XCircle } from 'lucide-vue-next'
import type { Node } from '../../shared/types'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const showNodeEditor = ref(false)
const editingNode = ref<Node | null>(null)
const viewMode = ref<'timeline' | 'list'>('timeline')

const projectId = computed(() => parseInt(route.params.id as string))

onMounted(() => {
  projectStore.loadProject(projectId.value)
})

watch(projectId, (newId) => {
  if (newId) {
    projectStore.loadProject(newId)
  }
})

async function handleGenerate() {
  if (!confirm('重新生成计划将覆盖现有节点，确定继续吗？')) return
  await projectStore.generatePlan()
}

function handleExport() {
  if (projectStore.currentProject) {
    window.open(`/api/projects/${projectStore.currentProject.id}/export`, '_blank')
  }
}

function openNodeEditor(node: Node | null) {
  editingNode.value = node
  showNodeEditor.value = true
}

async function handleSaveNode(node: Node) {
  if (node.id) {
    await projectStore.updateNode(node.id, node)
  } else {
    await projectStore.createNode(node)
  }
  showNodeEditor.value = false
  editingNode.value = null
}

async function handleDeleteNode(nodeId: number) {
  if (!confirm('确定要删除此节点吗？')) return
  await projectStore.deleteNode(nodeId)
  showNodeEditor.value = false
  editingNode.value = null
}

const professionColors: Record<string, string> = {
  '设计': 'bg-blue-100 border-blue-300 text-blue-800',
  '工程': 'bg-green-100 border-green-300 text-green-800',
  '招商': 'bg-yellow-100 border-yellow-300 text-yellow-800',
  '营运': 'bg-purple-100 border-purple-300 text-purple-800',
  '财务': 'bg-red-100 border-red-300 text-red-800'
}

function getProfessionColor(profession: string): string {
  return professionColors[profession] || 'bg-gray-100 border-gray-300 text-gray-800'
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Button variant="ghost" size="icon" @click="router.push('/')">
          <ArrowLeft class="h-5 w-5" />
        </Button>
        <div>
          <h1 class="text-2xl font-bold">{{ projectStore.currentProject?.name || '加载中...' }}</h1>
          <p v-if="projectStore.currentProject?.description" class="text-muted-foreground">
            {{ projectStore.currentProject.description }}
          </p>
        </div>
      </div>
      
      <div class="flex items-center gap-2">
        <Button variant="outline" @click="openNodeEditor(null)">
          <Plus class="mr-2 h-4 w-4" />
          添加节点
        </Button>
        <Button variant="outline" @click="handleExport" :disabled="!projectStore.currentProject">
          <Download class="mr-2 h-4 w-4" />
          导出
        </Button>
        <Button @click="handleGenerate" :disabled="projectStore.loading">
          <RefreshCw class="mr-2 h-4 w-4" :class="{ 'animate-spin': projectStore.loading }" />
          重新生成计划
        </Button>
      </div>
    </div>
    
    <div class="flex gap-2">
      <Button
        :variant="viewMode === 'timeline' ? 'default' : 'outline'"
        size="sm"
        @click="viewMode = 'timeline'"
      >
        时间轴视图
      </Button>
      <Button
        :variant="viewMode === 'list' ? 'default' : 'outline'"
        size="sm"
        @click="viewMode = 'list'"
      >
        列表视图
      </Button>
    </div>
    
    <Card v-if="projectStore.nodes.length === 0">
      <CardContent class="py-20 text-center">
        <p class="text-muted-foreground">暂无节点，请点击"重新生成计划"生成计划</p>
      </CardContent>
    </Card>
    
    <template v-else>
      <TimelineView
        v-if="viewMode === 'timeline'"
        :nodes="projectStore.nodes"
        :profession-colors="professionColors"
        @node-click="openNodeEditor"
      />
      
      <Card v-else>
        <CardContent class="p-0">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-muted/50">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium">节点名称</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">分级</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">专业</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">开始日期</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">结束日期</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">偏移备注</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">前置备注</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">自定义</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr
                  v-for="node in projectStore.nodes"
                  :key="node.id"
                  class="hover:bg-muted/30 cursor-pointer"
                  @click="openNodeEditor(node)"
                >
                  <td class="px-4 py-3 text-sm">{{ node.name }}</td>
                  <td class="px-4 py-3 text-sm">{{ node.level }}</td>
                  <td class="px-4 py-3 text-sm">
                    <span
                      class="px-2 py-0.5 rounded text-xs border"
                      :class="getProfessionColor(node.profession)"
                    >
                      {{ node.profession }}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">{{ node.start_date || '-' }}</td>
                  <td class="px-4 py-3 text-sm">{{ node.end_date || '-' }}</td>
                  <td class="px-4 py-3 text-sm max-w-[150px] truncate" :title="node.offset_remark || '-'">{{ node.offset_remark || '-' }}</td>
                  <td class="px-4 py-3 text-sm max-w-[200px] truncate" :title="node.dependency_remark || '-'">{{ node.dependency_remark || '-' }}</td>
                  <td class="px-4 py-3 text-sm">{{ node.is_custom ? '是' : '否' }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </template>
    
    <div v-if="projectStore.conflicts.conflicts.length > 0" class="space-y-2">
      <Alert
        v-for="(conflict, index) in projectStore.conflicts.conflicts"
        :key="index"
        :variant="conflict.severity === 'error' ? 'destructive' : 'warning'"
      >
        <XCircle v-if="conflict.severity === 'error'" class="h-4 w-4" />
        <AlertTriangle v-else class="h-4 w-4" />
        <AlertTitle>{{ conflict.severity === 'error' ? '错误' : '警告' }}</AlertTitle>
        <AlertDescription>{{ conflict.message }}</AlertDescription>
      </Alert>
    </div>
    
    <NodeEditor
      v-if="showNodeEditor"
      :node="editingNode"
      :existing-nodes="projectStore.nodes"
      @save="handleSaveNode"
      @delete="handleDeleteNode"
      @close="showNodeEditor = false"
    />
  </div>
</template>
