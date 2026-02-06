<template>
  <div class="container mx-auto pt-16 md:pt-20">
    <div class="card-base h-16 flex justify-start items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><template #default>
            <el-icon size="16">
              <HomeFilled />
            </el-icon>
          </template></el-breadcrumb-item>
        <el-breadcrumb-item :to="{
          name: 'case',
          params: { page: route.params.page || '1' }
        }">Case</el-breadcrumb-item>
        <el-breadcrumb-item v-if="caseInfo">{{ caseInfo.cate_title + ' - ' + caseInfo.name }} </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- <div class="mx-auto flex flex-wrap justify-between text-black"> -->
    <!-- <template v-for="itemData in pageData.list" :key="itemData.build_time">

        </template>

        <el-empty v-if="!pageData.list.length" class="mx-auto my-5" description="Please inquire again.">
          <el-button type="primary" @click="navigate('/warranty')">Return to requery</el-button>
        </el-empty>
      </div> -->
    <!-- </div> -->
    <div class="w-full px-3 md:px-0 my-3 cursor-pointer">
      <el-card body-class="!w-full">
        <template #header>
          <p class="text-center font-bold">{{ caseInfo.car_brand + ' ' + caseInfo.car_model }}</p>
          <p class="text-center text-xs mt-2 text-[#999]">Delivery Date: {{
            dayjs(caseInfo.bulid_time).format('YYYY-MM-DD') }}
          </p>
        </template>
        <div v-if="caseInfo.images.length > 0" class="overflow-hidden md:w-4/5 mx-auto">
          <el-image v-for="(item, index) in caseInfo.images" :key="item" :src="item" fit="cover"
            :preview-src-list="caseInfo.images" :initial-index="index" show-progress lazy class="rounded-xl ">
            <template #placeholder>
              <div class="w-full text-2xl flex justify-center items-center">
                <Loading />
              </div>
            </template>
          </el-image>
        </div>
        <el-empty v-else class="mx-auto my-5" description="Please inquire again.">
          <router-link class="block" :to="{ name: 'case', params: { page: route.params.page || '1' } }">
            <el-button type="primary">Return to caseList</el-button>
          </router-link>
        </el-empty>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'
import { getCateInfoWithCache } from '../../util/globalUtil.js'

const router = useRouter()
const route = useRoute()

// -------------------- state --------------------
const productsCateList = ref([]);
const caseInfo = ref({
  cate_id: '',
  cate_title: '',
  car_brand: '',
  car_model: '',
  name: '',
  images: [],
  bulid_time: '',
})

// ---------------- props ----------------
const props = defineProps({
  page: String,
  caseId: String,
})

// -------------------- computed --------------------
const caseId = computed(() => props.caseId)

const cateData = computed(() => {
  return productsCateList.value.find(
    item => item.id == caseInfo.value?.cate_id
  ) || {}
})

// -------------------- API 调用 --------------------
const getCaseInfo = async () => {
  if (!caseId.value) return
  // const loading = ElLoading.service({
  //   lock: true,
  //   text: 'Loading',
  //   background: 'rgba(0, 0, 0, 0.7)',
  // })
  try {
    const res = await getCaseInfoApi({
      id: caseId.value,
    })
    caseInfo.value = res || {}
    console.log(' caseInfo.value', caseInfo.value);
  } catch (err) {
    console.error('获取产品列表失败:', err)
    // productList.value = []

  } finally {
    // 请求完成或异常都关闭 loading
    // loading.close()
  }
}

// -------------------- watch --------------------
watch(
  caseId,
  () => {
    getCaseInfo()
  },
  { immediate: true }
)



// -------------------- 生命周期 --------------------
onMounted(async () => {
  productsCateList.value = await getCateInfoWithCache()
  console.log("route", route.params.page);

})
</script>

<style lang="scss" scoped>
.content {
  border-top: 4rem solid black;
}

.cell-item {
  display: flex;
  align-items: center;
}
</style>
