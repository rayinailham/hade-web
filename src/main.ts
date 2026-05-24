import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import { products } from './data/products'
import './styles/main.css'

const routes = [
  { path: '/', name: 'home', component: () => import('./views/HomeView.vue') },
  { path: '/products', name: 'products', component: () => import('./views/ProductsView.vue') },
  {
    path: '/products/:slug',
    name: 'product-detail',
    component: () => import('./views/ProductDetailView.vue'),
    props: true,
  },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('./views/NotFoundView.vue') },
]

// Pre-render routes for SSG. /, /products, /products/<slug> for every product.
// vite-ssg passes static-extracted paths in `paths`; we override with our own
// list so dynamic `/products/:slug` is expanded into one HTML per slug.
export const includedRoutes = (_paths: string[]): string[] => {
  return [
    '/',
    '/products',
    ...products.map((p) => `/products/${p.slug}`),
  ]
}

export const createApp = ViteSSG(
  App,
  {
    routes,
    // Lenis owns scroll. Suppress vue-router's native scroll behaviour.
    scrollBehavior() {
      return false
    },
  },
  () => {
    // vite-ssg manages the head plugin internally (useHead: true by default),
    // so we don't need to install it again here.
  },
)
