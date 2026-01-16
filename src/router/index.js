import { createRouter, createWebHistory } from 'vue-router'
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

export default router
