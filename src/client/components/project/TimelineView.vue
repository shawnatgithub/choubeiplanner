<script setup lang="ts">
import { computed } from 'vue'
import type { Node } from '../../../shared/types'

interface Props {
  nodes: Node[]
  professionColors: Record<string, string>
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'node-click', node: Node): void
}>()

interface DateRange {
  min: Date
  max: Date
}

function getDateRange(nodes: Node[]): DateRange | null {
  const dates = nodes
    .flatMap(n => [n.start_date, n.end_date])
    .filter((d): d is string => d !== null)
    .map(d => new Date(d))
  
  if (dates.length === 0) return null
  return {
    min: new Date(Math.min(...dates.map(d => d.getTime()))),
    max: new Date(Math.max(...dates.map(d => d.getTime())))
  }
}

function dateToPixel(date: Date, min: Date, max: Date, totalWidth: number): number {
  const totalMs = max.getTime() - min.getTime()
  if (totalMs === 0) return 0
  const ms = date.getTime() - min.getTime()
  return (ms / totalMs) * totalWidth
}

const range = computed(() => getDateRange(props.nodes))

function getProfessionColor(profession: string): string {
  return props.professionColors[profession] || 'bg-gray-100 border-gray-300'
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '-'
  return dateStr
}
</script>

<template>
  <div class="bg-white rounded-lg border overflow-hidden">
    <div class="overflow-x-auto">
      <div
        v-if="range"
        class="relative p-4"
        style="min-width: 1200px; min-height: 500px;"
      >
        <div
          v-for="(node, index) in nodes"
          :key="node.id"
          class="absolute cursor-pointer transition-all hover:shadow-md rounded border-2"
          :class="getProfessionColor(node.profession)"
          :style="{
            top: `${index * 50 + 20}px`,
            left: `${dateToPixel(new Date(node.start_date!), range.min, range.max, 1000) + 150}px`,
            width: `${Math.max(100, dateToPixel(new Date(node.end_date!), range.min, range.max, 1000) - dateToPixel(new Date(node.start_date!), range.min, range.max, 1000))}px`,
            height: '40px'
          }"
          @click="emit('node-click', node)"
        >
          <div class="px-2 py-1 text-sm truncate font-medium">
            {{ node.name }}
          </div>
          <div class="px-2 text-xs opacity-70">
            {{ formatDate(node.start_date) }} - {{ formatDate(node.end_date) }}
          </div>
        </div>
        
        <div class="absolute left-0 top-0 bottom-0 w-[150px] bg-muted/30 border-r">
          <div
            v-for="(node, index) in nodes"
            :key="`label-${node.id}`"
            class="flex items-center px-2 text-sm font-medium truncate"
            :style="{ height: '50px', marginTop: index === 0 ? '20px' : '0' }"
          >
            {{ node.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
