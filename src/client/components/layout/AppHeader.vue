<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Home, FileText, Settings } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const router = useRouter()
const currentRoute = router.currentRoute
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-14 items-center">
      <div class="mr-4 flex">
        <span class="mr-6 flex items-center space-x-2">
          <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          <span class="font-bold text-lg">ChoubeiPlanner</span>
        </span>
      </div>
      <nav class="flex flex-1 items-center justify-end space-x-2">
        <Button
          variant="ghost"
          :class="{ 'bg-accent': currentRoute.name === 'home' }"
          @click="router.push('/')"
        >
          <Home class="mr-2 h-4 w-4" />
          项目列表
        </Button>
        <Button
          variant="ghost"
          :class="{ 'bg-accent': currentRoute.name === 'rules' }"
          @click="router.push('/rules')"
        >
          <FileText class="mr-2 h-4 w-4" />
          规则管理
        </Button>
      </nav>
    </div>
  </header>
</template>
