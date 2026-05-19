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
    price: 'Rp 895.000 — 1.060.000',
    rating: '4.7',
    sold: '12 terjual',
    bullets: ['Plug & play, tanpa bongkar lensa HP', 'Hasil full layar tanpa vignette', 'Paket sudah termasuk Grip Bluetooth V4.1'],
    link: 'https://shopee.co.id/Hade-Clamp-Adapter-Lensa-DSLR-Canon-Nikon-to-Handphone-versi-2026-Hade-Creative-Production-i.43595306.26620033169?extraParams=%7B%22display_model_id%22%3A177014270531%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Clamp Adapter Lensa DSLR CanonNikon to Handphone versi 2026 Hade Creative Production',
      [
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
    price: 'Rp 598.000 — 760.000',
    rating: '4.7',
    sold: '50 terjual',
    bullets: ['Cocok 7Artisans, Meike, Samyang', 'Mendukung lensa DSLR via adapter', 'Universal — semua merk HP'],
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
    name: 'Direc Sensor DSLR — FFD',
    mount: 'Canon · Nikon',
    price: 'Rp 325.000 — 495.000',
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
    price: 'Rp 185.000 — 450.000',
    rating: '4.9',
    sold: '22 terjual',
    bullets: ['Sensor langsung ke lensa', 'Minim chromatic aberration', 'Filamen atau aluminium'],
    link: 'https://shopee.co.id/Hade-Clamp-Adaptor-Direc-Sensor-Lensa-Sony-E-mount-to-Handphone-dilengkapi-dengan-pengaturan-jarak-Sensor-ke-Mounting-(FFD-Seting)-Hade-Creative-Production-i.43595306.55800543344?extraParams=%7B%22display_model_id%22%3A118769876586%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Clamp Adaptor Direc Sensor Lensa Sony E-mount to Handphone dilengkapi dengan pengaturan jarak Sensor ke Mounting (FFD Seting)',
      [
        'id-11134207-8224t-mggly2zgjifj39.webp',
        'id-11134207-8224x-mggly30l766n8c.webp',
        'id-11134207-8224x-mghulx5pnjm4c0.webp',
        'id-11134207-82250-mggly2zgkwzz44.webp',
        'id-11134207-82251-mggly2zr1d6yb8.webp',
      ],
    ),
  },
  {
    index: '05',
    family: 'Direc Sensor',
    name: 'Direc Sensor MFT',
    mount: 'Micro Four Thirds',
    price: 'Rp 185.000 — 450.000',
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
    mount: 'Universal Tele 18x — 60x',
    price: 'Rp 180.000 — 545.000',
    rating: '4.8',
    sold: '107 terjual',
    best: true,
    bullets: ['Solusi lensa tele yang melorot', 'Mounting tripod 1/4 inch', 'L-bracket portrait & landscape'],
    link: 'https://shopee.co.id/Hade-Bracket-Lensa-Tele-Handphone-(18X-22X-36X-60X)-Rigging-System-2026-Cocok-untuk-Apexel-TaffSPORT-Pickogen-Soha-DLL.-Hade-Creative-Production-i.43595306.21362770833?extraParams=%7B%22display_model_id%22%3A29771564472%2C%22model_selection_logic%22%3A3%7D',
    images: IMG_BASE(
      'Hade Bracket Lensa Tele Handphone (18X, 22X, 36X & 60X) Rigging System 2026 Cocok untuk Apexel, TaffSPORT, Pickogen, Soha DLL',
      [
        'id-11134207-822wh-mnhndq6a8glg3a.webp',
        'id-11134207-822wi-mnhndq6a721048.webp',
        'id-11134207-822wl-mma0sn4ge03z68.webp',
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

// Carousel state — one active image index per product
const activeIdx = ref<number[]>(products.map(() => 0))

function setSlide(productIdx: number, slideIdx: number) {
  const next = [...activeIdx.value]
  next[productIdx] = slideIdx
  activeIdx.value = next
}

function nextSlide(productIdx: number, total: number) {
  setSlide(productIdx, (activeIdx.value[productIdx] + 1) % total)
}

function prevSlide(productIdx: number, total: number) {
  setSlide(productIdx, (activeIdx.value[productIdx] - 1 + total) % total)
}

// Mobile product-level carousel state
const totalCards = products.length + 1 // includes CTA card
const mobileCardIdx = ref(0)
const mobileTrackOffset = computed(() => `translate3d(-${mobileCardIdx.value * 100}%, 0, 0)`)

function goToCard(i: number) {
  mobileCardIdx.value = Math.max(0, Math.min(totalCards - 1, i))
}

function nextCard() {
  goToCard(mobileCardIdx.value + 1)
}

function prevCard() {
  goToCard(mobileCardIdx.value - 1)
}

// Touch swipe detection — only triggers horizontal swap when gesture is
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
  if (Math.abs(dx) < Math.abs(dy) * ANGLE_BIAS) return // vertical intent — ignore
  if (dx < 0) nextCard()
  else prevCard()
}

const root = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)
const progressBar = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value || !track.value) return

  ctx = gsap.context(() => {
    const trackEl = track.value!
    const totalScroll = () => trackEl.scrollWidth - window.innerWidth

    const isMobile = window.matchMedia('(max-width: 900px)').matches
    if (isMobile) return // skip pinned horizontal scroll on mobile

    const horizontalTween = gsap.to(trackEl, {
      x: () => -totalScroll(),
      ease: 'none',
      scrollTrigger: {
        trigger: root.value!,
        start: 'top top',
        end: () => '+=' + totalScroll(),
        scrub: 0.7,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (progressBar.value) {
            progressBar.value.style.transform = `scaleX(${self.progress})`
          }
        },
      },
    })

    // Per-card subtle scale-in tied to the horizontal tween
    const cards = trackEl.querySelectorAll<HTMLElement>('.card')
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { scale: 0.95, opacity: 0.4 },
        {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            containerAnimation: horizontalTween,
            start: 'left 90%',
            end: 'left 50%',
            scrub: true,
          },
        },
      )
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section id="products" ref="root" class="products">
    <div class="products-frame">
      <header class="head">
        <div class="head-left">
          <span class="eyebrow">
            <span class="mono">katalog · 7 produk</span>
          </span>
          <h2>
            <span>Bertujuh,</span>
            <span class="italic">satu sistem.</span>
          </h2>
        </div>
        <p class="head-right">
          Dua lini utama: <strong>Clamp Adapter</strong> untuk pengguna baru —
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
        <div
          ref="track"
          class="track"
          :style="{ '--m-offset': mobileTrackOffset }"
        >
          <div class="track-inner">
            <article
              v-for="(p, pi) in products"
              :key="p.index"
              class="card"
              :class="{ 'is-best': p.best }"
            >
              <div class="card-shell">
                <div class="card-core">
                  <div class="card-top">
                    <span class="num mono">{{ p.index }} / 07</span>
                    <span v-if="p.best" class="best mono">terlaris</span>
                  </div>

                  <div class="visual">
                    <span class="family-tag mono">{{ p.family }}</span>

                    <div class="slides">
                      <img
                        v-for="(src, si) in p.images"
                        :key="src"
                        class="visual-img"
                        :class="{ 'is-active': activeIdx[pi] === si }"
                        :src="src"
                        :alt="`${p.name} — view ${si + 1}`"
                        :loading="si === 0 ? 'eager' : 'lazy'"
                        decoding="async"
                      />
                    </div>

                    <button
                      class="nav-btn nav-prev"
                      type="button"
                      :aria-label="`Foto sebelumnya ${p.name}`"
                      @click="prevSlide(pi, p.images.length)"
                    >
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M10 3l-5 5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>
                    <button
                      class="nav-btn nav-next"
                      type="button"
                      :aria-label="`Foto berikutnya ${p.name}`"
                      @click="nextSlide(pi, p.images.length)"
                    >
                      <svg viewBox="0 0 16 16" fill="none">
                        <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </button>

                    <div class="dots" role="tablist" :aria-label="`Galeri ${p.name}`">
                      <button
                        v-for="(_, si) in p.images"
                        :key="si"
                        type="button"
                        class="dot"
                        :class="{ 'is-active': activeIdx[pi] === si }"
                        :aria-selected="activeIdx[pi] === si"
                        :aria-label="`Foto ${si + 1}`"
                        @click="setSlide(pi, si)"
                      />
                    </div>

                    <span class="counter mono">
                      {{ String(activeIdx[pi] + 1).padStart(2, '0') }} / {{ String(p.images.length).padStart(2, '0') }}
                    </span>
                  </div>

                  <div class="card-body">
                    <h3>{{ p.name }}</h3>
                    <span class="mount mono">{{ p.mount }}</span>
                    <ul>
                      <li v-for="b in p.bullets" :key="b">
                        <span class="li-dot"></span>{{ b }}
                      </li>
                    </ul>
                  </div>

                  <footer class="card-foot">
                    <div class="foot-price">
                      <span class="label mono">harga shopee</span>
                      <span class="value">{{ p.price }}</span>
                      <span class="discount mono">−{{ DISCOUNT_PERCENT }}% via WA</span>
                    </div>
                    <div class="foot-actions">
                      <a
                        class="shopee-buy"
                        :href="p.link"
                        target="_blank"
                        rel="noreferrer"
                        :aria-label="`Buka ${p.name} di Shopee`"
                      >
                        <span class="shopee-mark" aria-hidden="true">S</span>
                        <span>Shopee</span>
                      </a>
                      <a
                        class="buy-btn wa-buy"
                        :href="waProductLink(p.name, p.price)"
                        target="_blank"
                        rel="noreferrer"
                        :aria-label="`Pesan ${p.name} via WhatsApp`"
                      >
                        <span class="wa-icon" aria-hidden="true">
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
                          </svg>
                        </span>
                        <span class="wa-buy-copy">
                          <span class="wa-buy-line">Pesan via WA</span>
                          <span class="wa-buy-sub mono">−{{ DISCOUNT_PERCENT }}% &middot; gratis ongkir</span>
                        </span>
                      </a>
                    </div>
                  </footer>
                </div>
              </div>
            </article>

            <article class="card cta-card">
              <div class="card-shell">
                <div class="card-core dark">
                  <span class="num mono">END</span>
                  <h3 class="cta-title">
                    <span>Mau diskon</span>
                    <span class="italic">{{ DISCOUNT_PERCENT }}% + gratis ongkir?</span>
                  </h3>
                  <p>
                    Chat langsung admin Hade di WhatsApp. Konsultasi gratis,
                    pengiriman dari Sukabumi, garansi 1 bulan untuk semua adapter.
                  </p>
                  <div class="cta-actions">
                    <a class="cta-link wa" :href="waLink()" target="_blank" rel="noreferrer">
                      <span class="wa-icon" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
                        </svg>
                      </span>
                      <span>Chat WhatsApp</span>
                      <span class="arrow">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      <div class="m-controls" aria-hidden="false">
        <button
          type="button"
          class="m-arrow"
          :disabled="mobileCardIdx === 0"
          aria-label="Produk sebelumnya"
          @click="prevCard"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3l-5 5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <div class="m-dots" role="tablist" aria-label="Daftar produk">
          <button
            v-for="i in totalCards"
            :key="i"
            type="button"
            class="m-dot"
            :class="{ 'is-active': mobileCardIdx === i - 1 }"
            :aria-selected="mobileCardIdx === i - 1"
            :aria-label="`Produk ${i}`"
            @click="goToCard(i - 1)"
          />
        </div>

        <button
          type="button"
          class="m-arrow"
          :disabled="mobileCardIdx === totalCards - 1"
          aria-label="Produk berikutnya"
          @click="nextCard"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <span class="m-counter mono">
          {{ String(mobileCardIdx + 1).padStart(2, '0') }} / {{ String(totalCards).padStart(2, '0') }}
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
  height: 100dvh;
  display: flex;
  flex-direction: column;
  padding: clamp(4rem, 7vh, 5.5rem) 0 clamp(1.5rem, 3vh, 2.25rem);
  overflow: hidden;
}

.head {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem;
  align-items: end;
  padding: 0 var(--gutter);
  max-width: var(--container);
  margin: 0 auto 1.5rem;
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

.progress {
  grid-column: 1 / -1;
  height: 2px;
  background: var(--hairline);
  border-radius: 2px;
  overflow: hidden;
  margin-top: 0.75rem;
}

.progress-bar {
  height: 100%;
  background: var(--c-ink);
  transform-origin: left center;
  transform: scaleX(0);
  transition: transform 0.1s linear;
}

.rail {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  min-height: 0;
  padding: clamp(0.75rem, 1.5vh, 1.25rem) 0;
}

.track {
  display: block;
  will-change: transform;
  height: 100%;
}

.track-inner {
  display: flex;
  gap: 1.25rem;
  padding-left: var(--gutter);
  padding-right: 25vw;
  align-items: stretch;
  height: 100%;
}

.card {
  flex: 0 0 clamp(320px, 30vw, 420px);
  height: 100%;
  max-height: 580px;
  min-height: 0;
}

.card-shell {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border: 1px solid var(--hairline);
  border-radius: 28px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 22px 60px -28px rgba(14, 14, 15, 0.22);
}

.card-core {
  position: relative;
  height: 100%;
  background: #fff;
  border: 1px solid var(--hairline);
  border-radius: 22px;
  padding: 1.6rem 1.6rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  overflow: hidden;
}

.card-top {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.best {
  padding: 0.25rem 0.55rem;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 999px;
  font-size: 10px;
}

/* visual block */
.visual {
  position: relative;
  height: 48%;
  background:
    linear-gradient(180deg, #fafaf9, #ececea);
  border: 1px solid var(--hairline);
  border-radius: 14px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.visual::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(14, 14, 15, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(14, 14, 15, 0.06) 1px, transparent 1px);
  background-size: 24px 24px;
  -webkit-mask-image: radial-gradient(circle at 50% 50%, #000 0%, transparent 75%);
          mask-image: radial-gradient(circle at 50% 50%, #000 0%, transparent 75%);
  pointer-events: none;
}

.family-tag {
  position: absolute;
  top: 0.7rem;
  left: 0.85rem;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--c-ink);
  background: rgba(255, 255, 255, 0.85);
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--hairline);
  z-index: 3;
  backdrop-filter: blur(6px);
}

/* Carousel slides */
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
  filter: grayscale(0.1) contrast(1.04);
  opacity: 0;
  transform: scale(1.04);
  transition:
    opacity 0.7s var(--ease-out),
    transform 1.6s var(--ease-out),
    filter 0.6s var(--ease-out);
  will-change: opacity, transform;
  pointer-events: none;
}

.visual-img.is-active {
  opacity: 1;
  transform: scale(1);
}

.card:hover .visual-img.is-active {
  transform: scale(1.05);
  filter: grayscale(0) contrast(1.06);
}

/* Carousel nav buttons */
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
  box-shadow: 0 6px 18px -10px rgba(14, 14, 15, 0.4);
  opacity: 0;
  transition:
    opacity 0.4s var(--ease-out),
    background 0.4s var(--ease-out),
    transform 0.5s var(--ease-out);
}

.nav-btn svg {
  width: 14px;
  height: 14px;
}

.nav-prev { left: 0.65rem; }
.nav-next { right: 0.65rem; }

.card:hover .nav-btn,
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

/* Counter */
.counter {
  position: absolute;
  top: 0.7rem;
  right: 0.85rem;
  z-index: 3;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--c-ink);
  background: rgba(255, 255, 255, 0.85);
  padding: 0.25rem 0.55rem;
  border-radius: 999px;
  border: 1px solid var(--hairline);
  backdrop-filter: blur(6px);
}

/* body */
.card-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.card-body h3 {
  margin: 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--c-ink);
}

.mount {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.card-body ul {
  list-style: none;
  margin: 0.4rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.card-body li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 13px;
  color: var(--fg-muted);
  line-height: 1.5;
}

.li-dot {
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--c-ink);
}

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 0.85rem;
  padding-top: 1rem;
  border-top: 1px solid var(--hairline);
}

.foot-price {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  flex: 1;
  min-width: 0;
}

.foot-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.4rem;
  flex-shrink: 0;
}

.discount {
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #128c4a;
  margin-top: 0.15rem;
}

.label {
  display: block;
  font-size: 9.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin-bottom: 0.25rem;
}

.value {
  font-size: 13px;
  font-weight: 500;
  color: var(--c-ink);
  letter-spacing: -0.01em;
}

.buy-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.55rem 0.55rem 1rem;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.5s var(--ease-out);
  align-self: flex-end;
}

/* Per-card WhatsApp primary buy button */
.buy-btn.wa-buy {
  position: relative;
  padding: 0.45rem 0.85rem 0.45rem 0.45rem;
  gap: 0.55rem;
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 10px 24px -10px rgba(18, 140, 74, 0.55);
  overflow: hidden;
  isolation: isolate;
  align-self: stretch;
}

.buy-btn.wa-buy::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.2) 50%, transparent 70%);
  transform: translateX(-110%);
  transition: transform 1.1s var(--ease-out);
  pointer-events: none;
  z-index: 1;
}

.buy-btn.wa-buy:hover {
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 14px 30px -10px rgba(18, 140, 74, 0.7);
}

.buy-btn.wa-buy:hover::before {
  transform: translateX(110%);
}

.buy-btn .wa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.buy-btn .wa-icon svg { width: 14px; height: 14px; }

.wa-buy-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
  gap: 0.18rem;
  position: relative;
  z-index: 2;
}

.wa-buy-line {
  font-weight: 500;
  font-size: 12.5px;
}

.wa-buy-sub {
  font-size: 9px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

/* Subtle Shopee secondary on each card */
.shopee-buy {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.32rem 0.7rem 0.32rem 0.36rem;
  border-radius: 999px;
  background: rgba(238, 77, 45, 0.06);
  border: 1px solid rgba(238, 77, 45, 0.25);
  color: #c43d20;
  font-size: 11px;
  letter-spacing: -0.005em;
  transition: background 0.4s var(--ease-out), border-color 0.4s var(--ease-out), color 0.4s var(--ease-out);
}

.shopee-buy:hover {
  background: rgba(238, 77, 45, 0.1);
  border-color: rgba(238, 77, 45, 0.4);
  color: #b3361b;
}

.shopee-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border-radius: 999px;
  background: #ee4d2d;
  color: #fff;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 10px;
  line-height: 1;
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px -12px rgba(14, 14, 15, 0.55);
}

.buy-btn:active {
  transform: scale(0.97);
}

.buy-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  transition: all 0.5s var(--ease-out);
}

.buy-btn:hover .buy-icon {
  background: rgba(255, 255, 255, 0.24);
  transform: translate(2px, -2px) scale(1.06);
}

.buy-icon svg {
  width: 11px;
  height: 11px;
}

/* CTA card */
.cta-card .card-core.dark {
  background: var(--c-ink);
  color: var(--c-paper);
  border-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cta-card .num {
  color: rgba(255, 255, 255, 0.5);
}

.cta-title {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: 2rem;
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
}

.cta-title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: rgba(245, 245, 243, 0.7);
}

.cta-card p {
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(245, 245, 243, 0.65);
  margin: 0;
}

.cta-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  align-self: flex-start;
  padding: 0.85rem 1.25rem;
  border: 1px solid rgba(245, 245, 243, 0.25);
  border-radius: 999px;
  font-size: 14px;
  letter-spacing: -0.01em;
  transition: all 0.5s var(--ease-out);
}

.cta-link:hover {
  background: var(--c-paper);
  color: var(--c-ink);
  border-color: var(--c-paper);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  align-items: center;
}

.cta-link.wa {
  position: relative;
  padding: 0.6rem 1rem 0.6rem 0.55rem;
  gap: 0.55rem;
  background: linear-gradient(140deg, #25c862 0%, #15a04f 55%, #0d6e3a 100%);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 12px 28px -10px rgba(20, 160, 80, 0.6);
  overflow: hidden;
  isolation: isolate;
}

.cta-link.wa::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.25) 50%, transparent 70%);
  transform: translateX(-110%);
  transition: transform 1.1s var(--ease-out);
  pointer-events: none;
  z-index: 1;
}

.cta-link.wa:hover {
  background: linear-gradient(140deg, #25c862 0%, #15a04f 55%, #0d6e3a 100%);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.32);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.34),
    0 16px 36px -10px rgba(20, 160, 80, 0.75);
}

.cta-link.wa:hover::before {
  transform: translateX(110%);
}

.cta-link.wa .wa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
}

.cta-link.wa .wa-icon svg { width: 15px; height: 15px; }

.cta-link.wa > span:not(.wa-icon) { position: relative; z-index: 2; }

.cta-link.shopee-mini {
  padding: 0.55rem 0.95rem 0.55rem 0.45rem;
  gap: 0.5rem;
  background: rgba(238, 77, 45, 0.1);
  border-color: rgba(238, 77, 45, 0.4);
  color: #ff8c70;
  font-size: 12.5px;
}

.cta-link.shopee-mini:hover {
  background: rgba(238, 77, 45, 0.18);
  border-color: rgba(238, 77, 45, 0.55);
  color: #ff9c80;
}

.arrow {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2em;
  transition: transform 0.5s var(--ease-out);
}

.cta-link:hover .arrow {
  transform: translate(2px, -2px);
}

/* Mobile carousel controls — hidden on desktop */
.m-controls { display: none; }

/* Mobile fallback */
@media (max-width: 900px) {
  .products-frame {
    height: auto;
    padding: 4.5rem 0 3rem;
  }
  .head {
    grid-template-columns: 1fr;
    margin-bottom: 1.75rem;
  }
  .progress { display: none; }

  /* Lock the rail — no native horizontal scroll. Vertical page scroll
     stays free because touch-action is pan-y. */
  .rail {
    overflow: hidden;
    touch-action: pan-y;
    scroll-snap-type: none;
    width: 100%;
  }

  .track {
    width: 100%;
    transform: var(--m-offset, translate3d(0, 0, 0));
    transition: transform 0.55s var(--ease-out);
  }

  .track-inner {
    gap: 0;
    padding-left: 0;
    padding-right: 0;
    width: 100%;
  }

  .card {
    flex: 0 0 100%;
    width: 100%;
    height: auto;
    min-height: 0;
    max-height: none;
    padding: 0 var(--gutter);
  }

  /* Mobile carousel controls */
  .m-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.85rem;
    margin: 1.5rem auto 0;
    padding: 0 var(--gutter);
    width: 100%;
    max-width: var(--container);
  }

  .m-arrow {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    color: var(--c-ink);
    border: 1px solid var(--hairline-strong);
    transition: transform 0.4s var(--ease-out), background 0.4s var(--ease-out), opacity 0.3s var(--ease-out);
  }

  .m-arrow svg { width: 14px; height: 14px; }

  .m-arrow:hover { background: var(--c-ink); color: var(--c-paper); }
  .m-arrow:active { transform: scale(0.94); }
  .m-arrow:disabled { opacity: 0.35; pointer-events: none; }

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
}

/* Mobile carousel — refine sizing for small screens */
@media (max-width: 640px) {
  .products-frame {
    padding: 3rem 0 2.5rem;
  }

  .head {
    margin-bottom: 1.25rem;
    gap: 1rem;
  }

  .head-left .eyebrow {
    margin-bottom: 0.75rem;
  }

  .head h2 {
    font-size: 1.6rem;
    line-height: 1.05;
  }

  .head-right {
    font-size: 12.5px;
    line-height: 1.5;
  }

  .card-shell {
    border-radius: 18px;
    padding: 4px;
  }

  .card-core {
    border-radius: 14px;
    padding: 1rem 1rem 1rem;
    gap: 0.85rem;
  }

  .card-top {
    font-size: 9.5px;
    letter-spacing: 0.16em;
  }

  .best {
    font-size: 9px;
    padding: 0.2rem 0.45rem;
  }

  .visual {
    height: 220px;
    border-radius: 10px;
  }

  .family-tag {
    font-size: 9px;
    padding: 0.2rem 0.45rem;
    top: 0.5rem;
    left: 0.5rem;
  }

  .counter {
    font-size: 9px;
    padding: 0.2rem 0.45rem;
    top: 0.5rem;
    right: 0.5rem;
  }

  .nav-btn {
    width: 30px;
    height: 30px;
    opacity: 1;
    background: rgba(255, 255, 255, 0.92);
  }

  .nav-btn svg {
    width: 12px;
    height: 12px;
  }

  .nav-prev { left: 0.4rem; }
  .nav-next { right: 0.4rem; }

  .dots {
    bottom: 0.5rem;
    gap: 0.25rem;
    padding: 0.25rem 0.4rem;
  }

  .dot {
    width: 5px;
    height: 5px;
  }

  .dot.is-active {
    width: 12px;
  }

  .card-body {
    gap: 0.4rem;
  }

  .card-body h3 {
    font-size: 1.1rem;
    line-height: 1.1;
  }

  .mount {
    font-size: 9.5px;
    letter-spacing: 0.14em;
  }

  .card-body ul {
    gap: 0.35rem;
    margin-top: 0.25rem;
  }

  .card-body li {
    font-size: 11.5px;
    line-height: 1.4;
    padding-left: 0.9rem;
  }

  .li-dot {
    width: 4px;
    height: 4px;
    top: 0.5em;
  }

  .card-foot {
    padding-top: 0.7rem;
    align-items: stretch;
    flex-direction: column;
    gap: 0.65rem;
  }

  .foot-actions {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .label {
    font-size: 9px;
    letter-spacing: 0.18em;
    margin-bottom: 0.15rem;
  }

  .value {
    font-size: 12px;
  }

  .discount {
    font-size: 8.5px;
  }

  .buy-btn {
    font-size: 11.5px;
    padding: 0.45rem 0.5rem 0.45rem 0.8rem;
    gap: 0.3rem;
  }

  .buy-btn.wa-buy {
    flex: 1;
    justify-content: flex-start;
    padding: 0.45rem 0.7rem 0.45rem 0.4rem;
    gap: 0.5rem;
  }

  .buy-btn .wa-icon {
    width: 26px;
    height: 26px;
  }

  .buy-btn .wa-icon svg { width: 13px; height: 13px; }

  .wa-buy-line { font-size: 11.5px; }
  .wa-buy-sub { font-size: 8.5px; letter-spacing: 0.14em; }

  .shopee-buy {
    font-size: 10.5px;
    padding: 0.28rem 0.6rem 0.28rem 0.32rem;
  }

  .shopee-mark {
    width: 14px;
    height: 14px;
    font-size: 9px;
  }

  .buy-icon {
    width: 20px;
    height: 20px;
  }

  .buy-icon svg {
    width: 9px;
    height: 9px;
  }

  .cta-title {
    font-size: 1.4rem;
  }

  .cta-card p {
    font-size: 12px;
    line-height: 1.45;
  }

  .cta-link {
    font-size: 12.5px;
    padding: 0.7rem 1rem;
  }

  .cta-link.wa {
    padding: 0.55rem 0.95rem 0.55rem 0.45rem;
  }

  .cta-link.wa .wa-icon { width: 26px; height: 26px; }
  .cta-link.wa .wa-icon svg { width: 13px; height: 13px; }

  .cta-link.shopee-mini {
    padding: 0.5rem 0.85rem 0.5rem 0.4rem;
    font-size: 11.5px;
  }

  .m-controls {
    margin-top: 1.1rem;
    gap: 0.6rem;
  }

  .m-arrow {
    width: 36px;
    height: 36px;
  }

  .m-arrow svg { width: 12px; height: 12px; }

  .m-counter {
    font-size: 10px;
    letter-spacing: 0.14em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .track {
    transition: none;
  }
}
</style>
