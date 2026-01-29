import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const pageLoading = ref(false)
  function setPageLoading(val) {
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    pageLoading.value = val

  }

  return { pageLoading, setPageLoading }
})
