<template>
  <div class="relative text-white">
    <!-- mask -->
    <div class="absolute inset-0 bg-black/50"></div>
    <img
      class="w-full h-[80dvh] md:h-screen object-cover z-0"
      :src="`/images/WARRANTY_bg.png`"
      alt="WARRANTY_bg"
    />
    <div
      class="absolute top-1/2 left-1/2 -translate-1/2 px-4 text-center items-center justify-center overflow-hidden"
    >
      <BoxReveal color="#E1251B">
        <p class="w-full font-bold text-3xl md:text-4xl lg:text-7xl">VXLAMAO</p>
      </BoxReveal>
      <BoxReveal color="#E1251B">
        <p class="w-full font-bold text-3xl md:text-4xl lg:text-7xl">WARRANTY INQUIRY</p>
      </BoxReveal>
      <BoxReveal color="#E1251B" :duration="0.8">
        <p class="w-full text-base sm:text-lg md:text-xl lg:text-2xl pt-5">
          Vxlamao Solves Eight Core Problems for Your Car.
        </p>
      </BoxReveal>

      <div
        class="w-[92dvw] md:w-[40dvw] mx-auto h-14 bg-white rounded-full p-2 mt-8 cursor-pointer select-none flex justify-between items-center flex-nowrap"
      >
        <div class="flex justify-start items-center pl-2">
          <i class="iconfont icon-sousuo !text-theme !text-3xl"></i>
          <p class="text-gray-400 pl-3">Enter search keywords</p>
        </div>
        <div
          class="bg-theme h-full w-1/4 md:w-1/6 rounded-full flex justify-center items-center flex-nowrap"
        >
          <p>Search</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
