import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const pageLoading= ref(false)

  function setPageLoading (val) {
    pageLoading.value = val
  }

  return { pageLoading, setPageLoading }
})
