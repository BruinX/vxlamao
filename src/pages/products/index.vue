<template>
  <template v-if="$route.name === 'products' && productInfo">
    <div data-aos="fade-down" class="w-full h-[50dvh] md:h-screen pt-16 md:pt-20 relative overflow-hidden">
      <img v-if="productInfo.cover" :src="productInfo.cover" alt="Mask_group" loading="lazy"
        class="w-full h-full object-cover" />
      <div class="banner_title pt-6 md:pt-0">
        <BlurReveal :delay="0.2" :duration="0.75" class="">
          <p class="font-bold tracking-tighter text-3xl md:text-4xl lg:text-7xl"
            :class="productInfo.color ? `text-${productInfo.color}` : 'text-black '">
            {{ productInfo.title || '' }}
          </p>
        </BlurReveal>
      </div>
    </div>

    <div class="text-center py-10 md:py-28">
      <p class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl">{{ productInfo.title }}</p>
      <p class="sm:text-lg md:text-xl lg:text-2xl md:max-w-1/2 mx-auto px-2 pt-6 text-gray-500">
        {{ productInfo.describe }}
      </p>
    </div>

    <div class="relative w-full h-[70dvh] md:h-[80dvh] bg-no-repeat bg-cover bg-center cursor-pointer"
      style="background-image: url('/images/product_bg.jpg')">
      <div class="absolute inset-0 bg-black/55"></div>
      <div class="relative container mx-auto text-white p-4 md:pt-16">
        <p class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl">PRODUCT FEATURES</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 pt-2 md:pt-10">
          <div v-for="item in productInfo.product_features"
            class="sm:text-lg md:text-xl lg:text-2xl pt-6 flex justify-start items-center">
            <div class="radial-progress text-white shrink-0 mr-3" style="--value: 70; --thickness: 4px; --size: 4rem"
              aria-valuenow="70" role="progressbar">
              <i class="iconfont icon-fangshuifangchen !text-3xl"></i>
            </div>
            <p>- {{ item }}.</p>
          </div>
        </div>
      </div>
    </div>
    <el-row id="productList" class="tac container mx-auto py-5 lg:py-10">
      <div class="hidden-lg-and-up px-4 w-full">
        <el-dropdown ref="dropdown1" trigger="click" size="large">
          <el-button class=""> products
            <el-icon class="el-icon--circle">
              <arrow-down />
            </el-icon>
          </el-button>

          <template #dropdown>
            <el-dropdown-menu class="product-dropdown">
              <el-dropdown-item :disabled="item.id == cateId" v-for="item in productsCateList" :key="item.id"
                :command="String(item.id)"> <router-link class="block w-full"
                  :to="{ name: 'products', params: { cateId: item.id } }">
                  {{ item.title }}
                </router-link></el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div data-aos="fade-down" class="mx-auto text-center text-2xl font-bold pt-4">{{ productInfo.title }}</div>
      </div>

      <el-col :span="0" :lg="5">
        <h5 class="mb-2 text-2xl">Products</h5>
        <el-menu :default-active="cateId" class="select-none">
          <el-menu-item class="truncate" v-for="item in productsCateList" :key="item.id" :index="String(item.id)">
            <router-link class="block w-full" :to="{ name: 'products', params: { cateId: item.id } }">
              {{ item.title }}
            </router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="24" :lg="19">
        <div class="flex justify-start items-center flex-nowrap px-3 pt-4 ">
          <el-input class="w-full pr-3" v-model="pageData.keyword" placeholder="Please enter the product name" clearable
            @keyup.enter="onSearch('keyword')" />
          <el-button class="pr-3" @click="onReset">Reset</el-button>
          <el-button type="primary" @click="onSearch">Search</el-button>

        </div>
        <div v-if="productList.length" class="py-4  px-4 ">
          <Masonry :items="productList" :duration="0.6" :stagger="0.2" animate-from="bottom" :scale-on-hover="true"
            :hover-scale="0.95" :blur-to-focus="true" :color-shift-on-hover="false" :masonry-type="'product'" />
          <!-- <router-link v-for="item in productList" :key="item.id" class="block" :to="{
            name: 'productsInfo',
            params: { cateId, productId: item.id },
          }">
            <el-card class=" cursor-pointer active:scale-95 transition-all duration-300" shadow="hover"
              style="--el-card-padding: 10px">
              <img :src="item.cover || '/images/default_product.jpg'" class="w-full " />
              <template #header>
                <div class="card-header line-clamp-2">
                  <span>{{ item.name }}</span>
                </div>
              </template>
              <template #footer>
                <p class="font-bold">{{ item.title }}</p>
                <p class="text-gray-500 text-sm">No.{{ item.id }}</p>
              </template>
            </el-card>
          </router-link> -->
        </div>
        <el-empty v-else class="mx-auto my-5" description="No data at present." />

      </el-col>

      <div class="w-full mb-6 px-4 flex justify-end">
        <el-pagination background layout="prev, pager, next" v-model:current-page="pageData.currentPage"
          :page-size="pageData.pageSize" :total="pagination?.total || 0"
          :pager-count="pageData.screenWidth > 620 ? 7 : 5" />
      </div>
    </el-row>
  </template>


  <!-- 子路由渲染区 -->
  <router-view />
</template>

<script setup>
import { goAnchor, getCateInfoWithCache } from '../../util/globalUtil.js'
import { useCounterStore } from '../../stores/counter.js'
import 'element-plus/theme-chalk/display.css'
const router = useRouter()
const route = useRoute()
const dropdown1 = ref()

// -------------------- state --------------------
const productsCateList = ref([]);
const productList = ref([])      // 产品列表（接口 items）
const pagination = ref(null)

const pageData = reactive({
  screenWidth: window.innerWidth,
  currentPage: 1,
  pageSize: 10,
  keyword: '',
});

// ---------------- props ----------------
// const props = defineProps({
//   cateId: {
//     type: String,
//     required: true,
//   },
// })

// -------------------- computed --------------------

// 获取当前路由的id
const cateId = computed(() => route.params.cateId)

const productInfo = computed(() => {
  return productsCateList.value.find(
    item => item.id == cateId.value
  ) || {}
})



// -------------------- 事件处理 --------------------
const handleCurrentChange = val => {
  pageData.currentPage = val;
};

const onSearch = () => {
  pageData.currentPage = 1
  getProductList()
}

const onReset = () => {
  pageData.keyword = ''
  pageData.currentPage = 1
  getProductList()
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

// -------------------- API 调用 --------------------
const getProductList = async () => {
  if (!cateId.value) return
  try {
    const query = {
      cate_id: cateId.value,
      page: pageData.currentPage,
      page_size: pageData.pageSize,
    }

    if (pageData.keyword?.trim()) {
      query.name = pageData.keyword.trim()
    }

    const res = await getProductIndexApi(query)

    productList.value = res?.items || []
    pagination.value = res?.pagination || null
    goAnchor('productList')
  } catch (err) {
    console.error('获取产品列表失败:', err)
    productList.value = []
    pagination.value = null

  } finally {
    // 请求完成或异常都关闭 loading
    // loading.close()
    dropdown1.value.handleClose()
  }
}


// -------------------- watch --------------------

watch(
  cateId,
  () => {
    pageData.currentPage = 1
    pageData.keyword = ''
    getProductList()
  },
  { immediate: true }
)

watch(
  () => pageData.currentPage,
  () => {
    getProductList()
  }
)

// -------------------- 初始化 --------------------
onMounted(async () => {
  console.log('route.name', route);
  productsCateList.value = await getCateInfoWithCache()
})

</script>

<style lang="scss" scoped>
:deep(.el-dropdown-menu__item) {
  font-size: 18px;
}
</style>
