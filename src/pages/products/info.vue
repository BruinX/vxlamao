<template>
  <div class="container mx-auto pt-16 md:pt-20 ">
    <div class="card-base h-16 flex justify-start items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><template #default>
            <el-icon size="16">
              <HomeFilled />
            </el-icon>
          </template></el-breadcrumb-item>
        <el-breadcrumb-item :to="{
          path: '/products',
          query: { id: productInfo.id }
        }">{{ productInfo.title }}</el-breadcrumb-item>
        <el-breadcrumb-item>Product details name</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="card-base">
      <p class="text-lg font-bold mb-4">Product details name</p>
      <div class="flex justify-start items-start flex-wrap md:flex-nowrap">
        <div class="md:flex-1/3">
          <el-image class="md:flex-1/3 aspect-[1/1] rounded-xl  mb-3" fit="cover"
            :src="`/images/${productInfo.imaPath}`" :preview-src-list="[`/images/${productInfo.imaPath}`]"></el-image>
          <el-image class="md:flex-1/3 aspect-[1/1] rounded-xl  mb-3" fit="cover"
            :src="`/images/${productInfo.imaPath}`" :preview-src-list="[`/images/${productInfo.imaPath}`]"></el-image>
        </div>



        <div class="w-4 hidden md:block"></div>
        <div class="md:flex-2/3 w-full p-4 bg-gray-50 rounded-xl">
          <p class="text-lg font-bold mb-3">Highlights</p>
          <div>
            <p class="mb-2">Use it right out of the box, no need to print or apply an overlaminate </p>
            <p class="mb-2">Manufactured with two color layers for dimensional stability and durability </p>
            <p class="mb-2">3.5 mil cast film for easier handling and good conformability and lifting resistance </p>
          </div>

          <p class="text-lg font-bold mt-4 mb-3">Details</p>
          <div>
            <span v-for="i in 50" class="mb-2">Manufactured with two color layers for dimensional stability and
              durability </span>
          </div>
        </div>

      </div>
    </div>
  </div>

</template>

<script setup>
import { getPageData, goAnchor } from '../../util/globalUtil.js'
import { useCounterStore } from '../../stores/counter.js'
import 'element-plus/theme-chalk/display.css'
const pageStore = useCounterStore()
const router = useRouter()
const route = useRoute()
const globalPageData = getPageData()
const productInfo = computed(() =>
  globalPageData.common.product.find((item) => item.id == route.query.id),
)

const pageData = reactive({
});

const goPath = (path, query) => {
  pageStore.setPageLoading(true)
  if (query) {
    router.push({
      path: `${path}`,
      query: query,
    })
  } else {
    router.push({
      path: `${path}`,
    })
  }
}

onMounted(() => {
})
</script>

<style lang="scss" scoped></style>
