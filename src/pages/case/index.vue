<template>
  <div v-if="$route.name !== 'caseInfo'" class="container mx-auto pt-16 md:pt-20 ">
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

    <div class="flex justify-between items-start flex-wrap px-4 md:pt-4 md:px-0">
      <div class="text-[4rem] text-black font-bold ">CASE</div>
      <div class="w-80">
        <el-cascader class="w-full" placeholder="Please select the product model." v-model="pageData.cateValue"
          :options="pageData.cateList"></el-cascader>
        <el-input class="w-full mt-3" v-model="pageData.keyword" placeholder="Please enter the product name"
          clearable />
        <div class="mt-3 md:text-end">
          <el-button @click="onReset">Reset</el-button>
          <el-button type="primary" @click="onSearch">Search</el-button>
        </div>
      </div>
    </div>


    <div class="py-6 px-3 md:py-10 md:px-0   ">
      <template v-if="pageData.caseData.items.length">
        <Masonry :items="pageData.caseData.items" :duration="0.6" :stagger="0.2" animate-from="bottom"
          :scale-on-hover="true" :hover-scale="0.95" :blur-to-focus="true" :color-shift-on-hover="false" />
        <!-- pagination -->
        <div class="w-full mt-10 mb-6 flex justify-end">
          <el-pagination background :current-page="currentPage" :page-size="pageData.pageSize"
            :total="pageData.caseData.pagination.total || 0" layout="prev, pager, next"
            @current-change="handleCurrentChange" />
        </div>
      </template>
      <el-empty v-else class="mx-auto " description="No data available, please select query." />
    </div>
  </div>
  <!-- 子路由渲染区 -->
  <router-view />
</template>

<script setup>
import { getCateInfoWithCache } from '../../util/globalUtil.js'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { useCounterStore } from '../../stores/counter.js'

const router = useRouter()
const route = useRoute()
const pageStore = useCounterStore()

// -------------------- state --------------------
const pageData = reactive({
  screenWidth: window.innerWidth,
  currentPage: 1,
  pageSize: 10,
  cateList: [],
  cateValue: [],
  keyword: '',
  caseData: {
    items: [],
    pagination: {},
  }
});

// -------------------- computed --------------------
const currentPage = computed(() => {
  return Number(route.params.page || 1)
})
const cateId = computed(() => pageData.cateValue?.[1] || null)
const keyword = computed(() => pageData.keyword.trim())

// -------------------- lifecycle --------------------
onMounted(async () => {
  const productsCateList = await getCateInfoWithCache()
  pageData.cateList = await handleSelect(productsCateList)

  console.log('pageData.cateList', pageData.cateList);


})

// -------------------- 查询核心 --------------------
const fetchCaseList = async () => {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  try {
    const query = {
      page: currentPage.value,
      page_size: pageData.pageSize,
    }

    // 搜索 / 分类互斥
    if (keyword.value) {
      query.keyword = keyword.value
    } else if (cateId.value) {
      query.cate_id = cateId.value
    }

    const res = await getCaseIndexApi(query)

    pageData.caseData.items = res?.items || []

    // 测试
    // const list = res?.items || []
    // const repeat = 10

    // pageData.caseData.items = list.flatMap((item, i) =>
    //   Array.from({ length: repeat }, (_, index) => ({
    //     ...item,
    //     id: `${item.id}_${i}_${index}`,
    //   }))
    // )

    pageData.caseData.pagination = res?.pagination || {}
  } catch (err) {
    console.error('获取案例失败:', err)
    pageData.caseData.items = []
    pageData.caseData.pagination = {}
  } finally {
    loading.close()
  }
}

// -------------------- 事件 --------------------

// 搜索
const onSearch = () => {
  pageData.cateValue = []
  router.push({ name: 'case', params: { page: 1 } })
}

// 重置
const onReset = () => {
  pageData.keyword = ''
  pageData.cateValue = []
  router.push({ name: 'case', params: { page: 1 } })
}

// 分页
const handleCurrentChange = (page) => {
  router.push({
    name: 'case',
    params: { page },
  })
}

// 处理数据
const handleSelect = data => {
  return new Promise((resolve, reject) => {
    data.forEach(option => {
      // 将 id 改为 value，name 改为 label，mode 改为 children
      option.value = option.id;
      delete option.id;
      option.label = option.title;
      delete option.title;

    });
    resolve(data);
  });
};

// 分类变化
watch(
  () => route.params.page,
  () => {
    fetchCaseList()
  },
  { immediate: true }
)
// 分类变化
watch(
  () => pageData.cateValue,
  () => {
    if (pageData.cateValue?.length) {
      pageData.keyword = ''
      router.push({ name: 'case', params: { page: 1 } })
    }
  }
)

</script>


<style lang="scss" scoped></style>
