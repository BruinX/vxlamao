<script setup></script>

<template>
  <MyHead class="z-50" />
  <router-view />
  <PageLoading class="z-30 fixed top-0 left-0" v-if="pageStore.pageLoading" />
  <MyFooter class="z-40" />
</template>
<script setup>
import { useCounterStore } from './stores/counter'
const pageStore = useCounterStore()

</script>

<style scoped></style>
