import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/ProjectList.vue')
  },
  {
    path: '/project/:id',
    name: 'project',
    component: () => import('@/views/ProjectEdit.vue')
  },
  {
    path: '/rules',
    name: 'rules',
    component: () => import('@/views/RuleManager.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
