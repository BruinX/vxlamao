<template>
  <footer class="relative bg-[url('../assets/image/footer_bg.jpg')] bg-no-repeat bg-cover bg-center cursor-pointer">
    <!-- mask -->
    <div class="absolute inset-0 bg-black/55"></div>

    <div class="relative container z-10 mx-auto px-6 pt-10 md:pt-20 grid grid-cols-1 md:grid-cols-4 text-white">
      <div class="flex justify-center md:justify-start items-start flex-wrap">
        <img class="size-24" src="../../assets/image/logo.png" alt="" />
        <div class="w-full mt-4 flex justify-center md:justify-start flex-nowrap">
          <img class="size-7 mr-3" src="../../assets/image/icon-ytb.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-f.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-is.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-tk.png" alt="" />
          <img class="size-7 mr-3" src="../../assets/image/icon-wx.png" alt="" />
        </div>
        <a href="tel:18888888888" class="mt-10 mb-4 flex justify-start items-center">
          <div class="size-12 bg-theme rounded-full flex justify-center items-center mr-3">
            <i class="iconfont icon-dianhua !text-3xl"></i>
          </div>
          <div>
            <p class="text-sm">Huang Sales Director</p>
            <p class="font-bold">+86-188 8888 8888</p>
          </div>
        </a>
      </div>
      <div class="h-40 pt-6 md:pt-0 hidden md:block">
        <h2 class="font-bold pb-6">PRODUCTS</h2>
        <p class="text-sm text-white/70 pb-3 duration-75 active:text-white xl:hover:text-white select-none"
          v-for="item in productsCateList" :key="item.id" @click.stop="() => {
            router.push({
              name: 'products',
              params: { cateId: item.id },
            })
          }">
          {{ item.title }}
        </p>
      </div>
      <div class="h-40 pt-6 md:pt-0 text-center hidden md:block">
        <h2 class="font-bold pb-6">WARRANTY</h2>
        <p class="text-sm text-white/70 pb-3 duration-75 active:text-white xl:hover:text-white select-none" @click="() => {
          router.push({
            name: 'warranty',
          })
        }">
          Warranty Query
        </p>
      </div>
      <div class="h-40 pt-6 md:pt-0 text-center hidden md:block">
        <h2 class="font-bold pb-6">CASE</h2>
        <p class="text-sm text-white/70 pb-3 duration-75 active:text-white xl:hover:text-white select-none" @click="() => {
          router.push({
            name: 'case',
            params: { page: 1 },
          })
        }">
          Case
        </p>
      </div>
    </div>
    <div class="text-[0.7rem] lg:text-sm text-center py-5 z-10 text-white">
      Copyright © {{ dayjs().year() }}. xxxxx有限公司. All rights reserved.
    </div>
  </footer>

</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { getPageData, getCateInfoWithCache } from '../../util/globalUtil.js'
const globalPageData = getPageData()

const productsCateList = ref([]);
const router = useRouter()

onMounted(async () => {
  productsCateList.value = await getCateInfoWithCache();
})
</script>