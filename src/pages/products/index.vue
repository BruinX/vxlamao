<template>
  <template v-if="$route.name === 'products'">
    <div data-aos="fade-down" class="w-full h-[50dvh] md:h-screen pt-16 md:pt-20 relative overflow-hidden">
      <img :src="`/images/${productInfo.imaPath}`" alt="Mask_group" loading="lazy" class="w-full h-full object-cover" />
      <div class="banner_title pt-6 md:pt-0">
        <BlurReveal :delay="0.2" :duration="0.75" class="">
          <p class="font-bold tracking-tighter text-3xl md:text-4xl lg:text-7xl" :class="`text-${productInfo.color}`">
            {{ productInfo.title }}
          </p>
        </BlurReveal>
      </div>
    </div>

    <div class="text-center py-10 md:py-28">
      <p class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl">{{ productInfo.title }}</p>
      <p class="sm:text-lg md:text-xl lg:text-2xl md:max-w-1/2 mx-auto px-2 pt-6 text-gray-500">
        Stand out with XLAMAO® Color Paint Protection Film. Combining bold color styling with durable
        TPU protection, it transforms your car’s look while guarding against scratches, weather, and
        fading — beauty with built-in defense.
      </p>
    </div>

    <div class="relative w-full h-[70dvh] md:h-[80dvh] bg-no-repeat bg-cover bg-center cursor-pointer"
      style="background-image: url('/images/product_bg.jpg')">
      <div class="absolute inset-0 bg-black/55"></div>
      <div class="relative container mx-auto text-white p-4 md:pt-16">
        <p class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl">PRODUCT FEATURES</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 pt-2 md:pt-10">
          <div v-for="item in 4" class="sm:text-lg md:text-xl lg:text-2xl pt-6 flex justify-start items-center">
            <div class="radial-progress text-white shrink-0 mr-3" style="--value: 70; --thickness: 4px; --size: 4rem"
              aria-valuenow="70" role="progressbar">
              <i class="iconfont icon-fangshuifangchen !text-3xl"></i>
            </div>
            <p>- UV and stain-resistant for a lasting finish in any climate.</p>
          </div>
        </div>
      </div>
    </div>
    <el-row id="productList" class="tac container mx-auto py-5 lg:py-10">
      <div class="hidden-lg-and-up px-4 w-full">
        <el-dropdown trigger="click" size="large" @command="handleCommand">
          <el-button class=""> Products
            <el-icon class="el-icon--circle">
              <arrow-down />
            </el-icon>
          </el-button>

          <template #dropdown>
            <el-dropdown-menu class="product-dropdown">
              <el-dropdown-item :disabled="item.id == productsId" v-for="item in globalPageData.common.product"
                :key="item.id" :command="String(item.id)">{{
                  item.title
                }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div data-aos="fade-down" class="mx-auto text-center text-2xl font-bold pt-4">{{ productInfo.title }}</div>
      </div>

      <el-col :span="0" :lg="5">
        <h5 class="mb-2 text-2xl">Products</h5>
        <el-menu :default-active="productsId" class="select-none" @select="onMenuSelect">
          <el-menu-item class="truncate" v-for="item in globalPageData.common.product" :key="item.id"
            :index="String(item.id)">
            {{ item.title }}
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="24" :lg="19" class="py-6 md:py-10 px-4 !grid grid-cols-2 lg:grid-cols-4 gap-4">
        <el-card v-for="m in 10" class=" cursor-pointer active:scale-95 transition-all duration-300" shadow="hover"
          style="--el-card-padding: 10px"
          @click="navigate('/products/productsInfo', { id: productInfo.id, productId: '200' })">
          <img :src="`/images/${productInfo.imaPath}`" class="w-full " />
          <template #footer>
            <div class="">
              <p class="font-bold">{{ productInfo.title }}</p>
              <p class="text-gray-500 text-sm">No.{{ productInfo.id + m }}{{ m }}</p>
            </div>
          </template>
        </el-card>

      </el-col>
      <div class="w-full mb-6 px-4 flex justify-end">
        <el-pagination background layout="prev, pager, next" v-model:current-page="pageData.currentPage"
          :pager-count="pageData.screenWidth > 620 ? 7 : 5" :total="100" @current-change="handleCurrentChange" />
      </div>
    </el-row>
  </template>


  <!-- 子路由渲染区 -->
  <router-view />
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
const productsId = computed(() => String(route.query.id))

const pageData = reactive({
  screenWidth: window.innerWidth,
  currentPage: 1,

});

// 分页
const handleCurrentChange = val => {
  pageData.currentPage = val;
};

const handleCommand = (command) => {
  navigate('/products', { id: command })
}
const onMenuSelect = (index) => {
  // index === el-menu-item 的 index
  navigate('/products', { id: index })
}


const navigate = (path, query) => {
  pageStore.setPageLoading(true)
  router.push(query ? { path, query } : { path })
  const randomDelay = (min = 100, max = 500) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  setTimeout(() => {
    pageStore.setPageLoading(false);
    goAnchor('productList');
  }, randomDelay())
}

onMounted(() => {
})
</script>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item) {
  font-size: 18px;
}
</style>
