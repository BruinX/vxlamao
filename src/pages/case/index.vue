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

    <div class="flex justify-between items-start flex-wrap px-4 md:pt-4 md:px-0">
      <div class="text-[4rem] text-black font-bold ">CASE</div>
      <div class="w-80">
        <el-cascader class="w-full" placeholder="Please select the product model." v-model="pageData.cateValue"
          :options="pageData.cateList"></el-cascader>
        <el-input class="w-full mt-3" v-model="pageData.keyword" placeholder="Please enter the product name"
          clearable />
        <div class="mt-3 md:text-end">
          <el-button>Reset</el-button>
          <el-button type="primary">Search</el-button>
        </div>
      </div>
    </div>


    <div class="py-6 px-3 md:py-10 md:px-0 min-h-screen  ">
      <template v-if="pageData.caseData.data?.length">
        <Masonry :items="pageData.caseData.data" :duration="0.6" :stagger="0.2" animate-from="bottom"
          :scale-on-hover="true" :hover-scale="0.95" :blur-to-focus="true" :color-shift-on-hover="false" />

        <!-- pagination -->
        <div class="w-full mt-10 mb-6 flex justify-end">
          <el-pagination v-model:current-page="pageData.currentPage" background layout="prev, pager, next"
            :pager-count="pageData.screenWidth > 620 ? 7 : 3" :total="pageData.caseData.total"
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
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
import { useCounterStore } from '../../stores/counter.js'

const router = useRouter()
const pageStore = useCounterStore()
const pageData = reactive({
  screenWidth: window.innerWidth,
  currentPage: 1,
  cateList: [],
  cateValue: [],
  keyword: '',
  caseData: {
    total: 0,
    data: []
  }
});

const items = ref([
  // { id: '1', img: 'https://www.vxlamao-films.com/images/product_view2.jpg', url: 'https://picsum.photos' },
  // { id: '2', img: 'https://www.vxlamao-films.com/images/9fHAKPCwnVQb8S0k.jpeg', url: 'https://picsum.photos' },
  // { id: '3', img: 'https://www.vxlamao-films.com/images/product_view2.jpg', url: 'https://picsum.photos' },
  // { id: '4', img: 'https://www.vxlamao-films.com/images/9fHAKPCwnVQb8S0k.jpeg', url: 'https://picsum.photos' },
  // { id: '5', img: 'https://www.vxlamao-films.com/images/product_view2.jpg', url: 'https://picsum.photos' },
  // { id: '6', img: 'https://www.vxlamao-films.com/images/product_view2.jpg', url: 'https://picsum.photos' },
  // { id: '7', img: 'https://www.vxlamao-films.com/images/9fHAKPCwnVQb8S0k.jpeg', url: 'https://picsum.photos' },
  // { id: '8', img: 'https://www.vxlamao-films.com/images/product_view2.jpg', url: 'https://picsum.photos' },
  // { id: '9', img: 'https://www.vxlamao-films.com/images/product_view2.jpg', url: 'https://picsum.photos' },
  // { id: '10', img: 'https://www.vxlamao-films.com/images/9fHAKPCwnVQb8S0k.jpeg', url: 'https://picsum.photos' },

  { id: '11', img: 'https://picsum.photos/3100/360?random=11', url: 'https://picsum.photos' },
  { id: '12', img: 'https://picsum.photos/3200/5205?random=12', url: 'https://picsum.photos' },
  { id: '13', img: 'https://picsum.photos/3300/3940?random=13', url: 'https://picsum.photos' },
  { id: '14', img: 'https://picsum.photos/300/580?random=14', url: 'https://picsum.photos' },
  { id: '15', img: 'https://picsum.photos/3060/3450?random=15', url: 'https://picsum.photos' },
  { id: '16', img: 'https://picsum.photos/3060/630?random=16', url: 'https://picsum.photos' },
  { id: '17', img: 'https://picsum.photos/300/410?random=17', url: 'https://picsum.photos' },
  { id: '18', img: 'https://picsum.photos/3600/560?random=18', url: 'https://picsum.photos' },
  { id: '19', img: 'https://picsum.photos/300/370?random=19', url: 'https://picsum.photos' },
  { id: '20', img: 'https://picsum.photos/300/610?random=20', url: 'https://picsum.photos' }
]);



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

onMounted(() => {
  onQuery();
});

// 搜索按钮
const onSearch = () => {
  // 如果 keyword 有值 → 清空 cateValue
  if (pageData.keyword && pageData.keyword.trim() !== '') {
    pageData.cateValue = [];
  }
  pageData.currentPage = 1;
  onQuery();
};

// 分页
const handleCurrentChange = val => {
  pageData.currentPage = val;
  onQuery();
};

// 处理数据
const handleSelect = data => {
  return new Promise((resolve, reject) => {
    data.forEach(option => {
      // 将 id 改为 value，name 改为 label，mode 改为 children
      option.value = option.id;
      delete option.id;
      option.label = option.name;
      delete option.name;

      if (option.mode) {
        option.children = option.mode.map(modeItem => {
          return {
            value: modeItem.id,
            label: modeItem.name
          };
        });
      } else {
        option.children = option.children.map(modeItem => {
          return {
            value: modeItem.id,
            label: modeItem.name
          };
        });
      }
      delete option.mode;
    });
    resolve(data);
  });
};

/* 提交查询 */
const onQuery = async pages => {
  if (Array.isArray(pages)) {
    pageData.currentPage = 1;
    pageData.keyword = '';
  }

  const keyword = pageData.keyword?.trim() || '';
  const cateId = pageData.cateValue?.[1] || null;

  const queryData = {
    page: pageData.currentPage
  };

  // 互斥逻辑
  if (keyword) {
    queryData.keyword = keyword;
    pageData.cateValue = [];
  } else if (cateId) {
    queryData.cate_id = cateId;
    pageData.keyword = '';
  }

  // ⬇️ 这里换成 mock
  const res = await mockGetCaseListAPI(queryData);
  // const res = await getCaseList(queryData);

  if (res.code === 1) {
    res.data.data.forEach(item => {
      // 日期处理
      item.build_time = item.build_time?.slice(0, 10) || '';

      // 图片处理
      // item.imagesList =
      //   item.images && item.images !== 'null'
      //     ? item.images.split(',').map(s => s.trim()).filter(Boolean)
      //     : [];
    });

    pageData.caseData = res.data;

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }, 500);
  }
};


const mockGetCaseListAPI = queryData => {
  console.log('mock query params:', queryData);

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockResponse);
    }, 300); // 模拟网络延迟
  });
};


const mockResponse = {
  code: 1,
  data: {
    total: 69,
    per_page: 10,
    current_page: 1,
    last_page: 7,
    data: [
      {
        id: 87,
        title: "隐形车衣 / TPU-K75",
        cate_input: "",
        car_brand: "别克",
        car_mode: "昂科威",
        date: "2026-01-28 15:01:15",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/X53TqUIE08zcrKCH.jpeg"
      },
      {
        id: 86,
        title: "PVC改色膜 / 颜色：瓷器蓝",
        cate_input: "瓷器蓝",
        car_brand: "保时捷",
        car_mode: "718",
        date: "2026-01-28 14:59:35",
        img: "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/9fHAKPCwnVQb8S0k.jpeg"

      },
      {
        id: 85,
        title: "PVC改色膜 / 颜色：快银",
        cate_input: "快银",
        car_brand: "斯科达",
        car_mode: "斯科达",
        date: "2026-01-28 14:57:34",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/z3mVWrYLxfUtdDCi.jpeg"
      },
      {
        id: 84,
        title: "PVC改色膜 / 颜色：纳多灰",
        cate_input: "纳多灰",
        car_brand: "比亚迪",
        car_mode: "元",
        date: "2026-01-28 14:55:38",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/xbldFD9y1f4EuQHJ.jpeg"

      },
      {
        id: 83,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/m9WIKvg3UuqarinG.jpeg"
      },
      {
        id: 82,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/m9WIKvg3UuqarinG.jpeg"
      },
      {
        id: 81,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/m9WIKvg3UuqarinG.jpeg"
      },
      {
        id: 80,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/m9WIKvg3UuqarinG.jpeg"
      },
      {
        id: 79,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://uploads-1325130789.cos.ap-guangzhou.myqcloud.com/uploads/202601/m9WIKvg3UuqarinG.jpeg"
      }
    ]
  }
};


const mockResponse2 = {
  code: 1,
  data: {
    total: 69,
    per_page: 10,
    current_page: 1,
    last_page: 7,
    data: [
      {
        id: 87,
        title: "隐形车衣 / TPU-K75",
        cate_input: "",
        car_brand: "别克",
        car_mode: "昂科威",
        date: "2026-01-28 15:01:15",
        img:
          "https://picsum.photos/300/420?random=1"
      },
      {
        id: 86,
        title: "PVC改色膜 / 颜色：瓷器蓝",
        cate_input: "瓷器蓝",
        car_brand: "保时捷",
        car_mode: "718",
        date: "2026-01-28 14:59:35",
        img: "https://picsum.photos/300/560?random=2"

      },
      {
        id: 85,
        title: "PVC改色膜 / 颜色：快银",
        cate_input: "快银",
        car_brand: "斯科达",
        car_mode: "斯科达",
        date: "2026-01-28 14:57:34",
        img:
          "https://picsum.photos/300/360?random=3"
      },
      {
        id: 84,
        title: "PVC改色膜 / 颜色：纳多灰",
        cate_input: "纳多灰",
        car_brand: "比亚迪",
        car_mode: "元",
        date: "2026-01-28 14:55:38",
        img:
          "https://picsum.photos/300/500?random=4"

      },
      {
        id: 83,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://picsum.photos/300/380?random=5"
      },
      {
        id: 82,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://picsum.photos/300/620?random=6"
      },
      {
        id: 81,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://picsum.photos/300/340?random=7"
      },
      {
        id: 80,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://picsum.photos/300/540?random=8"
      },
      {
        id: 79,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://picsum.photos/300/400?random=9"
      }
      ,
      {
        id: 78,
        title: "PVC改色膜 / 颜色：彩绘定制",
        cate_input: "彩绘定制",
        car_brand: "奔驰",
        car_mode: "奔驰",
        date: "2026-01-28 14:54:00",
        img:
          "https://picsum.photos/300/600?random=10"
      }
    ]
  }
};


</script>


<style lang="scss" scoped></style>
