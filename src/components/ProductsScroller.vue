<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { waLink, waProductLink, SHOPEE_STORE, DISCOUNT_PERCENT } from '../composables/useContact'

gsap.registerPlugin(ScrollTrigger)

interface Product {
  index: string
  family: 'Clamp' | 'Direc Sensor' | 'Bracket' | 'Grip'
  name: string
  mount: string
  price: string
  rating: string
  sold: string
  best?: boolean
  bullets: string[]
  link: string
  images: string[]
}

const IMG_BASE = (folder: string, files: string[]) =>
  files.map((f) => `/${encodeURI(folder)}/${encodeURI(f)}`)

const products: Product[] = [
  {
    index: '01',
    family: 'Clamp',
    name: 'Clamp Adapter DSLR 2026',
    mount: 'Canon EF · Nikon F',
    price: 'Rp 895.000 – 1.060.000',
    rating: '4.7',
    sold: '12 terjual',
    bullets: ['Plug & play, tanpa bongkar lensa HP', 'Hasil full layar tanpa vignette', 'Paket sudah termasuk Grip Bluetooth V4.1'],
    link: 'https://shopee.co.id/Hade-Clamp-Adapter-Lensa-DSLR-Canon-Nikon-to-Handphone-versi-2026-Hade-Creative-Production-i.43595306.26620033169?extraParams=%7B%22display_model_id%22%3A177014270531%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Clamp Adapter Lensa DSLR CanonNikon to Handphone versi 2026 Hade Creative Production',
      [
        'id-11134207-822wp-mmz0luinyy2q9d.webp',
        'id-11134207-822wi-mmz0luidxy4id0.webp',
        'id-11134207-822wi-mmz0luiprk759f.webp',
        'id-11134207-822wk-mmz0luiafj0le8.webp',
        'id-11134207-822wk-mmz0luio0cn683.webp',
        'id-11134207-822wn-mmz0luipvrwhe4.webp',
      ],
    ),
  },
  {
    index: '02',
    family: 'Clamp',
    name: 'Clamp Adapter Mirrorless 2026',
    mount: 'Sony E-Mount · MFT',
    price: 'Rp 598.000 – 760.000',
    rating: '4.7',
    sold: '50 terjual',
    bullets: ['Cocok 7Artisans, Meike, Samyang', 'Mendukung lensa DSLR via adapter', 'Universal – semua merk HP'],
    link: 'https://shopee.co.id/Hade-Clamp-Adapter-Lensa-Mirrorless-to-Handphone-versi-2026-Hade-Creative-Production-i.43595306.10357387631?extraParams=%7B%22display_model_id%22%3A139370555716%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Clamp Adapter Lensa Mirrorless to Handphone versi 2026 Hade Creative Production',
      [
        'id-11134207-822wh-mnk7uwzxzm6g5e.webp',
        'id-11134207-822wh-mnk7ux03khdte7.webp',
        'id-11134207-822wj-mnk7ux03swsj04.webp',
        'id-11134207-822wl-mnk7ux03lvy96b.webp',
      ],
    ),
  },
  {
    index: '03',
    family: 'Direc Sensor',
    name: 'Direc Sensor DSLR – FFD',
    mount: 'Canon · Nikon',
    price: 'Rp 325.000 – 495.000',
    rating: '4.5',
    sold: '16 terjual',
    bullets: ['Gambar tidak terbalik', 'FFD setting untuk fokus presisi', 'Hotshoe + collar tripod'],
    link: 'https://shopee.co.id/Hade-Clamp-Adaptor-Direc-Sensor-DSLR-Canon-Nikon-to-Handphone-dilengkapi-dengan-pengaturan-jarak-Sensor-ke-Mounting-(FFD-Seting)-Hade-Creative-Production-i.43595306.42407425312?extraParams=%7B%22display_model_id%22%3A340106906839%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Clamp Adaptor Direc Sensor DSLR CanonNikon to Handphone dilengkapi dengan pengaturan jarak Sensor ke Mounting (FFD Seting)',
      [
        'id-11134207-8224s-mgqtgz8z0zrd7f.webp',
        'id-11134207-8224s-mhhjxy4opa8029.webp',
        'id-11134207-8224t-mgqtgz8z3sw960.webp',
        'id-11134207-82250-mgqtgz8z2ebte4.webp',
        'id-11134207-82251-mgqtgz8yvdhl56.webp',
      ],
    ),
  },
  {
    index: '04',
    family: 'Direc Sensor',
    name: 'Direc Sensor Sony E-mount',
    mount: 'Sony E',
    price: 'Rp 185.000 – 450.000',
    rating: '4.9',
    sold: '22 terjual',
    bullets: ['Sensor langsung ke lensa', 'Minim chromatic aberration', 'Filamen atau aluminium'],
    link: 'https://shopee.co.id/Hade-Clamp-Adaptor-Direc-Sensor-Lensa-Sony-E-mount-to-Handphone-dilengkapi-dengan-pengaturan-jarak-Sensor-ke-Mounting-(FFD-Seting)-Hade-Creative-Production-i.43595306.55800543344?extraParams=%7B%22display_model_id%22%3A118769876586%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Clamp Adaptor Direc Sensor Lensa Sony E-mount to Handphone dilengkapi dengan pengaturan jarak Sensor ke Mounting (FFD Seting)',
      [
        'id-11134207-82250-mggly2zgkwzz44.webp',
        'id-11134207-8224t-mggly2zgjifj39.webp',
        'id-11134207-8224x-mggly30l766n8c.webp',
        'id-11134207-8224x-mghulx5pnjm4c0.webp',
        'id-11134207-82251-mggly2zr1d6yb8.webp',
      ],
    ),
  },
  {
    index: '05',
    family: 'Direc Sensor',
    name: 'Direc Sensor MFT',
    mount: 'Micro Four Thirds',
    price: 'Rp 185.000 – 450.000',
    rating: '5.0',
    sold: '1 terjual',
    bullets: ['Hasil full layar tanpa distorsi', 'Fleksibel semua tipe HP', 'FFD setting'],
    link: 'https://shopee.co.id/Hade-Clamp-Adaptor-Direc-Sensor-Lensa-MFT-to-Handphone-dilengkapi-dengan-pengaturan-jarak-Sensor-ke-Mounting-(FFD-Seting)-Hade-Creative-Production-i.43595306.57806541850?extraParams=%7B%22display_model_id%22%3A244172744797%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Clamp Adaptor Direc Sensor Lensa MFT to Handphone dilengkapi dengan pengaturan jarak Sensor ke Mounting (FFD Seting)',
      [
        'id-11134207-822wi-mmaiuhd7hw5f0a@resize_w900_nl.webp',
        'id-11134207-822wk-mmaiuhd7ghkzbc.webp',
        'id-11134207-822wl-mma0sn4heiv98d.webp',
        'id-11134207-822wq-mmaiuhd7japv73.webp',
        'id-11134207-822ws-mmaiuhd124g1a7.webp',
      ],
    ),
  },
  {
    index: '06',
    family: 'Bracket',
    name: 'Bracket Rigging System 2026',
    mount: 'Universal Tele 18x – 60x',
    price: 'Rp 180.000 – 545.000',
    rating: '4.8',
    sold: '107 terjual',
    best: true,
    bullets: ['Solusi lensa tele yang melorot', 'Mounting tripod 1/4 inch', 'L-bracket portrait & landscape'],
    link: 'https://shopee.co.id/Hade-Bracket-Lensa-Tele-Handphone-(18X-22X-36X-60X)-Rigging-System-2026-Cocok-untuk-Apexel-TaffSPORT-Pickogen-Soha-DLL.-Hade-Creative-Production-i.43595306.21362770833?extraParams=%7B%22display_model_id%22%3A29771564472%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Bracket Lensa Tele Handphone (18X, 22X, 36X & 60X) Rigging System 2026 Cocok untuk Apexel, TaffSPORT, Pickogen, Soha DLL',
      [
        'id-11134207-822wl-mma0sn4ge03z68.webp',
        'id-11134207-822wh-mnhndq6a8glg3a.webp',
        'id-11134207-822wi-mnhndq6a721048.webp',
        'id-11134207-822wn-mma0sn4h1vr9fa.webp',
        'id-11134207-822wo-mma0sn4h3abp80.webp',
      ],
    ),
  },
  {
    index: '07',
    family: 'Grip',
    name: 'Phone Grip + Bluetooth Shooter',
    mount: 'Universal',
    price: 'Rp 180.000',
    rating: '4.9',
    sold: '25 terjual',
    bullets: ['Bluetooth V4.1 remote shutter', 'Ergonomis seperti DSLR', 'Order < jam 14:00 kirim hari yang sama'],
    link: 'https://shopee.co.id/Hade-Phone-Grip-hade-dengan-Bluetooth-Shooter-Hade-Creative-Production-i.43595306.20921822019?extraParams=%7B%22display_model_id%22%3A185568023369%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Phone Grip hade dengan Bluetooth Shooter Hade Creative Production',
      [
        'id-11134207-8224q-mhij3ck9z5l139.webp',
        'id-11134207-8224q-mhij3ckjkpaa5a.webp',
        'id-11134207-8224r-mhij3ckjhw5c94.webp',
        'id-11134207-8224t-mhij3ckzynt2cd.webp',
        'id-11134207-8224y-mhij3ckj2fwg5f.webp',
      ],
    ),
  },
]

// Carousel state – single shared idx for desktop (3 visible) + mobile (1 visible)
const totalCards = products.length + 1 // includes CTA card
const cardIdx = ref(0)
const cardsPerView = ref(1)
const trackInner = ref<HTMLElement | null>(null)

const maxCardIdx = computed(() => Math.max(0, totalCards - cardsPerView.value))

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
  const next = w >= 1200 ? 2.5 : w >= 760 ? 1.67 : 1
  if (next !== cardsPerView.value) cardsPerView.value = next
  cardIdx.value = clampCardIdx(cardIdx.value)
}

// Touch swipe detection – only triggers horizontal swap when gesture is
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
  if (Math.abs(dx) < Math.abs(dy) * ANGLE_BIAS) return // vertical intent – ignore
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
          Dua lini utama: <strong>Clamp Adapter</strong> untuk pengguna baru –
          plug & play, tanpa bongkar HP. Dan <strong>Direc Sensor</strong>
          untuk yang menginginkan hasil paling bersih.
        </p>
        <div class="progress">
          <div ref="progressBar" class="progress-bar"></div>
        </div>
      </header>

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
            <article
              v-for="(p, pi) in products"
              :key="p.index"
              class="item"
              :class="{ 'is-best': p.best }"
            >
              <div class="visual">
                <img
                  class="visual-img is-active"
                  :src="p.images[0]"
                  :alt="p.name"
                  loading="lazy"
                  decoding="async"
                />
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
            </article>

            <article class="item cta-item">
              <div class="cta-visual">
                <span class="cta-mark mono">END / 08</span>
                <h3 class="cta-title">
                  <span>Mau diskon {{ DISCOUNT_PERCENT }}%</span>
                  <span class="italic">+ gratis ongkir?</span>
                </h3>
                <p class="cta-desc">
                  Chat langsung admin Hade di WhatsApp. Konsultasi gratis,
                  pengiriman dari Sukabumi, garansi 1 bulan untuk semua adapter.
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
            v-for="i in (maxCardIdx + 1)"
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
          {{ String(cardIdx + 1).padStart(2, '0') }} / {{ String(maxCardIdx + 1).padStart(2, '0') }}
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

/* Visual — image-first, no card shell */
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

/* Meta — editorial text block under image */
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

/* Tablet — 2-up */
@media (max-width: 1199px) and (min-width: 760px) {
  .track-inner {
    --per-view: 2;
    --gap: 2.25rem;
  }
}

/* Mobile — single column, full bleed */
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
    padding: 0;
  }

  .track-inner {
    --per-view: 1;
    --gap: 0;
    padding: 0;
    width: 100%;
  }

  .item {
    flex: 0 0 100%;
    width: 100%;
    padding: 0 var(--gutter);
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

@media (max-width: 640px) {
  .head h2 {
    font-size: 1.7rem;
    line-height: 1.05;
  }

  .head-right {
    font-size: 12.5px;
    line-height: 1.5;
  }

  .visual {
    aspect-ratio: 5 / 4;
  }

  .title {
    font-size: 1.25rem;
  }

  .desc {
    font-size: 12.5px;
    line-height: 1.55;
  }

  .nav-btn {
    width: 32px;
    height: 32px;
  }

  .nav-btn svg {
    width: 12px;
    height: 12px;
  }

  .nav-prev { left: 0.5rem; }
  .nav-next { right: 0.5rem; }
}

@media (prefers-reduced-motion: reduce) {
  .track-inner { transition: none; }
  .visual-img { transition: opacity 0.3s linear; transform: none !important; }
}
</style>
