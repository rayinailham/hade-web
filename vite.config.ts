import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ViteSSGOptions } from 'vite-ssg'
import { products } from './src/data/products'

const ssgOptions: ViteSSGOptions = {
  script: 'async',
  formatting: 'minify',
  dirStyle: 'nested',
  // Pre-render every known route. /products/:slug expanded per product.
  includedRoutes(_paths) {
    return [
      '/',
      '/products',
      ...products.map((p) => `/products/${p.slug}`),
    ]
  },
  beastiesOptions: {
    preload: 'swap',
    logLevel: 'silent',
  },
}

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
  },
  ssgOptions,
})
