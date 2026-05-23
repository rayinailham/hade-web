import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import { router } from './router'
import './styles/main.css'

const head = createHead()
const app = createApp(App).use(router).use(head)

// Wait for router to resolve initial route before mounting. Without this,
// route.name is undefined on first paint, causing IntroScreen (v-if on
// route.name === 'home') to skip its first frame — which flashed the
// SiteFooter before the intro mounted.
router.isReady().then(() => {
  app.mount('#app')
})
