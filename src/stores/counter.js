import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const pageLoading = ref(false)
  const productsCateList = ref([])
  function setPageLoading(val) {
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    pageLoading.value = val
  }

  function setProductsCateList(val) {
    productsCateList.value = val
  }

  return { pageLoading, productsCateList, setPageLoading, setProductsCateList }
})
