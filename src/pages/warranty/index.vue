<template>
  <div v-if="$route.name === 'warranty'" class="relative text-white">
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
          <el-option label="Tel" value="phone" />
          <el-option label="License Plate No." value="plate" />
          <el-option label="VIN" value="vin" />
        </el-select>

        <el-input v-model="input" size="large" autofocus :placeholder="{
          phone: 'Please enter phone number',
          plate: 'Please enter license plate number',
          vin: 'Please enter VIN',
        }[select] || 'Please input'" class="input-with-select">
          <!-- <template #prepend>
            <el-select v-model="select" size="large" placeholder="Select" style="width: 120px">
              <el-option label="Tel" value="1" />
              <el-option label="License Plate No." value="2" />
              <el-option label="vin" value="3" />
            </el-select>
          </template> -->
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

/* 随机延迟（模拟接口） */
const randomDelay = (min = 500, max = 1500) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/* 页面跳转 */
const navigate = (path, query) => {
  router.push(query ? { path, query } : { path })
}

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
  pageStore.setPageLoading(true)

  try {
    // ⚠️ 模拟接口返回
    const res = {
      code: 1,
      data: [
        {
          cate_name: 'TPU-CF80',
          car_owner: '刘翔',
          phone: '13549704518',
          car_brand: 'Toyota',
          car_mode: "RAV4",
          car_number: '湘AQ023A',
          car_vin: 'LVGDE76AXSG055476',
          build_time: '2026-01-20 16:01:59',
          years: 6,
          price: "12800.00",
          remark: "",
        },
      ],
    }

    await new Promise((resolve) => setTimeout(resolve, randomDelay()))

    if (!res.data || res.data.length === 0) {
      ElNotification({
        title: 'No data',
        message:
          'No warranty document found. Please check your input or contact the merchant.',
        type: 'info',
      })
      return
    }

    if (res.code === 1) {
      sessionStorage.setItem('guaranteeSlip', JSON.stringify(res.data))
      navigate('/warranty/bill')
    } else {
      ElNotification({
        title: 'Error',
        message: res.msg || 'Query failed',
        type: 'error',
      })
    }
  } finally {
    pageStore.setPageLoading(false)
  }
}
</script>


<style lang="scss" scoped></style>
