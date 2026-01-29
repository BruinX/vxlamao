import { createRouter, createWebHistory } from 'vue-router'
import AOS from 'aos'
import index from '../pages/index.vue'
import warranty from '../pages/warranty/index.vue'
import bill from '../pages/warranty/bill.vue'
import products from '../pages/products/index.vue'
import productsInfo from '../pages/products/info.vue'
import caseIndex from '../pages/case/index.vue'
import caseInfo from '../pages/case/info.vue'
import about from '../pages/about.vue'



const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    // 浏览器前进 / 后退
    if (savedPosition) {
      return savedPosition
    }

    //只有 products 页面不需要平滑滚动
    if (
      to.name === 'products' &&
      from.name === 'products'
    ) {
      return false
    }

    // 普通路由跳转
    return {
      top: 0,
      left: 0,
      behavior: 'smooth', // 可选：平滑滚动
    }
  },
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
    {
      path: '/warranty',
      name: 'warranty',
      component: warranty,
      children: [
        {
          path: 'bill',
          name: 'bill',
          component: bill,
        },
      ],
    },
    {
      path: '/products',
      name: 'products',
      component: products,
      children: [
        {
          path: 'productsInfo',
          name: 'productsInfo',
          component: productsInfo,
        },
      ],

    },
    {
      path: '/case',
      name: 'case',
      component: caseIndex,
      children: [
        {
          path: 'caseInfo',
          name: 'caseInfo',
          component: caseInfo,
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: about,
    },
  ],
})

router.afterEach(() => {
  AOS.refresh()
})

export default router
