import { createRouter, createWebHistory } from 'vue-router'
import AOS from 'aos'
const Index = () => import('../pages/index.vue')
const WarrantyLayout = () => import('../pages/warranty/layout.vue')
const WarrantyQuery = () => import('../pages/warranty/query.vue')
const Bill = () => import('../pages/warranty/bill.vue')
const Products = () => import('../pages/products/index.vue')
const ProductsInfo = () => import('../pages/products/info.vue')
const CaseIndex = () => import('../pages/case/index.vue')
const CaseInfo = () => import('../pages/case/info.vue')
const About = () => import('../pages/about.vue')

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.name === 'products' && from.name === 'products') return false
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    { path: '/', name: 'index', component: Index },
    {
      path: '/warranty',
      component: WarrantyLayout,
      children: [
        { path: '', name: 'warranty', component: WarrantyQuery },
        { path: 'bill', name: 'bill', component: Bill }],
    },
    {
      path: '/products/:cateId',
      name: 'products',
      component: Products,
      children: [
        {
          path: ':productId',
          name: 'productsInfo',
          component: ProductsInfo,
          props: true,
        },
      ],
    },
    {
      path: '/case',
      name: 'case',
      component: CaseIndex,
      children: [{ path: 'caseInfo', name: 'caseInfo', component: CaseInfo }],
    },
    { path: '/about', name: 'about', component: About },
  ],
})


router.afterEach(() => {
  AOS.refresh()
})

export default router
