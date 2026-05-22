<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from './composables/useLenis'
import { useReveal } from './composables/useReveal'

import IntroScreen from './components/IntroScreen.vue'
import SiteNav from './components/SiteNav.vue'
import CustomScrollbar from './components/CustomScrollbar.vue'
import SiteFooter from './components/SiteFooter.vue'

useLenis()
useReveal()

const transitioning = ref(false)

if (typeof window !== 'undefined') {
  // Disable browser's native scroll restoration. We always land at the top
  // of the new page (forward AND back/forward), driven by the veil flow in
  // onLeave/onEnter below. Without this, browser would auto-jump scrollY
  // on popstate before our hooks run.
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual'
  }
}

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
  // Page mounts hidden behind the veil
  gsap.set(el, { opacity: 0 })
}

function onEnter(el: Element, done: () => void) {
  // Veil is fully covering. Snap scroll to top BEFORE revealing the new
  // page so user always lands at the top — for forward nav AND for
  // browser back/forward.
  scrollTo(0, false)
  // Refresh ScrollTrigger so any cached-page reveals recompute against
  // the new scroll position (keep-alive views keep their triggers).
  ScrollTrigger.refresh()

  gsap.set(el, { opacity: 1 })

  // Brief settle so first paint + entrance anims begin behind the veil,
  // then drop the veil to reveal a fully-painted page at the top.
  gsap.delayedCall(0.15, () => {
    transitioning.value = false
    done()
  })
}

function onLeave(_el: Element, done: () => void) {
  // 1) Raise the veil
  transitioning.value = true

  // 2) Once the veil has fully covered, hand off to Vue so the page swap
  //    happens behind it. Scroll-to-top is performed in onEnter, after
  //    the new view is mounted but still hidden under the veil.
  gsap.delayedCall(0.3, done)
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
