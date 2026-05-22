<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
const visible = ref(true)
let ctx: gsap.Context | null = null

const SKIP_KEY = 'hade-intro-played'

const lockScroll = () => {
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}
const unlockScroll = () => {
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

onMounted(() => {
  if (typeof window === 'undefined') return

  if (sessionStorage.getItem(SKIP_KEY) === '1') {
    visible.value = false
    return
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) {
    sessionStorage.setItem(SKIP_KEY, '1')
    visible.value = false
    return
  }

  lockScroll()

  ctx = gsap.context(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem(SKIP_KEY, '1')
        unlockScroll()
        visible.value = false
      },
    })

    // Phase 1 — viewfinder build
    tl.from('.bracket', {
      scale: 0.4,
      autoAlpha: 0,
      duration: 0.55,
      stagger: 0.05,
      ease: 'power3.out',
      transformOrigin: 'center',
    }, 0)
    tl.from('.vf-meta', {
      autoAlpha: 0,
      y: 6,
      duration: 0.45,
      stagger: 0.05,
      ease: 'power2.out',
    }, 0.1)
    tl.from('.cross-h', { scaleX: 0, transformOrigin: 'center', duration: 0.5, ease: 'power3.out' }, 0.18)
    tl.from('.cross-v', { scaleY: 0, transformOrigin: 'center', duration: 0.5, ease: 'power3.out' }, 0.18)
    tl.from('.reticle', { scale: 0, autoAlpha: 0, duration: 0.5, ease: 'back.out(2)', transformOrigin: 'center' }, 0.3)

    // focus pulse
    tl.to('.reticle', { scale: 1.18, duration: 0.28, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 0.65)
    tl.to('.rec-dot', { autoAlpha: 0.25, duration: 0.14, repeat: 3, yoyo: true, ease: 'none' }, 0.7)

    // Phase 2 — shutter close (cekrek)
    tl.addLabel('shutter', 1.25)
    tl.fromTo('.blade',
      { rotate: -90, autoAlpha: 0 },
      {
        rotate: 0,
        autoAlpha: 1,
        duration: 0.42,
        stagger: 0.018,
        ease: 'power4.in',
        transformOrigin: '50% 50%',
      },
      'shutter')
    tl.to('.vf-meta, .cross-h, .cross-v, .reticle, .bracket', {
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, 'shutter+=0.15')

    // Phase 3 — flash
    tl.addLabel('flash', 'shutter+=0.48')
    tl.to('.flash', { autoAlpha: 1, duration: 0.05, ease: 'power4.out' }, 'flash')
    tl.to('.blade', { autoAlpha: 0, scale: 1.4, duration: 0.45, ease: 'power3.out', transformOrigin: '50% 50%' }, 'flash')
    tl.to('.flash', { autoAlpha: 0, duration: 0.55, ease: 'power3.out' }, 'flash+=0.07')

    // Phase 4 — logo assembly
    tl.addLabel('logo', 'flash+=0.32')
    tl.set('.logo-svg', { autoAlpha: 1 })
    // scatter origins per rect index (0..4)
    const scatterX = [-260, 0, 220, 280, 60]
    const scatterY = [40, -240, -200, 30, 240]
    const scatterR = [-22, 18, 34, -38, 22]
    tl.from('.logo-rect', {
      autoAlpha: 0,
      x: (i) => scatterX[i] ?? 0,
      y: (i) => scatterY[i] ?? 0,
      scale: 0.35,
      rotate: (i) => scatterR[i] ?? 0,
      transformOrigin: '50% 50%',
      duration: 0.85,
      stagger: 0.07,
      ease: 'expo.out',
    }, 'logo')

    // tiny settle bounce
    tl.fromTo('.logo-svg',
      { scale: 1.04 },
      { scale: 1, duration: 0.5, ease: 'power3.out' },
      'logo+=0.7')

    // brand mark
    tl.from('.brand-mark', { autoAlpha: 0, y: 14, duration: 0.55, ease: 'power3.out' }, 'logo+=0.55')
    tl.from('.brand-tag', { autoAlpha: 0, y: 10, duration: 0.5, ease: 'power3.out' }, 'logo+=0.7')

    // Phase 5 — hold + wipe out
    tl.addLabel('exit', 'logo+=1.85')
    tl.to('.intro-content', { y: -28, autoAlpha: 0, duration: 0.55, ease: 'power3.in' }, 'exit')
    tl.to(root.value, { yPercent: -100, duration: 0.95, ease: 'expo.inOut' }, 'exit+=0.18')
  }, root.value!)
})

onBeforeUnmount(() => {
  unlockScroll()
  ctx?.revert()
})
</script>

<template>
  <div v-if="visible" ref="root" class="intro" aria-hidden="true">
    <div class="intro-content">
      <!-- viewfinder corner brackets -->
      <span class="bracket bracket-tl"></span>
      <span class="bracket bracket-tr"></span>
      <span class="bracket bracket-bl"></span>
      <span class="bracket bracket-br"></span>

      <!-- top-left meta -->
      <span class="vf-meta vf-meta-tl mono">
        <span class="rec-dot"></span> REC &middot; 4K &middot; 24p
      </span>
      <span class="vf-meta vf-meta-tr mono">f/1.8 &middot; 1/250 &middot; ISO 400</span>
      <span class="vf-meta vf-meta-bl mono">HADE &middot; CAM 01</span>
      <span class="vf-meta vf-meta-br mono">FOCUS LOCK</span>

      <!-- crosshairs -->
      <span class="cross-h"></span>
      <span class="cross-v"></span>
      <span class="reticle"></span>

      <!-- aperture stage -->
      <div class="aperture-stage">
        <svg class="aperture-svg" viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
          <g>
            <polygon class="blade" points="0,-60 52,30 -52,30" transform="rotate(0)" />
            <polygon class="blade" points="0,-60 52,30 -52,30" transform="rotate(60)" />
            <polygon class="blade" points="0,-60 52,30 -52,30" transform="rotate(120)" />
            <polygon class="blade" points="0,-60 52,30 -52,30" transform="rotate(180)" />
            <polygon class="blade" points="0,-60 52,30 -52,30" transform="rotate(240)" />
            <polygon class="blade" points="0,-60 52,30 -52,30" transform="rotate(300)" />
          </g>
        </svg>
      </div>

      <!-- flash overlay -->
      <span class="flash"></span>

      <!-- logo -->
      <div class="logo-wrap">
        <svg class="logo-svg" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <rect class="logo-rect" x="0"  y="0"  width="6" height="16" />
          <rect class="logo-rect" x="6"  y="6"  width="4" height="4"  />
          <rect class="logo-rect" x="8"  y="0"  width="8" height="4"  />
          <rect class="logo-rect" x="12" y="4"  width="4" height="8"  />
          <rect class="logo-rect" x="8"  y="12" width="8" height="4"  />
        </svg>
        <div class="brand-mark mono">HADE&nbsp;CREATIVE</div>
        <div class="brand-tag mono">EST. 2017 &middot; SUKABUMI</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.intro {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: #0a0a0c;
  color: #f5f5f3;
  overflow: hidden;
  isolation: isolate;
  will-change: transform;
}

/* faint film grain on dark intro */
.intro::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.08;
  mix-blend-mode: screen;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

.intro-content {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

/* corner brackets */
.bracket {
  position: absolute;
  width: 56px;
  height: 56px;
  border: 1.5px solid rgba(245, 245, 243, 0.7);
}
.bracket-tl { top: 6vh; left: 6vw; border-right: 0; border-bottom: 0; }
.bracket-tr { top: 6vh; right: 6vw; border-left: 0; border-bottom: 0; }
.bracket-bl { bottom: 6vh; left: 6vw; border-right: 0; border-top: 0; }
.bracket-br { bottom: 6vh; right: 6vw; border-left: 0; border-top: 0; }

/* meta hud */
.vf-meta {
  position: absolute;
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.7);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.vf-meta-tl { top: 5vh; left: calc(6vw + 72px); }
.vf-meta-tr { top: 5vh; right: calc(6vw + 72px); }
.vf-meta-bl { bottom: 5vh; left: calc(6vw + 72px); }
.vf-meta-br { bottom: 5vh; right: calc(6vw + 72px); }

.rec-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ff3b30;
  display: inline-block;
}

/* crosshairs */
.cross-h, .cross-v {
  position: absolute;
  background: rgba(245, 245, 243, 0.18);
  pointer-events: none;
}
.cross-h { top: 50%; left: 8%; right: 8%; height: 1px; transform: translateY(-50%); }
.cross-v { left: 50%; top: 14%; bottom: 14%; width: 1px; transform: translateX(-50%); }

.reticle {
  position: absolute;
  top: 50%; left: 50%;
  width: 88px;
  height: 88px;
  border: 1px solid rgba(245, 245, 243, 0.45);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.reticle::before, .reticle::after {
  content: '';
  position: absolute;
  background: rgba(245, 245, 243, 0.6);
}
.reticle::before { left: 50%; top: -8px; width: 1px; height: 16px; transform: translateX(-50%); }
.reticle::after  { top: 50%; left: -8px; height: 1px; width: 16px; transform: translateY(-50%); }

/* aperture stage */
.aperture-stage {
  position: absolute;
  top: 50%; left: 50%;
  width: min(64vmin, 520px);
  height: min(64vmin, 520px);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
.aperture-svg {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.blade {
  fill: #0a0a0c;
  stroke: rgba(245, 245, 243, 0.35);
  stroke-width: 0.4;
  transform-box: fill-box;
  transform-origin: 50% 50%;
}

/* flash */
.flash {
  position: absolute;
  inset: 0;
  background: #fafaf8;
  opacity: 0;
  pointer-events: none;
  mix-blend-mode: screen;
}

/* logo */
.logo-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}
.logo-svg {
  width: clamp(88px, 14vmin, 132px);
  height: clamp(88px, 14vmin, 132px);
  fill: #f5f5f3;
  opacity: 0;
  will-change: transform, opacity;
}
.logo-rect {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  will-change: transform, opacity;
}
.brand-mark {
  font-size: 12px;
  letter-spacing: 0.42em;
  color: #f5f5f3;
}
.brand-tag {
  font-size: 9.5px;
  letter-spacing: 0.32em;
  color: rgba(245, 245, 243, 0.5);
}

@media (max-width: 640px) {
  .bracket { width: 36px; height: 36px; }
  .bracket-tl { top: 4vh; left: 5vw; }
  .bracket-tr { top: 4vh; right: 5vw; }
  .bracket-bl { bottom: 4vh; left: 5vw; }
  .bracket-br { bottom: 4vh; right: 5vw; }
  .vf-meta { font-size: 9px; letter-spacing: 0.18em; }
  .vf-meta-tl, .vf-meta-tr { top: 3.5vh; }
  .vf-meta-bl, .vf-meta-br { bottom: 3.5vh; }
  .vf-meta-tl { left: calc(5vw + 48px); }
  .vf-meta-tr { right: calc(5vw + 48px); }
  .vf-meta-bl { left: calc(5vw + 48px); }
  .vf-meta-br { right: calc(5vw + 48px); }
  .reticle { width: 64px; height: 64px; }
  .brand-mark { font-size: 10.5px; letter-spacing: 0.36em; }
  .brand-tag { font-size: 8.5px; letter-spacing: 0.28em; }
}
</style>
