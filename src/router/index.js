import { createRouter, createWebHistory } from 'vue-router'
import AOS from 'aos'
import index from '../pages/index.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
    },
  ],
})

router.afterEach(() => {
  AOS.refresh()
})

export default router
