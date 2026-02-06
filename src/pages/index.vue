<template>
  <div class="pt-16 lg:pt-0">
    <!-- 图片容器 -->
    <div data-aos="fade-down" class="w-full relative overflow-hidden" :style="{ height: `${pageData.screenheight}` }">
      <img src="../assets/image/Mask_group.png" alt="Mask_group" loading="lazy" class="w-full h-full object-cover" />
      <!-- <p class="banner_title text-xl sm:text-2xl md:text-4xl lg:text-7xl text-white">
        Every Car Deserves Protection
      </p> -->
      <div class="banner_title text-white">
        <BlurReveal :delay="0.2" :duration="0.75" class="">
          <p class="font-bold tracking-tighter text-xl sm:text-2xl md:text-4xl lg:text-7xl">
            Every Car Deserves Protection
          </p>
        </BlurReveal>
      </div>
    </div>
    <div class="relative text-white">
      <img class="w-full h-[400px] md:h-screen object-cover z-0" :src="`/images/index_warranty_bg.jpg`"
        alt="idnex_warranty_bg" />
      <div
        class="absolute top-1/2 left-1/2 -translate-1/2 px-4 text-center items-center justify-center overflow-hidden">
        <BoxReveal color="#E1251B">
          <p class="w-full font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl">
            WARRANTY INQUIRY
          </p>
        </BoxReveal>
        <BoxReveal color="#E1251B" :duration="0.8">
          <p class="w-full text-lg sm:text-xl md:text-3xl lg:text-4xl">
            Vxlamao Solves Eight Core Problems for Your Car.
          </p>
        </BoxReveal>

        <div
          class="w-[92dvw] md:w-[40dvw] mx-auto h-14 bg-white rounded-full p-2 mt-8 cursor-pointer select-none flex justify-between items-center flex-nowrap"
          @click="goPath('/warranty')">
          <div class="flex justify-start items-center pl-2">
            <i class="iconfont icon-sousuo !text-theme !text-3xl"></i>
            <p class="text-gray-400 pl-3">Enter search keywords</p>
          </div>
          <div class="bg-theme h-full w-1/4 md:w-1/6 rounded-full flex justify-center items-center flex-nowrap">
            <p>Search</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="pageStore.productsCateList" class="mx-auto grid grid-cols-1 md:grid-cols-2">
      <div v-for="item in pageStore.productsCateList" :key="item.id"
        class="w-full h-[35vh] md:h-[48vh] bg-gray-100 relative" data-aos="fade-up">
        <img :src="item.cover" alt="Mask_group" loading="lazy" class="w-full h-full object-cover" />
        <div class="banner_title !top-1/8 flex justify-center items-center flex-wrap select-none" data-aos="fade-up"
          data-aos-delay="300">
          <p class="text-xl sm:text-2xl md:text-4xl lg:text-5xl w-full text-center" :class="` text-${item.color}`">
            {{ item.title }}
          </p>
          <router-link
            class="mt-3 py-2 px-4 rounded-full border text-center cursor-pointer bg-white/25 duration-300 active:bg-white active:text-black xl:hover:bg-white xl:hover:text-black"
            :class="` text-${item.color} border-${item.color}`" :to="{ name: 'products', params: { cateId: item.id } }">
            View more
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from '../stores/counter.js'
import { getPageData } from '../util/globalUtil.js'
const pageStore = useCounterStore()
const router = useRouter()

const pageData = reactive({
  screenheight: '0px',
})
const globalPageData = getPageData()
const calcHeight = () => {
  const width = document.documentElement.clientWidth
  pageData.screenheight = (width * 900) / 1760 + 'px'
}

const cateList = ref();

const goPath = (path, query) => {
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

onMounted(async () => {
  calcHeight()
  window.addEventListener('resize', calcHeight)
  console.log('pageStore.productsCateList', pageStore.productsCateList);
})
</script>

<style lang="scss" scoped></style>
