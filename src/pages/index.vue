<template>
  <div class="relative size-full">
    <!-- 轮播图 -->
    <div class="carousel w-full overflow-hidden h-56 md:h-145 relative">
      <div
        v-for="(item, index) in carouselList"
        :key="item.id"
        :id="slideId(index)"
        class="carousel-item relative w-full"
      >
        <img
          src="../assets/image/Mask_group.png"
          class="w-full object-cover"
          :alt="item.alt"
          loading="lazy"
        />

        <!-- 左右切换 -->
        <!-- <div class="absolute inset-y-1/2 left-5 right-5 flex -translate-y-1/2 justify-between">
        <a
          :href="`#${slideId(prevIndex(index))}`"
          class="btn btn-circle"
          @click="activeIndex = prevIndex(index)"
        >
          ❮
        </a>
        <a
          :href="`#${slideId(nextIndex(index))}`"
          class="btn btn-circle"
          @click="activeIndex = nextIndex(index)"
        >
          ❯
        </a>
      </div> -->
      </div>
    </div>
    <div class="absolute max-w-7xl text-center text-2xl md:text-5xl font-bold text-red">
      <p class="w-full">GET THE LOOK WITH PRIVACY</p>
      <p class="w-full">GET THE LOOK WITH PRIVACY</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const carouselList = [
  {
    id: 1,
    imageUrl: '../assets/image/Mask_group.png',
    alt: 'GET THE LOOK WITH PRIVACY',
  },
]

// 当前激活索引（方便扩展自动轮播/埋点）
const activeIndex = ref(0)

const slideId = (index) => `slide-${index}`

const prevIndex = (index) => (index === 0 ? carouselList.length - 1 : index - 1)

const nextIndex = (index) => (index === carouselList.length - 1 ? 0 : index + 1)
</script>

<style lang="scss" scoped>
.btn-circle {
  background-color: rgba(255, 255, 255, 0.85);
}
.btn-circle:hover {
  background-color: #fff;
}
</style>
