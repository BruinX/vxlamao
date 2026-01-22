<template>
  <footer
    class="relative bg-[url('../assets/image/footer_bg.jpg')] bg-no-repeat bg-cover bg-center cursor-pointer"
  >
    <!-- mask -->
    <div class="absolute inset-0 bg-black/55"></div>

    <div
      class="relative container z-10 mx-auto px-6 pt-10 md:pt-20 grid grid-cols-1 md:grid-cols-4 text-white"
    >
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
        <p
          class="text-sm text-white/70 pb-3 duration-75 active:text-white xl:hover:text-white select-none"
          v-for="item in globalPageData.common.product"
          :key="item.title"
        >
          {{ item.title }}
        </p>
      </div>
      <div class="h-40 pt-6 md:pt-0 text-center hidden md:block">
        <h2 class="font-bold pb-6">WARRANTY</h2>
        <p
          class="text-sm text-white/70 pb-3 duration-75 active:text-white xl:hover:text-white select-none"
        >
          Warranty Query
        </p>
      </div>
      <div class="h-40 pt-6 md:pt-0 text-center hidden md:block">
        <h2 class="font-bold pb-6">CASE</h2>
        <p
          class="text-sm text-white/70 pb-3 duration-75 active:text-white xl:hover:text-white select-none"
        >
          CASE
        </p>
      </div>
    </div>
    <div class="text-[0.7rem] lg:text-sm text-center py-5 z-10 text-white">
      Copyright © {{ dayjs().year() }}. xxxxx有限公司. All rights reserved.
    </div>

    <!-- <div class="relative z-10 mx-auto max-w-[1376px] px-6 border-b border-[#4D5776] border-solid">
      <div class="flex justify-between items-center mb-6">
        <div
          class="flex justify-start items-center hover:opacity-60 duration-[.25s] cursor-pointer"
        >
          <img src="../../assets/image/logo.png" alt="logo" class="w-[8rem] mr-2" />
        </div>
      </div>

      <div class="mx-auto flex flex-wrap justify-start text-center sm:text-left text-sm">
        <div class="w-[50%] md:w-1/4 sm:w-1/2 pb-3">
          <div class="flex flex-col pr-6 h-full">
            <div class="text-[#B3C5FE] font-bold mb-2">Huang Sales Director</div>
            <a class="text-[#fff] mb-2" href="tel:18888888888">+86-188 8888 8888</a>
          </div>
        </div>
        <div class="w-[50%] md:w-1/4 sm:w-1/2">
          <template v-for="(item, index) in footerInfo" :key="index">
            <div class="pb-3">
              <div class="flex flex-col h-full">
                <div class="text-[#B3C5FE] font-bold mb-2">{{ item.title }}</div>
                <template v-for="(content, contentIndex) in item.content" :key="contentIndex">
                  <a
                    v-if="content.url === 'https://ht.cfcfilms.cn/XKJxzWjvFd.php/index/login'"
                    class="text-[#fff] mb-2 cursor-pointer"
                    :href="content.url"
                    >{{ content.label }}</a
                  >
                  <div
                    v-else
                    class="text-[#fff] mb-2 cursor-pointer"
                    @click="goProduct(content.linkUrl, content.query)"
                  >
                    {{ content.label }}
                  </div>
                </template>
              </div>
            </div>
          </template>
        </div>
        <div class="w-[100%] md:w-1/4 sm:w-1/2 pb-3">
          <div class="text-[#B3C5FE] font-bold mb-2 w-full flex justify-between">
            <span>留言</span>
          </div>
        </div>
      </div>
    </div> -->
  </footer>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { getPageData } from '../../util/globalUtil.js'
const globalPageData = getPageData()

const router = useRouter()

const goProduct = (path, query) => {
  if (path) {
    router.push({
      path: `/${path}`,
      query: {
        _id: query,
      },
    })
  }
}
</script>
