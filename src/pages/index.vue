<template>
  <div class="pt-16 lg:pt-0 flex justify-center">
    <!-- 图片容器 -->
    <div
  
    data-aos="fade-down"
      class="w-full relative overflow-hidden"
      :style="{ height: `${pageData.screenheight}`}"
    >
      <img
        src="../assets/image/Mask_group.png"
        alt="Mask_group"
        loading="lazy"
        class="w-full h-full object-cover"
      />
        <p class="banner_title sm:text-2xl md:text-4xl lg:text-5xl">Every Car Deserves Protection</p>
    </div>

    <!-- <div class="container flex justify-center">
      <div class="w-full h-50 bg-amber-400"></div>
    </div> -->

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
