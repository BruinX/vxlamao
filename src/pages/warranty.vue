<template>
  <div class="relative text-white">
    <!-- mask -->
    <div class="absolute inset-0 bg-black/50"></div>
    <img class="w-full h-[80dvh] md:h-screen object-cover z-0" :src="`/images/WARRANTY_bg.png`" alt="WARRANTY_bg" />
    <div class="absolute top-1/2 left-1/2 -translate-1/2 px-4 text-center items-center justify-center overflow-hidden">
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


      <div class="mt-4 w-[92dvw] md:w-[40dvw] mx-auto">
        <el-input v-model="input3" size="large" autofocus placeholder="Please input" class="input-with-select">
          <template #prepend>
            <el-select v-model="select" size="large" placeholder="Select" style="width: 120px">
              <el-option label="Restaurant" value="1" />
              <el-option label="Order No." value="2" />
              <el-option label="Tel" value="3" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" />
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue'
const input3 = ref('')
const select = ref('')
</script>

<style lang="scss" scoped></style>
