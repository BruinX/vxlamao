<template>
  <div class="container mx-auto pt-16 md:pt-20 ">
    <div v-if="cateData" class="card-base h-16 flex justify-start items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><template #default>
            <el-icon size="16">
              <HomeFilled />
            </el-icon>
          </template></el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'products', params: { cateId } }">
          {{ cateData.title }}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="productInfo">{{ productInfo.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="card-base">
      <p class="text-lg font-bold mb-4">{{ productInfo.name }}</p>
      <div class="flex justify-start items-start flex-wrap md:flex-nowrap">
        <div class="md:flex-1/3">
          <el-image v-for="(image, index) in productInfo.image_list" class="md:flex-1/3 aspect-[1/1] rounded-xl  mb-3"
            fit="cover" :src="image" :preview-src-list="productInfo.image_list" :initial-index="index"
            show-progress></el-image>
        </div>

        <div class="w-4 hidden md:block"></div>
        <div class="md:flex-2/3 w-full p-4 bg-gray-50 rounded-xl">
          <p class="text-lg font-bold mb-3">Highlights</p>
          <div>
            <p class="mb-2" v-for="highlightsItem in productInfo.highlights">{{ highlightsItem }}</p>
          </div>

          <p class="text-lg font-bold mt-4 mb-3">Details</p>
          <div v-html="productInfo.describe">
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import { goAnchor, getCateInfoWithCache } from '../../util/globalUtil.js'
import { useCounterStore } from '../../stores/counter.js'
import 'element-plus/theme-chalk/display.css'
const router = useRouter()
const route = useRoute()

// -------------------- state --------------------
const productsCateList = ref([]);
const productInfo = ref({})


// ---------------- props ----------------
const props = defineProps({
  cateId: String,
  productId: String,
})


// -------------------- computed --------------------
const productId = computed(() => props.productId)

const cateData = computed(() => {
  return productsCateList.value.find(
    item => item.id == productInfo.value?.cate_id
  ) || {}
})

// -------------------- API 调用 --------------------
const getProductInfo = async () => {
  if (!productId.value) return
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })
  try {
    const res = await getProductInfoApi({
      id: productId.value,
    })
    productInfo.value = res || {}
    console.log(' productInfo.value', productInfo.value);
  } catch (err) {
    console.error('获取产品列表失败:', err)
    // productList.value = []

  } finally {
    // 请求完成或异常都关闭 loading
    loading.close()
  }
}

// -------------------- 路由跳转 --------------------
const navigate = async (path, query) => {
  try {
    await router.push(query ? { path, query } : { path })
    goAnchor('productList')
  } catch (err) {
    console.error('导航失败:', err)
  }
}

// -------------------- watch --------------------
watch(
  productId,
  () => {
    getProductInfo()
  },
  { immediate: true }
)

// -------------------- 生命周期 --------------------
onMounted(async () => {
  productsCateList.value = await getCateInfoWithCache()
})
</script>

<style lang="scss" scoped></style>
