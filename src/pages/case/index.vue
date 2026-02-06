<template>
  <div v-if="$route.name !== 'caseInfo'" class="container mx-auto pt-16 md:pt-20 ">
    <div class="card-base h-16 flex justify-start items-center">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }"><template #default>
            <el-icon size="16">
              <HomeFilled />
            </el-icon>
          </template></el-breadcrumb-item>
        <el-breadcrumb-item>Case</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="flex justify-between items-start flex-wrap px-4 md:pt-4 md:px-0">
      <div class="text-[4rem] text-black font-bold ">CASE</div>
      <div class="w-80">
        <el-cascader class="w-full" placeholder="Please select the product model." v-model="pageData.cateValue"
          :options="pageData.cateList"></el-cascader>
        <el-input class="w-full mt-3" v-model="pageData.keyword" placeholder="Please enter the product name" clearable
          @keyup.enter="onSearch('keyword')" />
        <div class="mt-3 md:text-end">
          <el-button @click="onReset">Reset</el-button>
          <el-button :icon="Search" type="primary" @click="onSearch">Search</el-button>
        </div>
      </div>
    </div>


    <div class="py-6 px-3 md:py-10 md:px-0   ">
      <template v-if="pageData.caseData.items.length">
        <Masonry :items="pageData.caseData.items" :duration="0.6" :stagger="0.2" animate-from="bottom"
          :scale-on-hover="true" :hover-scale="0.95" :blur-to-focus="true" :color-shift-on-hover="false"
          :masonry-type="'case'" :case-page="currentPage" />
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
import { useCounterStore } from '../../stores/counter.js'
import { Search } from '@element-plus/icons-vue'

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
const cateId = computed(() => pageData.cateValue?.[0] || null)
const keyword = computed(() => pageData.keyword.trim())

// -------------------- lifecycle --------------------
onMounted(async () => {
  const productsCateList = await getCateInfoWithCache()
  pageData.cateList = await handleSelect(productsCateList)
})

// -------------------- 查询核心 --------------------
const fetchCaseList = async () => {
  try {
    const query = {
      page: currentPage.value,
      page_size: pageData.pageSize,
    }

    // 搜索 / 分类互斥
    if (keyword.value) {
      query.name = keyword.value
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

    ElMessage({
      message: 'successfully loaded.',
      grouping: true,
      type: 'success',
    })
  } catch (err) {
    console.error('获取案例失败:', err)
    pageData.caseData.items = []
    pageData.caseData.pagination = {}
    ElMessage({
      message: 'Failed to get case list.',
      grouping: true,
      type: 'error',
    })
  } finally {
  }
}

// -------------------- 事件 --------------------
// 搜索
const onSearch = async (type) => {
  if (!keyword.value && !cateId.value) {
    ElMessage({
      message: 'Please enter the product name or select the product model.',
      type: 'warning',
    })
    return
  }

  console.log('onSearch', pageData.cateValue, keyword.value);
  router.replace({ name: 'case', params: { page: 1 } })
  await fetchCaseList()
}

// 重置
const onReset = async () => {
  pageData.keyword = ''
  pageData.cateValue = []
  router.push({ name: 'case', params: { page: 1 } })
  await fetchCaseList()
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

// 分页路由变化
watch(
  () => route.params.page,
  () => {
    fetchCaseList()
  },
  { immediate: true }
)


watch(
  () => pageData.cateValue,
  (val) => {
    if (val?.length) {
      pageData.keyword = ''
    }
  }
)

watch(
  () => keyword.value,
  (val) => {
    if (val) {
      pageData.cateValue = []
    }
  }
)

</script>


<style lang="scss" scoped></style>
