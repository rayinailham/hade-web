<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { useLenis } from './composables/useLenis'
import { useReveal } from './composables/useReveal'

import IntroScreen from './components/IntroScreen.vue'
import SiteNav from './components/SiteNav.vue'
import CustomScrollbar from './components/CustomScrollbar.vue'
import SiteFooter from './components/SiteFooter.vue'

useLenis()
useReveal()

const transitioning = ref(false)

function onBeforeEnter(el: Element) {
  gsap.set(el, { opacity: 0, y: 24, filter: 'blur(8px)' })
}

function onEnter(el: Element, done: () => void) {
  transitioning.value = true
  // Reset Lenis to top before painting next route
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
  if (lenis) lenis.scrollTo(0, { immediate: true, duration: 0 })
  else window.scrollTo({ top: 0, behavior: 'auto' })

  gsap.to(el, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.85,
    ease: 'power3.out',
    onComplete: () => {
      transitioning.value = false
      done()
    },
  })
}

function onLeave(el: Element, done: () => void) {
  gsap.to(el, {
    opacity: 0,
    y: -16,
    filter: 'blur(6px)',
    duration: 0.45,
    ease: 'power2.in',
    onComplete: done,
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
      <component :is="Component" :key="route.fullPath" />
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
