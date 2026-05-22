<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { getLenis } from '../composables/useLenis'

const trackRef = ref<HTMLDivElement | null>(null)
const thumbRef = ref<HTMLDivElement | null>(null)
const visible = ref(false)

let rafId = 0
let trackHeight = 0
let thumbHeight = 0
let isDragging = false
let dragStartY = 0
let dragStartScroll = 0
let hideTimer: number | null = null

const MIN_THUMB = 48
const TRACK_INSET = 16 // px from top/bottom of track within viewport

function computeSizes() {
  const track = trackRef.value
  if (!track) return
  trackHeight = track.clientHeight
  const docHeight = document.documentElement.scrollHeight
  const winHeight = window.innerHeight
  const ratio = winHeight / docHeight
  thumbHeight = Math.max(MIN_THUMB, Math.floor(trackHeight * ratio))
  if (thumbRef.value) {
    thumbRef.value.style.height = `${thumbHeight}px`
  }
  // Hide if no scroll possible
  visible.value = docHeight > winHeight + 4
}

function updateThumb(scrollY: number) {
  if (!thumbRef.value) return
  const docHeight = document.documentElement.scrollHeight
  const winHeight = window.innerHeight
  const maxScroll = Math.max(1, docHeight - winHeight)
  const progress = Math.min(1, Math.max(0, scrollY / maxScroll))
  const maxThumbY = trackHeight - thumbHeight
  const y = progress * maxThumbY
  thumbRef.value.style.transform = `translate3d(0, ${y}px, 0)`
}

function showThumb() {
  const track = trackRef.value
  if (!track) return
  track.classList.add('is-active')
  if (hideTimer) window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    if (!isDragging) track.classList.remove('is-active')
  }, 1200)
}

function onScroll() {
  updateThumb(window.scrollY)
  showThumb()
}

function scrollToProgress(progress: number) {
  const lenis = getLenis()
  const docHeight = document.documentElement.scrollHeight
  const winHeight = window.innerHeight
  const maxScroll = Math.max(0, docHeight - winHeight)
  const target = progress * maxScroll
  if (lenis) {
    lenis.scrollTo(target, { immediate: true, force: true })
  } else {
    window.scrollTo(0, target)
  }
}

function onTrackPointerDown(e: PointerEvent) {
  if (e.target === thumbRef.value) return
  const track = trackRef.value
  if (!track) return
  const rect = track.getBoundingClientRect()
  const clickY = e.clientY - rect.top - thumbHeight / 2
  const progress = Math.min(1, Math.max(0, clickY / (trackHeight - thumbHeight)))
  scrollToProgress(progress)
}

function onThumbPointerDown(e: PointerEvent) {
  e.preventDefault()
  e.stopPropagation()
  isDragging = true
  dragStartY = e.clientY
  dragStartScroll = window.scrollY
  thumbRef.value?.setPointerCapture(e.pointerId)
  document.body.style.userSelect = 'none'
  trackRef.value?.classList.add('is-active')
}

function onThumbPointerMove(e: PointerEvent) {
  if (!isDragging) return
  const deltaY = e.clientY - dragStartY
  const maxThumbY = trackHeight - thumbHeight
  if (maxThumbY <= 0) return
  const docHeight = document.documentElement.scrollHeight
  const winHeight = window.innerHeight
  const maxScroll = docHeight - winHeight
  const scrollDelta = (deltaY / maxThumbY) * maxScroll
  const target = Math.min(maxScroll, Math.max(0, dragStartScroll + scrollDelta))
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(target, { immediate: true, force: true })
  } else {
    window.scrollTo(0, target)
  }
}

function onThumbPointerUp(e: PointerEvent) {
  if (!isDragging) return
  isDragging = false
  thumbRef.value?.releasePointerCapture(e.pointerId)
  document.body.style.userSelect = ''
  showThumb()
}

function tick() {
  computeSizes()
  rafId = requestAnimationFrame(tick)
}

let resizeObs: ResizeObserver | null = null

onMounted(() => {
  computeSizes()
  updateThumb(window.scrollY)

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', computeSizes)

  // Watch document size changes (images loading, dynamic content)
  resizeObs = new ResizeObserver(() => {
    computeSizes()
    updateThumb(window.scrollY)
  })
  resizeObs.observe(document.documentElement)
  resizeObs.observe(document.body)

  // Initial settle
  setTimeout(() => {
    computeSizes()
    updateThumb(window.scrollY)
  }, 300)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', computeSizes)
  if (rafId) cancelAnimationFrame(rafId)
  if (hideTimer) window.clearTimeout(hideTimer)
  resizeObs?.disconnect()
})
</script>

<template>
  <div
    ref="trackRef"
    class="custom-scrollbar"
    :class="{ 'is-visible': visible }"
    :style="{ '--track-inset': `${TRACK_INSET}px` }"
    @pointerdown="onTrackPointerDown"
    aria-hidden="true"
  >
    <div
      ref="thumbRef"
      class="custom-scrollbar__thumb"
      @pointerdown="onThumbPointerDown"
      @pointermove="onThumbPointerMove"
      @pointerup="onThumbPointerUp"
      @pointercancel="onThumbPointerUp"
    />
  </div>
</template>

<style scoped>
.custom-scrollbar {
  position: fixed;
  top: 16px;
  bottom: 16px;
  right: 16px;
  width: 6px;
  border-radius: 999px;
  background: rgba(14, 14, 15, 0.06);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 200;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s var(--ease-out, cubic-bezier(0.32, 0.72, 0, 1)),
              width 0.2s var(--ease-out, cubic-bezier(0.32, 0.72, 0, 1));
}

.custom-scrollbar.is-visible {
  opacity: 1;
  pointer-events: auto;
}

.custom-scrollbar:hover,
.custom-scrollbar.is-active {
  width: 10px;
  background: rgba(14, 14, 15, 0.1);
}

.custom-scrollbar__thumb {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(14, 14, 15, 0.35);
  border-radius: 999px;
  cursor: grab;
  transition: background-color 0.2s var(--ease-out, cubic-bezier(0.32, 0.72, 0, 1));
  will-change: transform;
}

.custom-scrollbar__thumb:hover {
  background: rgba(14, 14, 15, 0.55);
}

.custom-scrollbar.is-active .custom-scrollbar__thumb {
  background: rgba(14, 14, 15, 0.7);
  cursor: grabbing;
}

@media (max-width: 768px) {
  .custom-scrollbar {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .custom-scrollbar,
  .custom-scrollbar__thumb {
    transition: none;
  }
}
</style>
