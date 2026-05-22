<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { waLink, waProductLink, SHOPEE_STORE, DISCOUNT_PERCENT } from '../composables/useContact'
import { products as catalogProducts } from '../data/products'

gsap.registerPlugin(ScrollTrigger)

// Reuse the shared catalog so /, /products, and /products/:slug stay in sync.
const products = catalogProducts

// Carousel state â€“ single shared idx for desktop (3 visible) + mobile (1 visible)
const totalCards = products.length + 1 // includes CTA card
const cardIdx = ref(0)
const cardsPerView = ref(1)
const trackInner = ref<HTMLElement | null>(null)

const maxCardIdx = computed(() => Math.max(0, totalCards - cardsPerView.value))

// Integer-only count for dot pagination + counter UI. v-for over a float
// crashes Vue (`new Array(5.5)` throws RangeError) — desktop has
// cardsPerView=2.5 which makes maxCardIdx fractional.
const dotCount = computed(() => Math.max(1, Math.ceil(maxCardIdx.value) + 1))
const currentDot = computed(() => Math.min(dotCount.value, Math.floor(cardIdx.value) + 1))

function clampCardIdx(i: number) {
  return Math.max(0, Math.min(maxCardIdx.value, i))
}

function applyShift() {
  if (!trackInner.value) return
  const first = trackInner.value.querySelector<HTMLElement>('.item')
  if (!first) return
  const w = first.getBoundingClientRect().width
  const styles = getComputedStyle(trackInner.value)
  const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0
  const shift = cardIdx.value * (w + gap)
  trackInner.value.style.setProperty('--shift', `${shift}px`)
}

function goToCard(i: number) {
  cardIdx.value = clampCardIdx(i)
  requestAnimationFrame(applyShift)
}

function nextCard() {
  goToCard(cardIdx.value + 1)
}

function prevCard() {
  goToCard(cardIdx.value - 1)
}

function updateCardsPerView() {
  const w = typeof window !== 'undefined' ? window.innerWidth : 1200
  const next = w >= 1200 ? 2.5 : w >= 760 ? 1.67 : w >= 380 ? 2.2 : 2.1
  if (next !== cardsPerView.value) cardsPerView.value = next
  cardIdx.value = clampCardIdx(cardIdx.value)
}

// Touch swipe detection â€“ only triggers horizontal swap when gesture is
// clearly horizontal, so vertical page scroll stays smooth on mobile.
const SWIPE_THRESHOLD = 48
const ANGLE_BIAS = 1.2 // |dx| must exceed |dy| * bias to count as horizontal
let touchStartX = 0
let touchStartY = 0
let touchActive = false

function onTouchStart(e: TouchEvent) {
  if (e.touches.length !== 1) return
  touchStartX = e.touches[0].clientX
  touchStartY = e.touches[0].clientY
  touchActive = true
}

function onTouchEnd(e: TouchEvent) {
  if (!touchActive) return
  touchActive = false
  const t = e.changedTouches[0]
  const dx = t.clientX - touchStartX
  const dy = t.clientY - touchStartY
  if (Math.abs(dx) < SWIPE_THRESHOLD) return
  if (Math.abs(dx) < Math.abs(dy) * ANGLE_BIAS) return // vertical intent â€“ ignore
  if (dx < 0) nextCard()
  else prevCard()
}

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return

  updateCardsPerView()
  applyShift()
  window.addEventListener('resize', onResize, { passive: true })

  ctx = gsap.context(() => {
    // Subtle entrance for each card on scroll into view
    const items = root.value!.querySelectorAll<HTMLElement>('.item')
    items.forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power2.out',
          delay: (i % 3) * 0.06,
          scrollTrigger: {
            trigger: item,
            start: 'top 88%',
            once: true,
          },
        },
      )
    })
  }, root.value)
})

function onResize() {
  updateCardsPerView()
  applyShift()
}

onBeforeUnmount(() => {
  ctx?.revert()
  window.removeEventListener('resize', onResize)
})
</script>

<template>
  <section id="products" ref="root" class="products">
    <div class="products-frame">
      <header class="head">
        <div class="head-left">
          <span class="eyebrow" data-reveal>
            <span class="mono">katalog · 7 produk</span>
          </span>
          <h2 data-reveal data-reveal-stagger="0.08" data-reveal-children="span">
            <span>Bertujuh,</span>
            <span class="italic">satu sistem.</span>
          </h2>
        </div>
        <p class="head-right" data-reveal data-reveal-delay="0.1">
          Dua lini utama: <strong>Clamp Adapter</strong> untuk pengguna baru —
          plug & play, tanpa bongkar HP. Dan <strong>Direc Sensor</strong>
          untuk yang menginginkan hasil paling bersih.
        </p>
        <div class="progress">
          <div ref="progressBar" class="progress-bar"></div>
        </div>
      </header>

      <div class="rail-top">
        <RouterLink to="/products" class="view-all mono">
          lihat semua →
        </RouterLink>
      </div>

      <div
        class="rail"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      >
        <button
          type="button"
          class="rail-arrow rail-prev"
          :disabled="cardIdx === 0"
          aria-label="Produk sebelumnya"
          @click="prevCard"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3l-5 5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          class="rail-arrow rail-next"
          :disabled="cardIdx >= maxCardIdx"
          aria-label="Produk berikutnya"
          @click="nextCard"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <div
          ref="track"
          class="track"
        >
          <div ref="trackInner" class="track-inner">
            <RouterLink
              v-for="(p, pi) in products"
              :key="p.index"
              :to="`/products/${p.slug}`"
              class="item item-link"
              :class="{ 'is-best': p.best }"
            >
              <div class="visual">
                <img
                  class="visual-img is-active"
                  :src="p.images[0]"
                  :alt="p.name"
                  :data-vt-slug="p.slug"
                  loading="lazy"
                  decoding="async"
                />
                <span class="item-arrow" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M5 11l6-6M6 5h5v5" stroke="currentColor"
                      stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </div>

              <div class="meta">
                <div class="meta-top">
                  <span class="family mono">{{ p.family }} · {{ p.index }} / 07</span>
                  <span v-if="p.best" class="best mono">terlaris</span>
                </div>

                <h3 class="title">{{ p.name }}</h3>
                <span class="mount mono">{{ p.mount }}</span>

                <p class="desc">{{ p.bullets.join(' · ') }}</p>
              </div>
            </RouterLink>

            <article class="item cta-item">
              <div class="cta-visual">
                <span class="cta-mark mono">END / 08</span>
                <h3 class="cta-title">
                  <span>Mau diskon {{ DISCOUNT_PERCENT }}%</span>
                  <span class="italic">+ gratis ongkir?</span>
                </h3>
                <p class="cta-desc">
                  Chat langsung admin Hade di WhatsApp. Konsultasi gratis,
                  pengiriman dari Sukabumi, garansi 1 bulan untuk semua
                  Clamp Adapter & Direc Sensor.
                </p>
                <a class="btn btn-wa cta-btn" :href="waLink()" target="_blank" rel="noreferrer">
                  <span class="wa-mark" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
                    </svg>
                  </span>
                  <span>Chat WhatsApp</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div class="m-controls" aria-hidden="false">
        <div class="m-dots" role="tablist" aria-label="Daftar produk">
          <button
            v-for="i in dotCount"
            :key="i"
            type="button"
            class="m-dot"
            :class="{ 'is-active': cardIdx === i - 1 }"
            :aria-selected="cardIdx === i - 1"
            :aria-label="`Produk ${i}`"
            @click="goToCard(i - 1)"
          />
        </div>

        <span class="m-counter mono">
          {{ String(currentDot).padStart(2, '0') }} / {{ String(dotCount).padStart(2, '0') }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products {
  position: relative;
  background: var(--bg-soft);
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}

.products-frame {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(5rem, 10vh, 8rem) 0;
}

/* Header */
.head {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem;
  align-items: end;
  padding: 0 var(--gutter);
  max-width: var(--container);
  margin: 0 auto clamp(3rem, 6vh, 5rem);
  width: 100%;
}

.head-left .eyebrow { margin-bottom: 0.85rem; }

.head h2 {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 0;
  display: flex;
  flex-direction: column;
  color: var(--c-ink);
}

.head h2 .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
  letter-spacing: -0.05em;
}

.head-right {
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--fg-muted);
  max-width: 50ch;
  margin: 0;
}

.head-right strong {
  font-weight: 500;
  color: var(--c-ink);
}

.progress,
.progress-bar { display: none; }

/* View all link above rail */
.rail-top {
  display: flex;
  justify-content: flex-end;
  padding: 0 var(--gutter);
  max-width: var(--container);
  margin: 0 auto clamp(1rem, 2vh, 1.4rem);
  width: 100%;
}

.view-all {
  font-size: 11.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
  transition: color 0.3s var(--ease-out);
}

.view-all:hover {
  color: var(--fg-muted);
}

/* Rail */
.rail {
  position: relative;
  width: 100%;
  padding: 0 var(--gutter);
  max-width: var(--container);
  margin: 0 auto;
  overflow-x: clip;
  overflow-y: visible;
}

.rail-arrow {
  position: absolute;
  top: 36%;
  z-index: 5;
  width: 44px;
  height: 44px;
  transform: translateY(-50%);
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.92);
  color: var(--c-ink);
  border: 1px solid var(--hairline-strong);
  box-shadow: 0 8px 24px -10px rgba(14, 14, 15, 0.18);
  backdrop-filter: blur(8px);
  transition:
    transform 0.4s var(--ease-out),
    background 0.4s var(--ease-out),
    color 0.4s var(--ease-out),
    opacity 0.3s var(--ease-out);
}

.rail-arrow svg { width: 14px; height: 14px; }
.rail-prev { left: calc(var(--gutter) * 0.25); }
.rail-next { right: calc(var(--gutter) * 0.25); }

.rail-arrow:hover {
  background: var(--c-ink);
  color: var(--c-paper);
  transform: translateY(-50%) scale(1.06);
}

.rail-arrow:active { transform: translateY(-50%) scale(0.94); }
.rail-arrow:disabled { opacity: 0; pointer-events: none; }

.track { display: block; width: 100%; }

.track-inner {
  --gap: clamp(2rem, 4vw, 3.5rem);
  --per-view: 2.5;
  display: flex;
  gap: var(--gap);
  align-items: stretch;
  transform: translate3d(calc(var(--shift, 0px) * -1), 0, 0);
  transition: transform 0.65s var(--ease-out);
  will-change: transform;
}

.item {
  flex: 0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.item-link {
  color: var(--c-ink);
  cursor: pointer;
}

.item-arrow {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  z-index: 3;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  color: var(--c-ink);
  border: 1px solid var(--hairline-strong);
  border-radius: 999px;
  backdrop-filter: blur(8px);
  opacity: 0;
  transform: translate(8px, 8px);
  transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}

.item-arrow svg { width: 14px; height: 14px; }

.item-link:hover .item-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

/* Visual â€” image-first, no card shell */
.visual {
  position: relative;
  width: 100%;
  aspect-ratio: 5 / 4;
  background: #ececea;
  overflow: hidden;
  border-radius: 2px;
}

.slides {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.visual-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: contrast(1.02);
  opacity: 0;
  transform: scale(1);
  transition:
    opacity 0.7s var(--ease-out),
    transform 1.6s var(--ease-out);
  will-change: opacity, transform;
  pointer-events: none;
}

.visual-img.is-active {
  opacity: 1;
  transform: scale(1.065);
}

.item:hover .visual-img.is-active {
  transform: scale(1.10);
}

/* Carousel nav buttons (per-image) */
.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 4;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.85);
  color: var(--c-ink);
  border: 1px solid var(--hairline);
  backdrop-filter: blur(8px);
  opacity: 0;
  transition:
    opacity 0.4s var(--ease-out),
    background 0.4s var(--ease-out),
    transform 0.5s var(--ease-out);
}

.nav-btn svg { width: 14px; height: 14px; }
.nav-prev { left: 0.65rem; }
.nav-next { right: 0.65rem; }

.item:hover .nav-btn,
.visual:focus-within .nav-btn {
  opacity: 1;
}

.nav-btn:hover {
  background: #fff;
  transform: translateY(-50%) scale(1.06);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.94);
}

/* Dots */
.dots {
  position: absolute;
  bottom: 0.7rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
  display: inline-flex;
  gap: 0.35rem;
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid var(--hairline);
  backdrop-filter: blur(6px);
  opacity: 0;
  transition: opacity 0.4s var(--ease-out);
}

.item:hover .dots,
.visual:focus-within .dots {
  opacity: 1;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-fog);
  border: 0;
  transition: background 0.4s var(--ease-out), width 0.4s var(--ease-out);
}

.dot.is-active {
  background: var(--c-ink);
  width: 16px;
  border-radius: 999px;
}

/* Meta â€” editorial text block under image */
.meta {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0 0.15rem;
  flex: 1;
}

.meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.family { color: var(--fg-subtle); }

.best {
  padding: 0.2rem 0.5rem;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 999px;
  font-size: 9.5px;
  letter-spacing: 0.16em;
}

.title {
  margin: 0.15rem 0 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.25rem, 1.5vw, 1.55rem);
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--c-ink);
}

.mount {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.desc {
  margin: 0.35rem 0 0.85rem;
  font-size: 13.5px;
  line-height: 1.65;
  color: var(--fg-muted);
  max-width: 38ch;
}

/* Foot */
.meta-foot {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.85rem;
  margin-top: auto;
  padding-top: 0.7rem;
  border-top: 1px solid var(--hairline);
}

.price-block {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 0;
}

.price {
  font-size: 14px;
  font-weight: 500;
  color: var(--c-ink);
  letter-spacing: -0.01em;
}

.discount {
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #128c4a;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  flex-shrink: 0;
  align-items: stretch;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  font-size: 11.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
  border-radius: 2px;
  border: 1px solid transparent;
  text-align: center;
  white-space: nowrap;
  transition:
    background 0.3s var(--ease-out),
    color 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out),
    transform 0.3s var(--ease-out);
}

.btn:active { transform: scale(0.98); }

.btn-wa {
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 10px 24px -14px rgba(18, 140, 74, 0.55);
  border-radius: 999px;
  padding: 0.55rem 0.95rem 0.55rem 0.5rem;
}

.btn-wa:hover {
  background: linear-gradient(140deg, #25c862 0%, #1faa55 60%, #128c4a 100%);
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 14px 30px -14px rgba(18, 140, 74, 0.65);
  transform: translateY(-1px);
}

.btn-wa .wa-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
}

.btn-wa .wa-mark svg { width: 12px; height: 12px; }

.btn-shopee {
  background: transparent;
  color: var(--c-ink);
  border-color: var(--hairline-strong);
}

.btn-shopee:hover {
  border-color: var(--c-ink);
  background: rgba(14, 14, 15, 0.04);
}

/* CTA item */
.cta-item .cta-visual {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: var(--c-ink);
  color: var(--c-paper);
  padding: clamp(1.5rem, 2.5vw, 2.25rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px;
  overflow: hidden;
}

.cta-mark {
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.5);
}

.cta-title {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(1.5rem, 2.4vw, 2rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin: 0;
  display: flex;
  flex-direction: column;
  color: var(--c-paper);
}

.cta-title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: rgba(245, 245, 243, 0.7);
}

.cta-desc {
  font-size: 13px;
  line-height: 1.55;
  color: rgba(245, 245, 243, 0.65);
  margin: 0;
  max-width: 32ch;
}

.cta-btn {
  align-self: flex-start;
  background: var(--c-paper);
  color: var(--c-ink);
  border-color: var(--c-paper);
  padding: 0.7rem 1.1rem;
  font-size: 13px;
}

.cta-btn:hover {
  background: transparent;
  color: var(--c-paper);
  border-color: var(--c-paper);
}

/* Bottom controls */
.m-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.85rem;
  margin: clamp(2.5rem, 5vh, 3.5rem) auto 0;
  padding: 0 var(--gutter);
  width: 100%;
  max-width: var(--container);
}

.m-dots {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.m-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-fog);
  border: 0;
  transition: background 0.4s var(--ease-out), width 0.4s var(--ease-out);
}

.m-dot.is-active {
  background: var(--c-ink);
  width: 18px;
  border-radius: 999px;
}

.m-counter {
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--fg-subtle);
  margin-left: 0.35rem;
}

/* Tablet â€” 2-up */
@media (max-width: 1199px) and (min-width: 760px) {
  .track-inner {
    --per-view: 2;
    --gap: 2.25rem;
  }
}

/* Mobile â€” 2-up with peek */
@media (max-width: 900px) {
  .products-frame {
    padding: clamp(3.5rem, 8vh, 5rem) 0;
  }

  .head {
    grid-template-columns: 1fr;
    margin-bottom: 2.5rem;
  }

  .rail {
    overflow: hidden;
    touch-action: pan-y;
    padding: 0 var(--gutter);
  }

  .track-inner {
    --per-view: 2.2;
    --gap: 0.85rem;
    padding: 0;
    width: 100%;
  }

  .item {
    flex: 0 0 calc((100% - (var(--per-view) - 1) * var(--gap)) / var(--per-view));
    width: auto;
    padding: 0;
  }

  .visual {
    aspect-ratio: 5 / 4;
  }

  .nav-btn,
  .dots {
    opacity: 1;
  }

  .rail-arrow { display: none; }
}

/* Tiny phones â€” keep 2-up with peek */
@media (max-width: 379px) {
  .track-inner {
    --per-view: 2.1;
    --gap: 0.6rem;
  }
}

@media (max-width: 640px) {
  .products-frame {
    padding: clamp(2.75rem, 7vh, 4rem) 0;
  }

  .head {
    margin-bottom: 1.85rem;
    gap: 0.7rem;
  }

  .head-left .eyebrow { margin-bottom: 0.5rem; }

  .head h2 {
    font-size: 1.35rem;
    line-height: 1.05;
    letter-spacing: -0.03em;
  }

  .head-right {
    font-size: 11.5px;
    line-height: 1.5;
  }

  .rail-top {
    margin-bottom: 0.5rem;
  }

  .view-all {
    font-size: 10px;
    letter-spacing: 0.12em;
  }

  .visual {
    aspect-ratio: 5 / 4;
  }

  .meta {
    gap: 0.32rem;
  }

  .meta-top {
    font-size: 9px;
    letter-spacing: 0.14em;
  }

  .best {
    font-size: 8.5px;
    padding: 0.15rem 0.4rem;
    letter-spacing: 0.13em;
  }

  .title {
    font-size: 1.05rem;
    line-height: 1.1;
  }

  .mount {
    font-size: 9px;
    letter-spacing: 0.14em;
  }

  .desc {
    font-size: 11px;
    line-height: 1.5;
    margin: 0.2rem 0 0.55rem;
  }

  .item-arrow {
    width: 30px;
    height: 30px;
    bottom: 0.55rem;
    right: 0.55rem;
  }

  .item-arrow svg { width: 12px; height: 12px; }

  .nav-btn {
    width: 28px;
    height: 28px;
  }

  .nav-btn svg {
    width: 11px;
    height: 11px;
  }

  .nav-prev { left: 0.45rem; }
  .nav-next { right: 0.45rem; }

  .cta-item .cta-visual {
    aspect-ratio: auto;
    min-height: 0;
    padding: 0.85rem;
    gap: 0.55rem;
    border-radius: 4px;
  }

  .cta-mark {
    font-size: 8.5px;
    letter-spacing: 0.14em;
  }

  .cta-title {
    font-size: 0.95rem;
    line-height: 1.05;
    letter-spacing: -0.025em;
  }

  .cta-desc {
    font-size: 9.5px;
    line-height: 1.4;
    margin-top: 0.25rem;
  }

  .cta-btn {
    padding: 0.4rem 0.65rem;
    font-size: 10px;
    gap: 0.3rem;
    align-self: stretch;
    margin-top: 0.4rem;
  }

  .cta-btn .wa-mark {
    width: 16px;
    height: 16px;
  }

  .cta-btn .wa-mark svg {
    width: 9px;
    height: 9px;
  }

  .m-controls {
    gap: 0.55rem;
    margin-top: 1.5rem;
  }

  .m-dot {
    width: 5px;
    height: 5px;
  }

  .m-dot.is-active {
    width: 14px;
  }

  .m-counter {
    font-size: 9.5px;
    letter-spacing: 0.13em;
  }
}

@media (max-width: 380px) {
  .head h2 {
    font-size: 1.2rem;
  }

  .title {
    font-size: 0.98rem;
  }

  .desc {
    font-size: 10.5px;
  }

  .cta-title {
    font-size: 1.1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .track-inner { transition: none; }
  .visual-img { transition: opacity 0.3s linear; transform: none !important; }
}
</style>
