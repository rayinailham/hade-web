import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router'

const HomeView = () => import('../views/HomeView.vue')
const ProductsView = () => import('../views/ProductsView.vue')
const ProductDetailView = () => import('../views/ProductDetailView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/products', name: 'products', component: ProductsView },
    {
      path: '/products/:slug',
      name: 'product-detail',
      component: ProductDetailView,
      props: true,
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView },
  ],
  // Skip native scroll restoration. Lenis + custom transition handle it.
  scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized) {
    // Same route + only hash changes → let SiteNav handle Lenis scroll
    if (to.path === from.path && to.hash) return false
    return { top: 0 }
  },
})
