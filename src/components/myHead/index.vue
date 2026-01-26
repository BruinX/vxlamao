<template>
  <header
    ref="headerRef"
    class="w-full fixed top-0 left-0 z-50 text-white flex justify-center items-center transition-all duration-300 backdrop-blur-sm bg-black/80 md:bg-black/30"
    :class="{ '!bg-black/50 backdrop-blur-none ': scrolled }"
  >
    <!-- <div class="max-w-7xl mx-auto h-16 md:h-20 flex items-center justify-between px-4 md:px-6"> -->
    <div class="container h-16 md:h-20 flex items-center justify-between px-4 md:px-0">
      <!-- 左侧 Logo -->
      <div class="flex items-center gap-2" @click="goPath('/')">
        <img src="../../assets/image/logo.png" alt="logo" class="h-12 md:h-20 w-auto" />
      </div>

      <!-- 中间导航 (PC) -->
      <nav class="hidden md:flex items-center gap-6 flex-1 ml-10">
        <template v-for="item in navs" :key="item.path">
          <div
            v-if="item.label !== 'PRODUCTS'"
            class="text-sm font-semibold tracking-wide hover:text-orange-500 transition-colors select-none cursor-pointer"
            :class="{ 'text-orange-500': pagePath == item.path }"
            @click="goPath(item.path, { query: item.path })"
          >
            {{ item.label }}
          </div>

          <div v-else class="dropdown" :class="openDropdown ? 'dropdown-open' : 'dropdown-close'">
            <div
              tabindex="0"
              role="button"
              class="text-sm font-semibold tracking-wide hover:text-orange-500 transition-colors select-none cursor-pointer"
              :class="{ 'text-orange-500': pagePath == item.path }"
              @click="openDropdown = !openDropdown"
            >
              {{ item.label }}
            </div>
            <ul
              tabindex="-1"
              class="dropdown-content menu bg-base-100 rounded-box z-1 w-64 p-2 shadow-sm"
            >
              <li
                v-for="liItem in globalPageData.common.product"
                :key="liItem.id"
                class="text-sm font-semibold tracking-wide hover:text-orange-500 transition-colors select-none cursor-pointer text-theme"
                :class="{ '!text-orange-500': productsId == liItem.id }"
                @click.stop="goPath('/products', { id: liItem.id })"
              >
                <p>{{ liItem.title }}</p>
              </li>
            </ul>
          </div>
        </template>
      </nav>

      <!-- 右侧搜索 (PC) -->
      <div class="hidden md:block relative ml-auto">
        <!-- <input
          type="text"
          placeholder="Search for products"
          class="w-full h-9 pl-3 pr-9 text-sm text-white bg-neutral-800 border border-neutral-600 rounded focus:outline-none focus:border-orange-500"
        /> -->
        <button class="btn rounded-full">contact us</button>
      </div>

      <!-- 移动端 Hamburger -->
      <div class="md:hidden z-50">
        <button @click.stop="isOpen = !isOpen">
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
    <div
      class="md:hidden absolute top-full left-0 w-full bg-neutral-800 duration-300"
      :class="{ ' h-80 ': isOpen, 'h-0 overflow-hidden ': !isOpen }"
      @click.stop
    >
      <nav class="flex flex-col p-4 gap-3">
        <template v-for="item in navs" :key="item.path">
          <div
            v-if="item.label !== 'PRODUCTS'"
            class="font-semibold hover:text-orange-500"
            :class="{ 'text-orange-500': pagePath == item.path }"
            @click="goPath(item.path, { query: item.path })"
          >
            {{ item.label }}
          </div>
          <details v-else class="collapse" name="my-accordion-det-1">
            <summary class="collapse-title font-semibold p-0">{{ item.label }}</summary>
            <div
              v-for="liItem in globalPageData.common.product"
              :key="liItem.id"
              class="collapse-content ml-4 py-2 p-0 border-b border-orange-500"
              :class="{ '!text-orange-500': productsId == liItem.id }"
              @click.stop="goPath('/products', { id: liItem.id })"
            >
              <p>{{ liItem.title }}</p>
            </div>
          </details>
        </template>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { getPageData } from '../../util/globalUtil.js'
const globalPageData = getPageData()

const isOpen = ref(false)
const scrolled = ref(false)
const router = useRouter()
const route = useRoute()
const headerRef = ref(null)
const openDropdown = ref(false)

const navs = [
  { label: 'PRODUCTS', path: '/products' },
  { label: 'WARRANTY', path: '/warranty' },
  { label: 'ABOUT US', path: '/about' },
]

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}
const pagePath = ref('/')
const productsId = ref(null)

watchEffect(() => {
  if (route.path) {
    pagePath.value = route.path
    productsId.value = route.query.id
    console.log('pagePath.value', route.path)
    console.log('pagePath', route)
  }
})

const handleClickOutside = (e) => {
  if (!isOpen.value) return
  if (!headerRef.value) return

  // 如果点击不在 header 内
  if (!headerRef.value.contains(e.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})

const goPath = (path, query) => {
  if (query) {
    router.push({
      path: `${path}`,
      query: query,
    })
  } else {
    router.push({
      path: `${path}`,
    })
  }
  isOpen.value = false
  openDropdown.value = false
}
</script>
