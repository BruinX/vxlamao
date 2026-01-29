<template>
  <div v-if="$route.name === 'case'" class="container mx-auto pt-16 md:pt-20 ">
    <div class="card-base h-16 flex justify-start items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><template #default>
            <el-icon size="16">
              <HomeFilled />
            </el-icon>
          </template></el-breadcrumb-item>
        <el-breadcrumb-item :to="{
          path: '/case'
        }">Case</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="flex justify-between items-center flex-wrap">
      <div class="text-[4rem] text-black font-bold ">CASE</div>

      <div>

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
