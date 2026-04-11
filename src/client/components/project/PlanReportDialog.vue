<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { X, CheckCircle2, AlertTriangle, Info } from 'lucide-vue-next'
import type { GenerationReport } from '../../shared/types'

defineProps<{
  report: GenerationReport | null
  totalNodes: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-50">
      <div
        class="fixed inset-0 bg-black/80"
        @click="emit('close')"
      />
      <div
        class="fixed left-[50%] top-[50%] z-50 grid w-full max-w-2xl max-h-[85vh] overflow-y-auto translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg rounded-lg"
      >
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold flex items-center gap-2">
            <CheckCircle2 class="text-green-500 h-6 w-6" />
            计划生成完毕
          </h2>
          <button
            class="rounded-sm opacity-70 hover:opacity-100 transition-opacity"
            @click="emit('close')"
          >
            <X class="h-5 w-5" />
          </button>
        </div>
        
        <div class="space-y-6 py-2" v-if="report">
          <!-- 基础信息说明 -->
          <div class="space-y-2">
            <h3 class="text-lg font-medium flex items-center gap-2">
              <Info class="text-blue-500 h-5 w-5" />
              生成说明
            </h3>
            <div class="bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-muted-foreground leading-relaxed">
              <p>本次基于选定的规则，系统共自动生成了 <strong>{{ totalNodes }}</strong> 个节点。</p>
              <p class="mt-1">
                其中有 <strong>{{ report.cornerstoneBasedNodes.length }}</strong> 个节点的初始时间直接绑定于您项目中的基石时间点（如开业、动工等）。
                其他节点则通过层层依赖链条，从基石节点自动推算出了精确的开始与结束时间。
              </p>
            </div>
          </div>

          <!-- 缺乏依赖关系的节点 -->
          <div class="space-y-2" v-if="report.missingDependencyNodes.length > 0">
            <h3 class="text-lg font-medium flex items-center gap-2">
              <AlertTriangle class="text-yellow-500 h-5 w-5" />
              需要关注的节点 ({{ report.missingDependencyNodes.length }})
            </h3>
            <div class="bg-yellow-50/50 p-4 rounded-lg border border-yellow-100">
              <p class="text-sm text-yellow-800 mb-2">以下常规节点在规则库中缺乏明确的前置依赖定义：</p>
              <div class="max-h-40 overflow-y-auto pr-2">
                <ul class="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li v-for="(nodeName, index) in report.missingDependencyNodes" :key="index">
                    {{ nodeName }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- 调整建议 -->
          <div class="space-y-2" v-if="report.suggestions.length > 0">
            <h3 class="text-lg font-medium">💡 调整建议</h3>
            <ul class="space-y-2">
              <li 
                v-for="(suggestion, index) in report.suggestions" 
                :key="index"
                class="flex items-start gap-2 text-sm bg-muted/30 p-3 rounded-lg"
              >
                <span class="text-primary mt-0.5">•</span>
                <span>{{ suggestion }}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div class="flex justify-end pt-4 border-t">
          <Button @click="emit('close')">我已了解，去编辑计划</Button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
