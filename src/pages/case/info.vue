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
          path: '/case'
        }">Case</el-breadcrumb-item>
        <el-breadcrumb-item>Case List </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="card-base">
      <div class="mx-auto flex flex-wrap justify-between text-black">
        <template v-for="itemData in pageData.list" :key="itemData.build_time">
          <el-watermark class="w-full mt-3 mx-0 select-none" :content="pageData.watermarkConfig.content"
            :offset="pageData.watermarkConfig.offset" :rotate="pageData.watermarkConfig.rotate">
            <div class="text-base pb-6 flex justify-between items-center">
              <span
                class="font-medium h-auto py-2.5 rounded-md mr-3 bg-indigo-400 text-white text-center border-2 border-indigo-400">
                <span class="px-3 py-2 rounded-md bg-indigo-400 text-white text-center border-2 border-white">{{
                  itemData?.car_number }}</span>
              </span>
              <p class="flex justify-center items-center">
                <span v-if="itemData.warrantyExpired" class="iconfont icon-dc-b-warranty-expired  text-green-500"
                  style="font-size: 40px"></span>
                <span v-else class="iconfont icon-dc-b-warranty  text-red-500" style="font-size: 40px"></span>
                <span class=" font-bold" :class="itemData.warrantyExpired ? 'text-green-500' : 'text-slate-500'">{{
                  itemData.warrantyExpired ? 'Under Warranty' : 'Expired'
                }}</span>

              </p>

            </div>

            <el-descriptions direction="vertical" :column="3" size="large" border>
              <el-descriptions-item label="Name">{{ itemData?.car_owner }}</el-descriptions-item>
              <el-descriptions-item label="Telephone">{{ itemData?.phone }}</el-descriptions-item>
              <el-descriptions-item label="License Plate Number" :span="1">{{ itemData?.car_number
              }}</el-descriptions-item>
              <el-descriptions-item label="Vehicle Model" :span="3">
                <el-tag size="large">{{ itemData?.car_brand }}</el-tag>
                <el-tag class="mx-3" size="large">{{ itemData?.car_mode }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item label="VIN (Vehicle Identification Number)" :span="3">{{ itemData?.car_vin
              }}</el-descriptions-item>
              <el-descriptions-item label="Installation Shop" :span="pageData.screenWidth > 550 ? 1 : 3">{{
                itemData?.build_shop
              }}</el-descriptions-item>
              <el-descriptions-item label="Delivery Date" :span="pageData.screenWidth > 550 ? 1 : 2">{{
                itemData?.build_time
              }}</el-descriptions-item>
              <el-descriptions-item label="Warranty Period" :span="pageData.screenWidth > 550 ? 1 : 2">{{
                itemData?.years + '-Year Warranty'
              }}</el-descriptions-item>
              <el-descriptions-item label="Product Model" :span="pageData.screenWidth > 550 ? 1 : 2">{{
                itemData?.cate_name
              }}</el-descriptions-item>
              <el-descriptions-item label="Product Price" :span="pageData.screenWidth > 550 ? 1 : 2">{{ 'CNY ' +
                itemData?.price
              }}</el-descriptions-item>
              <el-descriptions-item label="Remarks" :span="pageData.screenWidth > 550 ? 1 : 3">{{ itemData?.remark ||
                '/'
              }}</el-descriptions-item>
            </el-descriptions>
          </el-watermark>
        </template>

        <el-empty v-if="!pageData.list.length" class="mx-auto my-5" description="Please inquire again.">
          <el-button type="primary" @click="navigate('/warranty')">Return to requery</el-button>
        </el-empty>
      </div>

    </div>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()

const pageData = reactive({
  list: [],
  screenWidth: window.innerWidth,
  watermarkConfig: {
    content: 'Vxlamao Warranty Certificate',
    rotate: 20,
    offset: [0, 90]
  }
});
const handleResize = () => {
  pageData.screenWidth = window.innerWidth;
};

/* 页面跳转 */
const navigate = (path, query) => {
  router.push(query ? { path, query } : { path })
}

onMounted(() => {
  window.addEventListener('resize', handleResize);
  // 计算当前时间
  // 从SessionStorage读取数据
  let storageData = JSON.parse(sessionStorage.getItem('guaranteeSlip'));
  if (storageData) {
    storageData.forEach(item => {
      if (isWarrantyExpired(item.build_time, item.years)) {
        item['warrantyExpired'] = false;
      } else {
        item['warrantyExpired'] = true;
      }
    });
    pageData.list = storageData;
  }

});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
  // 清除SessionStorage中的所有数据
  sessionStorage.clear();
  // sessionStorage.removeItem('guaranteeSlip')

});

// 判断给定日期加上质保年数后是否已经过期
function isWarrantyExpired(startDate, warrantyYears) {
  // 将给定的开始日期转换为时间戳（毫秒）
  const startTimestamp = new Date(startDate).getTime();

  // 计算质保结束日期的时间戳（毫秒）
  const expirationDate = new Date(startTimestamp);
  expirationDate.setFullYear(expirationDate.getFullYear() + warrantyYears);
  const expirationTimestamp = expirationDate.getTime();

  // 获取当前时间的时间戳（毫秒）
  const currentTimestamp = Date.now();

  // 判断是否已过期
  return currentTimestamp > expirationTimestamp;
}

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
