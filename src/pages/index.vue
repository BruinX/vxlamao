<template>
  <div class="pt-16 lg:pt-0">
    <!-- 图片容器 -->
    <div
      data-aos="fade-down"
      class="w-full relative overflow-hidden"
      :style="{ height: `${pageData.screenheight}` }"
    >
      <img
        src="../assets/image/Mask_group.png"
        alt="Mask_group"
        loading="lazy"
        class="w-full h-full object-cover"
      />
      <p class="banner_title text-xl sm:text-2xl md:text-4xl lg:text-7xl text-white">
        Every Car Deserves Protection
      </p>
    </div>

    <div class="mx-auto grid grid-cols-1 md:grid-cols-2">
      <div
        v-for="item in globalPageData.common.product"
        :key="item.imaPath"
        class="w-full h-[35vh] md:h-[48vh] bg-gray-100 relative"
        data-aos="fade-up"
      >
        <img
          :src="'/src/assets/image/' + item.imaPath"
          alt="Mask_group"
          loading="lazy"
          class="w-full h-full object-cover"
        />
        <div
          class="banner_title !top-1/8 flex justify-center items-center flex-wrap select-none"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <p
            class="text-xl sm:text-2xl md:text-4xl lg:text-5xl w-full text-center"
            :class="` text-${item.color}`"
          >
            {{ item.title }}
          </p>
          <div
            class="mt-3 py-2 px-4 rounded-full border text-center cursor-pointer bg-white/25 duration-300 active:bg-white active:text-black xl:hover:bg-white xl:hover:text-black"
            :class="` text-${item.color} border-${item.color}`"
          >
            View more
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getPageData } from '../util/globalUtil.js'
const pageData = reactive({
  screenheight: '0px',
})
const globalPageData = getPageData()
const calcHeight = () => {
  const width = document.documentElement.clientWidth
  pageData.screenheight = (width * 900) / 1760 + 'px'
}

onMounted(() => {
  calcHeight()
  window.addEventListener('resize', calcHeight)
})
</script>

<style lang="scss" scoped>
.banner_title {
  position: absolute;
  width: 80%;
  top: 20%;
  left: 10%;
  font-weight: 600;
  text-align: center;
}
</style>
