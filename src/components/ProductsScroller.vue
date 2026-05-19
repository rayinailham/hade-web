<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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

// Carousel state — one active index per product
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

      <div class="rail">
        <div ref="track" class="track">
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
                    <div>
                      <span class="label mono">harga</span>
                      <span class="value">{{ p.price }}</span>
                    </div>
                    <a
                      class="buy-btn"
                      :href="p.link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>Beli</span>
                      <span class="buy-icon">
                        <svg viewBox="0 0 16 16" fill="none">
                          <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                      </span>
                    </a>
                  </footer>
                </div>
              </div>
            </article>

            <article class="card cta-card">
              <div class="card-shell">
                <div class="card-core dark">
                  <span class="num mono">END</span>
                  <h3 class="cta-title">
                    <span>Mau lihat semua</span>
                    <span class="italic">di Shopee?</span>
                  </h3>
                  <p>
                    Toko hade Creative — 1.500+ followers, chat performance 97%,
                    pengiriman dari Sukabumi.
                  </p>
                  <a class="cta-link" href="https://s.shopee.co.id/4AwuG0d1or" target="_blank" rel="noreferrer">
                    Buka Shopee
                    <span class="arrow">↗</span>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
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
  padding: clamp(5rem, 9vh, 7rem) 0 clamp(2.5rem, 5vh, 3.5rem);
  overflow: hidden;
}

.head {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 2rem;
  align-items: end;
  padding: 0 var(--gutter);
  max-width: var(--container);
  margin: 0 auto 2.25rem;
  width: 100%;
}

.head-left .eyebrow { margin-bottom: 1.25rem; }

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
}

.track {
  display: block;
  will-change: transform;
}

.track-inner {
  display: flex;
  gap: 1.25rem;
  padding-left: var(--gutter);
  padding-right: 25vw;
  align-items: stretch;
}

.card {
  flex: 0 0 clamp(320px, 30vw, 420px);
  height: 62vh;
  max-height: 580px;
  min-height: 460px;
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
  padding-top: 1rem;
  border-top: 1px solid var(--hairline);
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

.arrow {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.2em;
  transition: transform 0.5s var(--ease-out);
}

.cta-link:hover .arrow {
  transform: translate(2px, -2px);
}

/* Mobile fallback */
@media (max-width: 900px) {
  .products-frame {
    height: auto;
    padding: 4.5rem 0 4rem;
  }
  .head {
    grid-template-columns: 1fr;
    margin-bottom: 1.75rem;
  }
  .progress { display: none; }

  .rail { overflow-x: auto; scroll-snap-type: x mandatory; }
  .rail::-webkit-scrollbar { height: 4px; }

  .track-inner {
    padding-right: var(--gutter);
  }

  .card {
    flex: 0 0 78vw;
    height: 70vh;
    min-height: 440px;
    scroll-snap-align: start;
  }
}

/* Mobile carousel — one card at a time */
@media (max-width: 640px) {
  .products-frame {
    padding: 3rem 0 3rem;
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

  .rail {
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scroll-padding-left: var(--gutter);
  }

  .track-inner {
    gap: 0.75rem;
    padding-right: var(--gutter);
  }

  .card {
    flex: 0 0 calc(100vw - calc(var(--gutter) * 2));
    height: auto;
    min-height: 0;
    max-height: none;
    scroll-snap-align: center;
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
    height: 200px;
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
    font-size: 1.05rem;
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
    align-items: center;
  }

  .label {
    font-size: 9px;
    letter-spacing: 0.18em;
    margin-bottom: 0.15rem;
  }

  .value {
    font-size: 11.5px;
  }

  .buy-btn {
    font-size: 11.5px;
    padding: 0.45rem 0.5rem 0.45rem 0.8rem;
    gap: 0.3rem;
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
}
</style>
