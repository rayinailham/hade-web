import { createRouter, createWebHistory } from 'vue-router'

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
  // We never want vue-router to call window.scrollTo() — Lenis owns scroll
  // and would fight any native jump. Scroll is handled inside the view-
  // transition callback (useViewTransition.ts) and SiteNav's hash logic.
  scrollBehavior() {
    return false
  },
})
