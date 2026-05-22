<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { gsap } from 'gsap'
import { useLenis } from './composables/useLenis'
import { useReveal } from './composables/useReveal'

import IntroScreen from './components/IntroScreen.vue'
import SiteNav from './components/SiteNav.vue'
import CustomScrollbar from './components/CustomScrollbar.vue'
import SiteFooter from './components/SiteFooter.vue'

useLenis()
useReveal()

const router = useRouter()
const route = useRoute()
const transitioning = ref(false)

// Track browser back/forward — skip fade for these
const scrollMap = new Map<string, number>()
let isPopNav = false

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    isPopNav = true
  })
}

router.beforeEach((_to, from) => {
  // Save scroll for current page before leaving
  if (from.fullPath) scrollMap.set(from.fullPath, window.scrollY)
})

function scrollTo(y: number, smooth = false) {
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
  if (lenis) {
    if (smooth) lenis.scrollTo(y, { duration: 0.7, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
    else lenis.scrollTo(y, { immediate: true, duration: 0 })
  } else {
    window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' })
  }
}

function onBeforeEnter(el: Element) {
  if (isPopNav) {
    gsap.set(el, { opacity: 1 })
    return
  }
  // Page mounts hidden behind the veil
  gsap.set(el, { opacity: 0 })
}

function onEnter(el: Element, done: () => void) {
  if (isPopNav) {
    isPopNav = false
    gsap.set(el, { opacity: 1 })
    // Smooth-scroll restore to saved position
    scrollTo(scrollMap.get(route.fullPath) ?? 0, true)
    done()
    return
  }

  // Page is now mounted (and at top — scroll was animated behind the veil)
  gsap.set(el, { opacity: 1 })

  // Brief settle so first paint + entrance anims begin behind the veil,
  // then drop the veil to reveal a fully-painted page.
  gsap.delayedCall(0.15, () => {
    transitioning.value = false
    done()
  })
}

function onLeave(_el: Element, done: () => void) {
  if (isPopNav) {
    done()
    return
  }
  // 1) Raise the veil
  transitioning.value = true

  // 2) Once the veil has fully covered, animate scroll to top behind it
  gsap.delayedCall(0.25, () => {
    scrollTo(0, true)
    // 3) Wait for the smooth scroll to complete before swapping pages
    gsap.delayedCall(0.7, done)
  })
}
</script>

<template>
  <IntroScreen />
  <SiteNav />

  <RouterView v-slot="{ Component, route }">
    <transition
      mode="out-in"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
      <keep-alive :max="10">
        <component :is="Component" :key="route.fullPath" />
      </keep-alive>
    </transition>
  </RouterView>

  <SiteFooter />
  <CustomScrollbar />

  <!-- Route veil — quick paper-coloured wipe under the transitioning page -->
  <div class="route-veil" :class="{ 'is-active': transitioning }" aria-hidden="true"></div>
</template>

<style scoped>
.route-veil {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
  background:
    radial-gradient(circle at 50% 35%, rgba(14, 14, 15, 0.04), transparent 65%),
    var(--bg);
  opacity: 0;
  transition: opacity 0.5s var(--ease-out);
}

.route-veil.is-active {
  opacity: 1;
  transition-duration: 0.25s;
}
</style>
