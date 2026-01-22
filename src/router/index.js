import { createRouter, createWebHistory } from 'vue-router'
import AOS from 'aos'
import index from '../pages/index.vue'
import warranty from '../pages/warranty.vue'
import products from '../pages/products.vue'
import about from '../pages/about.vue'

const router = createRouter({
  history: createWebHistory(),
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
    },
    {
      path: '/products',
      name: 'products',
      component: products,
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
