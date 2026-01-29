<script setup></script>

<template>
  <MyHead class="z-50" />
  <router-view />
  <PageLoading class="z-30 fixed top-0 left-0" v-if="pageStore.pageLoading" />
  <MyFooter class="z-40" />
  <el-backtop class="!z-50" :right="screenWidth > 1000 ? 100 : 20" :bottom="screenWidth > 1000 ? 100 : 50" />

</template>
<script setup>
import { useCounterStore } from './stores/counter'
const pageStore = useCounterStore()
const screenWidth = computed(() => window.innerWidth)

</script>

<style scoped></style>
