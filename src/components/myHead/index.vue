<template>
  <header
    class="w-full fixed top-0 left-0 z-50 text-white flex justify-center items-center transition-all duration-300 backdrop-blur-sm bg-black/80 md:bg-black/5"
    :class="{ '!bg-black/50 backdrop-blur-none ': scrolled }"
  >
    <!-- <div class="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between px-4 md:px-6"> -->
    <div class="container h-16 md:h-20 flex items-center justify-between px-4 md:px-0">
      <!-- 左侧 Logo -->
      <div class="flex items-center gap-2">
        <img src="../../assets/image/logo.avif" alt="logo" class="h-12 md:h-20 w-auto" />
      </div>

      <!-- 中间导航 (PC) -->
      <nav class="hidden md:flex items-center gap-6 flex-1 ml-10">
        <a
          v-for="item in navs"
          :key="item.path"
          href="#"
          class="text-sm font-semibold tracking-wide hover:text-orange-500 transition-colors"
        >
          {{ item.label }}
        </a>
      </nav>

      <!-- 右侧搜索 (PC) -->
      <div class="hidden md:block relative w-64 ml-auto">
        <input
          type="text"
          placeholder="Search for products"
          class="w-full h-9 pl-3 pr-9 text-sm text-white bg-neutral-800 border border-neutral-600 rounded focus:outline-none focus:border-orange-500"
        />
      </div>

      <!-- 移动端 Hamburger -->
      <div class="md:hidden z-50">
        <button @click="isOpen = !isOpen">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 移动端菜单 -->
    <div v-show="isOpen" class="md:hidden absolute top-full left-0 w-full bg-neutral-800">
      <nav class="flex flex-col p-4 gap-3">
        <a
          v-for="item in navs"
          :key="item.path"
          href="#"
          class="text-sm font-semibold hover:text-orange-500"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const isOpen = ref(false)
const scrolled = ref(false)

const navs = [
  { label: 'COVERAGE', path: '/coverage' },
  { label: 'PRODUCTS', path: '/products' },
  { label: 'SHOP', path: '/shop' },
  { label: 'ABOUT US', path: '/about' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
