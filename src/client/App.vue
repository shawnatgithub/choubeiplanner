<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'
</script>

<template>
  <div class="min-h-screen bg-background">
    <AppHeader />
    <main class="container py-6">
      <RouterView />
    </main>
  </div>
</template>
