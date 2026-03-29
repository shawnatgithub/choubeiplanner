<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRuleStore } from '@/stores/rule'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { Upload, Download, CheckCircle, AlertCircle, FileSpreadsheet } from 'lucide-vue-next'

const ruleStore = useRuleStore()

const fileInput = ref<HTMLInputElement | null>(null)
const importing = ref(false)

onMounted(() => {
  ruleStore.loadRules()
})

function handleImportClick() {
  fileInput.value?.click()
}

async function handleFileChange(e: Event) {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  
  importing.value = true
  const count = await ruleStore.importRules(file)
  importing.value = false
  
  if (count > 0) {
    alert(`成功导入 ${count} 条规则`)
  }
  
  target.value = ''
}

function handleDownloadTemplate() {
  window.open(ruleStore.getTemplateUrl(), '_blank')
}

async function handleValidate() {
  const result = await ruleStore.validateRules(['项目签约', '动工', '竣工备案', '开业'])
  if (result?.valid) {
    alert('规则验证通过，没有发现问题')
  }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-3xl font-bold">规则管理</h1>
        <p class="text-muted-foreground mt-1">管理计划生成规则</p>
      </div>
      
      <div class="flex gap-2">
        <input
          ref="fileInput"
          type="file"
          accept=".xlsx,.xls"
          class="hidden"
          @change="handleFileChange"
        />
        <Button variant="outline" @click="handleDownloadTemplate">
          <Download class="mr-2 h-4 w-4" />
          下载模板
        </Button>
        <Button @click="handleImportClick" :disabled="importing">
          <Upload class="mr-2 h-4 w-4" />
          {{ importing ? '导入中...' : '导入规则' }}
        </Button>
        <Button variant="secondary" @click="handleValidate" :disabled="ruleStore.rules.length === 0">
          <CheckCircle class="mr-2 h-4 w-4" />
          验证规则
        </Button>
      </div>
    </div>
    
    <div v-if="ruleStore.validationResult && !ruleStore.validationResult.valid" class="space-y-2">
      <Alert variant="destructive">
        <AlertCircle class="h-4 w-4" />
        <AlertTitle>验证失败</AlertTitle>
        <AlertDescription>
          <ul class="list-disc pl-5 mt-2">
            <li v-for="(error, index) in ruleStore.validationResult.errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
    
    <Card>
      <CardHeader>
        <CardTitle class="flex items-center gap-2">
          <FileSpreadsheet class="h-5 w-5" />
          规则列表 ({{ ruleStore.rules.length }} 条)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="ruleStore.loading" class="text-center py-10">
          <div class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p class="mt-2 text-muted-foreground">加载中...</p>
        </div>
        
        <div v-else-if="ruleStore.rules.length === 0" class="text-center py-20">
          <FileSpreadsheet class="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 class="text-xl font-medium">暂无规则</h3>
          <p class="text-muted-foreground mt-1">请先下载模板并导入规则Excel文件</p>
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-muted/50">
              <tr>
                <th class="px-4 py-3 text-left text-sm font-medium">节点名称</th>
                <th class="px-4 py-3 text-left text-sm font-medium">分级</th>
                <th class="px-4 py-3 text-left text-sm font-medium">专业</th>
                <th class="px-4 py-3 text-left text-sm font-medium">基准点</th>
                <th class="px-4 py-3 text-left text-sm font-medium">偏移天数</th>
                <th class="px-4 py-3 text-left text-sm font-medium">节点时长</th>
                <th class="px-4 py-3 text-left text-sm font-medium">依赖节点</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="rule in ruleStore.rules" :key="rule.id" class="hover:bg-muted/30">
                <td class="px-4 py-3 text-sm font-medium">{{ rule.name }}</td>
                <td class="px-4 py-3 text-sm">{{ rule.level }}</td>
                <td class="px-4 py-3 text-sm">{{ rule.profession }}</td>
                <td class="px-4 py-3 text-sm">{{ rule.baseline }}</td>
                <td class="px-4 py-3 text-sm">{{ rule.offset_days }}</td>
                <td class="px-4 py-3 text-sm">{{ rule.duration_days }} 天</td>
                <td class="px-4 py-3 text-sm text-muted-foreground">
                  {{ rule.dependencies.map(d => d.node).join(', ') || '-' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
