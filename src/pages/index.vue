<template>
  <div class="pt-16 lg:pt-0">
    <!-- 图片容器 -->
    <div
      data-aos="fade-down"
      class="w-full relative overflow-hidden"
      :style="{ height: `${pageData.screenheight}` }"
    >
      <img
        src="../assets/image/Mask_group.jpg"
        alt="Mask_group"
        loading="lazy"
        class="w-full h-full object-cover"
      />
      <p class="banner_title sm:text-2xl md:text-4xl lg:text-5xl">Every Car Deserves Protection</p>
    </div>

    <div v-if="false" class="mx-auto grid grid-cols-1 md:grid-cols-2">
      <div
        v-for="item in product"
        :key="item.imaPath"
        class="w-full h-[25vh] md:h-[46vh] bg-gray-100 relative"
      >
        <img
          :src="'/src/assets/image/' + item.imaPath"
          alt="Mask_group"
          loading="lazy"
          class="w-full h-full object-cover"
        />
        <div class="banner_title !top-1/7 flex justify-center items-center flex-wrap select-none">
          <p
            class="sm:text-2xl md:text-4xl lg:text-5xl w-full text-center"
            :class="` text-${item.color}`"
          >
            {{ item.title }}
          </p>
          <div
            class="mt-3 py-2 px-4 rounded-full border text-center cursor-pointer bg-white/25 duration-300 active:bg-white active:text-black xl:hover:bg-white xl:hover:text-black block"
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
const pageData = reactive({
  screenheight: '0px',
})

const calcHeight = () => {
  const width = document.documentElement.clientWidth
  pageData.screenheight = (width * 850) / 1760 + 'px'
}

const product = [
  {
    imaPath: 'product_view1.jpg',
    path: '/',
    title: 'Color film',
    color: 'white',
  },
  {
    imaPath: 'product_view2.jpg',
    path: '/',
    title: 'TPU invisible car clothes',
    color: 'white',
  },
  {
    imaPath: 'product_view3.jpg',
    path: '/',
    title: 'Window film',
    color: 'black',
  },
  {
    imaPath: 'product_view4.jpg',
    path: '/',
    title: 'Black film of window frame',
    color: 'black',
  },
]

onMounted(() => {
  calcHeight()
  window.addEventListener('resize', calcHeight)
})
</script>

<style lang="scss" scoped>
.banner_title {
  position: absolute;
  width: 80%;
  top: 30%;
  left: 10%;
  font-weight: 600;
  color: white;
  text-align: center;
}
</style>
