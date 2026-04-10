<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import type { Node, AcceptanceStandard } from '../../../shared/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-vue-next'

interface Props {
  node: Node | null
  existingNodes: Node[]
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'save', node: Node): void
  (e: 'delete', nodeId: number): void
  (e: 'close'): void
}>()

const defaultAcceptance: AcceptanceStandard = {
  '我方交付': { enabled: true, deadline: null },
  '业主验收': { enabled: true, deadline: null },
  '业主付款': { enabled: false, deadline: null }
}

const formData = ref<Node>({
  id: undefined,
  project_id: 0,
  name: '',
  level: 1,
  profession: '',
  acceptance_standard: { ...defaultAcceptance },
  start_date: null,
  end_date: null,
  is_custom: true
})

watch(() => props.node, (newNode) => {
  if (newNode) {
    formData.value = { ...newNode, acceptance_standard: { ...newNode.acceptance_standard } }
  } else {
    formData.value = {
      id: undefined,
      project_id: 0,
      name: '',
      level: 1,
      profession: '',
      acceptance_standard: { ...defaultAcceptance },
      start_date: null,
      end_date: null,
      is_custom: true
    }
  }
}, { immediate: true })

const isNew = computed(() => !props.node?.id)

function handleSubmit() {
  if (!formData.value.name.trim()) {
    alert('请输入节点名称')
    return
  }
  if (!formData.value.start_date || !formData.value.end_date) {
    alert('请选择开始和结束日期')
    return
  }
  if (formData.value.start_date > formData.value.end_date) {
    alert('开始日期必须早于结束日期')
    return
  }
  
  for (const [key, standard] of Object.entries(formData.value.acceptance_standard)) {
    const std = standard as { enabled: boolean; deadline: string | null }
    if (std.enabled && std.deadline) {
      if (std.deadline > formData.value.end_date!) {
        if (!confirm(`验收标准 "${key}" 的截止时间晚于节点结束日期，是否继续保存？`)) {
          return
        }
      }
    }
  }
  
  emit('save', formData.value)
}

function handleAcceptanceChange(key: string, field: 'enabled' | 'deadline', value: boolean | string | null) {
  formData.value.acceptance_standard[key] = {
    ...formData.value.acceptance_standard[key],
    [field]: value
  }
}

function handleDelete() {
  if (!props.node?.id) return
  if (!confirm('确定要删除此节点吗？')) return
  emit('delete', props.node.id)
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50">
      <div
        class="fixed inset-0 bg-black/80"
        @click="emit('close')"
      />
      <div
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl max-h-[90vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-semibold">{{ isNew ? '新建节点' : '编辑节点' }}</h2>
          <button
            class="rounded-sm opacity-70 hover:opacity-100"
            @click="emit('close')"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
        
        <div class="space-y-4 py-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="nodeName">节点名称</Label>
              <Input id="nodeName" v-model="formData.name" placeholder="请输入节点名称" />
            </div>
            <div class="space-y-2">
              <Label for="nodeLevel">节点分级</Label>
              <Input
                id="nodeLevel"
                type="number"
                v-model="formData.level"
                min="1"
              />
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="nodeProfession">涉及专业</Label>
              <Input
                id="nodeProfession"
                v-model="formData.profession"
                placeholder="例如: 设计, 工程, 招商"
              />
            </div>
            <div class="space-y-2">
              <Label>自定义节点</Label>
              <div class="flex items-center h-10">
                <label class="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    v-model="formData.is_custom"
                    class="h-4 w-4 rounded border-gray-300"
                  />
                  <span class="text-sm">是自定义节点</span>
                </label>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-2 gap-4">
            <div class="space-y-2">
              <Label for="startDate">开始日期</Label>
              <Input
                id="startDate"
                type="date"
                :value="formData.start_date || ''"
                @input="formData.start_date = ($event.target as HTMLInputElement).value || null"
              />
            </div>
            <div class="space-y-2">
              <Label for="endDate">结束日期</Label>
              <Input
                id="endDate"
                type="date"
                :value="formData.end_date || ''"
                @input="formData.end_date = ($event.target as HTMLInputElement).value || null"
              />
            </div>
          </div>
          
          <div v-if="!isNew" class="grid grid-cols-2 gap-4 bg-muted/30 p-3 rounded-lg border">
            <div class="space-y-1">
              <Label class="text-xs text-muted-foreground">偏移备注 (CSV)</Label>
              <p class="text-sm break-words">{{ formData.offset_remark || '-' }}</p>
            </div>
            <div class="space-y-1">
              <Label class="text-xs text-muted-foreground">前置备注 (CSV)</Label>
              <p class="text-sm break-words">{{ formData.dependency_remark || '-' }}</p>
            </div>
          </div>
          
          <div class="border-t pt-4">
            <h3 class="font-medium mb-3">验收标准</h3>
            <div class="space-y-3">
              <div
                v-for="(standard, key) in formData.acceptance_standard"
                :key="key"
                class="border rounded-lg p-3"
              >
                <div class="flex items-center justify-between">
                  <span class="font-medium">{{ key }}</span>
                  <label class="flex items-center gap-2 cursor-pointer">
                    <span class="text-sm text-muted-foreground">启用</span>
                    <input
                      type="checkbox"
                      :checked="(standard as any).enabled"
                      @change="handleAcceptanceChange(String(key), 'enabled', !(standard as any).enabled)"
                      class="h-4 w-4 rounded border-gray-300"
                    />
                  </label>
                </div>
                <div v-if="(standard as any).enabled" class="mt-2">
                  <Label class="text-xs">截止时间</Label>
                  <Input
                    type="date"
                    :value="(standard as any).deadline || ''"
                    @input="handleAcceptanceChange(String(key), 'deadline', ($event.target as HTMLInputElement).value || null)"
                    class="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between">
          <div>
            <Button
              v-if="!isNew"
              variant="destructive"
              @click="handleDelete"
            >
              删除
            </Button>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" @click="emit('close')">取消</Button>
            <Button @click="handleSubmit">保存</Button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
