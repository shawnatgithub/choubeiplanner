import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Rule, RuleValidationResult } from '../../shared/types'
import { api } from '../api'

export const useRuleStore = defineStore('rule', () => {
  const rules = ref<Rule[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const validationResult = ref<RuleValidationResult | null>(null)
  
  async function loadRules() {
    loading.value = true
    error.value = null
    try {
      rules.value = await api.listRules()
    } catch (e) {
      error.value = (e as Error).message
    } finally {
      loading.value = false
    }
  }
  
  async function importRules(file: File) {
    loading.value = true
    error.value = null
    try {
      const result = await api.importRules(file)
      await loadRules()
      return result.count
    } catch (e) {
      error.value = (e as Error).message
      return 0
    } finally {
      loading.value = false
    }
  }
  
  async function validateRules(cornerstoneNames: string[]) {
    loading.value = true
    error.value = null
    try {
      validationResult.value = await api.validateRules(cornerstoneNames)
      return validationResult.value
    } catch (e) {
      error.value = (e as Error).message
      return null
    } finally {
      loading.value = false
    }
  }
  
  function getTemplateUrl(): string {
    return api.getRulesTemplateUrl()
  }
  
  return {
    rules,
    loading,
    error,
    validationResult,
    loadRules,
    importRules,
    validateRules,
    getTemplateUrl
  }
})
