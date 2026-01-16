<template>
  <header class="w-full bg-neutral-900 text-white">
    <div class="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between px-4 md:px-6">
      <!-- 左侧 Logo -->
      <div class="flex items-center gap-2">
        <img src="../../assets/image/logo.png" alt="CFC Films" class="h-12 md:h-20 w-auto" />
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
        <svg
          class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15
               7.5 7.5 0 0 1 0 15z"
          />
        </svg>
      </div>

      <!-- 移动端 Hamburger -->
      <div class="md:hidden">
        <button @click="isOpen = !isOpen" class="focus:outline-none">
          <svg
            class="w-6 h-6 text-white"
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
    <div v-show="isOpen" class="md:hidden bg-neutral-800 absolute top-16 left-0 w-full h-auto">
      <nav class="flex flex-col p-4 gap-3">
        <a
          v-for="item in navs"
          :key="item.path"
          href="#"
          class="text-sm font-semibold tracking-wide hover:text-orange-500 transition-colors"
        >
          {{ item.label }}
        </a>

        <div v-for="item in navs" :key="item.path" class="collapse collapse-arrow border-base-300">
          <input type="radio" name="my-accordion-2" />
          <div class="collapse-title font-semibold p-0">account</div>
          <div class="collapse-content py-1 text-sm">Click</div>
        </div>

        <!-- 移动端搜索 -->
        <div class="relative mt-2">
          <input
            type="text"
            placeholder="Search for products"
            class="w-full h-9 pl-3 pr-9 text-sm text-white bg-neutral-700 border border-neutral-600 rounded focus:outline-none focus:border-orange-500"
          />
          <svg
            class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15
                 7.5 7.5 0 0 1 0 15z"
            />
          </svg>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const navs = [
  { label: 'COVERAGE', path: '/coverage' },
  { label: 'PRODUCTS', path: '/products' },
  { label: 'SHOP', path: '/shop' },
  { label: 'ABOUT US', path: '/about' },
]
</script>
