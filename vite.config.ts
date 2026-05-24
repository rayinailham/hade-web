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
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split heavy deps into their own chunks so the main bundle stays small.
        // Mobile especially benefits — gsap+lenis are ~80KB combined and only
        // needed after first paint.
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('lenis')) return 'lenis'
          if (id.includes('vue-router')) return 'vue-router'
          if (id.includes('@vue') || id.includes('/vue/')) return 'vue'
          if (id.includes('@unhead')) return 'unhead'
        },
      },
    },
  },
  ssgOptions,
})
