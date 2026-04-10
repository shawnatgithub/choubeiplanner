<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { DialogContent } from '@/components/ui/dialog'
import { Plus, Trash2, FolderOpen, AlertCircle, X } from 'lucide-vue-next'

const router = useRouter()
const projectStore = useProjectStore()

const showDialog = ref(false)
const newName = ref('')
const newDescription = ref('')
const cornerstones = ref<Record<string, string>>({
  '项目签约': '',
  '动工': '',
  '竣工备案': '',
  '开业': ''
})

const cornerstoneKeys = Object.keys(cornerstones.value)

onMounted(() => {
  projectStore.loadProjects()
})

async function handleCreate() {
  const values = Object.values(cornerstones.value)
  if (!newName.value.trim()) {
    alert('请输入项目名称')
    return
  }
  if (values.some(v => !v)) {
    alert('请填写全部四个基石时间点')
    return
  }
  
  const dates = values.map(v => new Date(v))
  for (let i = 1; i < dates.length; i++) {
    if (dates[i] <= dates[i - 1]) {
      alert('时间顺序错误：项目签约 < 动工 < 竣工备案 < 开业')
      return
    }
  }
  
  const id = await projectStore.createProject(
    newName.value,
    newDescription.value,
    cornerstones.value
  )
  
  if (id) {
    showDialog.value = false
    resetForm()
    router.push(`/project/${id}`)
  }
}

async function handleDelete(e: Event, id: number) {
  e.stopPropagation()
  if (!confirm('确定要删除此项目吗？此操作不可撤销。')) return
  await projectStore.deleteProject(id)
}

function resetForm() {
  newName.value = ''
  newDescription.value = ''
  cornerstones.value = {
    '项目签约': '',
    '动工': '',
    '竣工备案': '',
    '开业': ''
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString('zh-CN')
}

function openDialog() {
  resetForm()
  showDialog.value = true
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">项目列表</h1>
        <p class="text-muted-foreground mt-1">管理您的筹备计划项目</p>
      </div>
      
      <Button @click="openDialog">
        <Plus class="mr-2 h-4 w-4" />
        新建项目
      </Button>
    </div>
    
    <div v-if="projectStore.loading" class="text-center py-10">
      <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
      <p class="mt-2 text-muted-foreground">加载中...</p>
    </div>
    
    <div v-else-if="projectStore.projects.length === 0" class="text-center py-20">
      <FolderOpen class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 class="text-xl font-medium">暂无项目</h3>
      <p class="text-muted-foreground mt-1">点击上方"新建项目"按钮创建您的第一个项目</p>
    </div>
    
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="project in projectStore.projects"
        :key="project.id"
        class="cursor-pointer hover:border-primary transition-colors"
        @click="router.push(`/project/${project.id}`)"
      >
        <CardHeader class="pb-2">
          <div class="flex justify-between items-start">
            <CardTitle class="text-lg">{{ project.name }}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              class="h-8 w-8 text-destructive hover:text-destructive"
              @click="handleDelete($event, project.id)"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p v-if="project.description" class="text-sm text-muted-foreground mb-3">
            {{ project.description }}
          </p>
          <div class="text-xs text-muted-foreground">
            更新时间: {{ formatDate(project.updated_at) }}
          </div>
        </CardContent>
      </Card>
    </div>
    
    <div v-if="projectStore.error" class="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
      <AlertCircle class="h-5 w-5" />
      <span>{{ projectStore.error }}</span>
    </div>
    
    <Teleport to="body">
      <div
        v-if="showDialog"
        class="fixed inset-0 z-50"
      >
        <div
          class="fixed inset-0 bg-black/80"
          @click="showDialog = false"
        />
        <div
          class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-lg font-semibold">新建项目</h2>
            <button
              class="rounded-sm opacity-70 hover:opacity-100"
              @click="showDialog = false"
            >
              <X class="h-4 w-4" />
            </button>
          </div>
          
          <div class="space-y-4 py-4">
            <div class="space-y-2">
              <Label for="name">项目名称</Label>
              <Input id="name" v-model="newName" placeholder="请输入项目名称" />
            </div>
            
            <div class="space-y-2">
              <Label for="desc">项目描述</Label>
              <Input id="desc" v-model="newDescription" placeholder="请输入项目描述（可选）" />
            </div>
            
            <div class="border-t pt-4">
              <h3 class="font-medium mb-3">基石时间点</h3>
              <div class="space-y-3">
                <div v-for="key in cornerstoneKeys" :key="key" class="space-y-1">
                  <Label :for="key">{{ key }}</Label>
                  <Input
                    :id="key"
                    type="date"
                    v-model="cornerstones[key]"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div class="flex justify-end gap-2">
            <Button variant="outline" @click="showDialog = false">取消</Button>
            <Button @click="handleCreate">创建</Button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
