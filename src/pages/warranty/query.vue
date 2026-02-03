<template>
  <div class="relative text-white">
    <!-- mask -->
    <div class="absolute inset-0 bg-black/50"></div>
    <img class="w-full h-[80dvh] md:h-screen object-cover z-0" :src="`/images/WARRANTY_bg.png`" alt="WARRANTY_bg" />
    <div class="absolute top-1/2 left-1/2 -translate-1/2 px-4 text-center items-center justify-center overflow-hidden">
      <BoxReveal color="#E1251B">
        <p class="w-full font-bold text-3xl md:text-4xl lg:text-7xl">VXLAMAO</p>
      </BoxReveal>
      <BoxReveal color="#E1251B">
        <p class="w-full font-bold text-3xl md:text-4xl lg:text-7xl">WARRANTY INQUIRY</p>
      </BoxReveal>
      <BoxReveal color="#E1251B" :duration="0.8">
        <p class="w-full text-base sm:text-lg md:text-xl lg:text-2xl pt-5">
          Vxlamao Solves Eight Core Problems for Your Car.
        </p>
      </BoxReveal>

      <div class="mt-4 w-[92dvw] md:w-[40dvw] mx-auto">

        <el-select class="pb-3" v-model="select" size="large" placeholder="Select" style="width: 100%">
          <el-option label="Tel" value="tel" />
          <el-option label="License Plate No." value="license" />
          <el-option label="VIN" value="vin" />
        </el-select>

        <el-input v-model="input" size="large" autofocus :placeholder="{
          tel: 'Please enter phone number',
          license: 'Please enter license plate number',
          vin: 'Please enter VIN',
        }[select] || 'Please input'" class="input-with-select" @keyup.enter="onSubmit">
          <template #append>
            <el-button :icon="Search" @click="onSubmit">Search</el-button>
          </template>
        </el-input>
      </div>
    </div>
  </div>
  <!-- 子路由渲染区 -->
  <router-view />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { useCounterStore } from '../../stores/counter.js'

const router = useRouter()
const pageStore = useCounterStore()

/* 表单数据 */
const select = ref('')
const input = ref('')

/* 表单校验 */
const validateForm = () => {
  if (!select.value) {
    ElNotification({
      title: 'Warning',
      message: 'Please select query criteria!',
      type: 'warning',
    })
    return false
  }

  if (!input.value) {
    ElNotification({
      title: 'Warning',
      message: 'Please enter the conditions you want to query!',
      type: 'warning',
    })
    return false
  }

  return true
}

/* 提交查询 */
const onSubmit = () => {
  if (!validateForm()) return
  fetchGuaranteeSlip()
}

/* 查询质保单 */
const fetchGuaranteeSlip = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    const query = {
      region: select.value,
      value: input.value,
    }
    const res = await getWarrantyQueryApi(query)
    console.log('getWarrantyQueryApi', res)
    if (!Array.isArray(res) || res.length === 0) {
      ElNotification({
        title: 'No data',
        message:
          'No warranty document found. Please check your input or contact the merchant.',
        type: 'info',
      })
      return
    }

    sessionStorage.setItem(
      'guaranteeSlip',
      JSON.stringify(res)
    )
    // 🚀 跳转到账单 / 质保单页面
    router.push({ name: 'bill' })
  } catch (error) {
    console.error('[fetchGuaranteeSlip]', error)
    ElNotification({
      title: 'Network Error',
      message: 'Failed to fetch warranty certificate. Please try again later.',
      type: 'error',
    })

  } finally {
    loading.close()
  }
}

// /* 随机延迟（模拟接口） */
// const randomDelay = (min = 500, max = 1500) =>
//   Math.floor(Math.random() * (max - min + 1)) + min

// /* 页面跳转 */
// const navigate = (path, query) => {
//   router.push(query ? { path, query } : { path })
// }
</script>


<style lang="scss" scoped></style>
