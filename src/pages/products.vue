<template>
  <div
    data-aos="fade-down"
    class="w-full h-[50dvh] md:h-screen pt-16 md:pt-20 relative overflow-hidden"
  >
    <img
      :src="`/images/${productInfo.imaPath}`"
      alt="Mask_group"
      loading="lazy"
      class="w-full h-full object-cover"
    />
    <div class="banner_title pt-6 md:pt-0">
      <BlurReveal :delay="0.2" :duration="0.75" class="">
        <p
          class="font-bold tracking-tighter text-3xl md:text-4xl lg:text-7xl"
          :class="`text-${productInfo.color}`"
        >
          {{ productInfo.title }}
        </p>
      </BlurReveal>
    </div>
  </div>

  <div class="text-center py-10 md:py-28">
    <p class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl">{{ productInfo.title }}</p>
    <p class="sm:text-lg md:text-xl lg:text-2xl md:max-w-1/2 mx-auto px-2 pt-6 text-gray-500">
      Stand out with XLAMAO® Color Paint Protection Film. Combining bold color styling with durable
      TPU protection, it transforms your car’s look while guarding against scratches, weather, and
      fading — beauty with built-in defense.
    </p>
  </div>

  <div
    class="relative w-full h-[70dvh] md:h-[80dvh] bg-no-repeat bg-cover bg-center cursor-pointer"
    style="background-image: url('/images/product_bg.jpg')"
  >
    <!-- mask -->
    <div class="absolute inset-0 bg-black/55"></div>
    <!-- content -->
    <div class="relative container mx-auto text-white p-4 md:pt-16">
      <p class="font-bold text-xl sm:text-2xl md:text-4xl lg:text-5xl">PRODUCT FEATURES</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-10 pt-2 md:pt-10">
        <p v-for="item in 4" class="sm:text-lg md:text-xl lg:text-2xl pt-6 flex justify-start items-center">
          <div class="radial-progress text-white shrink-0 mr-3" style="--value:70; --thickness: 4px; --size: 4rem" aria-valuenow="70" role="progressbar">
            <i class="iconfont icon-fangshuifangchen !text-3xl"></i>
          </div>
          <p> - UV and stain-resistant for a lasting finish in any climate.
          </p>
        </p>

      </div>
    </div>
  </div>
</template>

<script setup>
import { getPageData } from '../util/globalUtil.js'
const router = useRouter()
const route = useRoute()
const globalPageData = getPageData()
const productInfo = computed(() =>
  globalPageData.common.product.find((item) => item.id == route.query.id),
)

onMounted(() => {
  console.log('productsRouterQuery', route.query)
  console.log('productInfo', productInfo.value)
})
</script>

<style lang="scss" scoped></style>
