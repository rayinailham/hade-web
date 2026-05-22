<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { findProduct, products } from '../data/products'
import { waProductLink, openShopeeProduct, DISCOUNT_PERCENT } from '../composables/useContact'
import ProductDetailBody from '../components/ProductDetailBody.vue'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

// Snapshot slug locally. During mode="out-in" leave animation the old view
// is still in DOM; if we read `route.params.slug` directly it becomes
// undefined the moment user navigates to /products, briefly flashing the
// empty state. We only update the local ref while the route still matches
// the product-detail route.
const currentSlug = ref<string>((route.params.slug as string) ?? '')

watch(
  () => [route.name, route.params.slug] as const,
  ([name, slug]) => {
    if (name === 'product-detail' && typeof slug === 'string') {
      currentSlug.value = slug
    }
  },
)

const product = computed(() => findProduct(currentSlug.value))

const activeImage = ref(0)

watch(
  () => product.value?.slug,
  () => {
    activeImage.value = 0
  },
)

const related = computed(() => {
  if (!product.value) return []
  return products.filter((p) => p.slug !== product.value!.slug).slice(0, 4)
})

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value || !product.value) return

  ctx = gsap.context(() => {
    // Hero entrance — split image + meta
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from('.pd-back', { opacity: 0, y: -8, duration: 0.5 })
      .from('.pd-gallery', { opacity: 0, x: -32, filter: 'blur(10px)', duration: 0.95 }, 0)
      .from(
        '.pd-info [data-stagger]',
        { opacity: 0, y: 28, filter: 'blur(8px)', duration: 0.85, stagger: 0.07 },
        0.18,
      )
      .from('.pd-thumbs', { opacity: 0, y: 12, duration: 0.6 }, 0.5)

    // Sections reveal on scroll
    gsap.utils.toArray<HTMLElement>('.pd-reveal').forEach((el) => {
      gsap.fromTo(
        el,
        { y: 32, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true },
        },
      )
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

function selectImage(i: number) {
  activeImage.value = i
}

function nextImg() {
  if (!product.value) return
  selectImage((activeImage.value + 1) % product.value.images.length)
}

function prevImg() {
  if (!product.value) return
  const len = product.value.images.length
  selectImage((activeImage.value - 1 + len) % len)
}

// Drag / swipe to change image
const mainRef = ref<HTMLElement | null>(null)
const dragOffset = ref(0)
const isDragging = ref(false)
let dragStartX = 0
let dragStartY = 0
let pointerId: number | null = null
let lockedAxis: 'x' | 'y' | null = null
const SWIPE_THRESHOLD = 50

function onDragStart(e: PointerEvent) {
  if (!product.value || product.value.images.length < 2) return
  if (e.pointerType === 'mouse' && e.button !== 0) return
  // Skip when pointer starts on interactive child (arrow buttons), so their
  // click events fire normally without being eaten by setPointerCapture.
  const target = e.target as HTMLElement | null
  if (target?.closest('button, a')) return
  pointerId = e.pointerId
  dragStartX = e.clientX
  dragStartY = e.clientY
  lockedAxis = null
  isDragging.value = true
  dragOffset.value = 0
  // Defer setPointerCapture until x-axis drag is confirmed in onDragMove.
}

function onDragMove(e: PointerEvent) {
  if (!isDragging.value || e.pointerId !== pointerId) return
  const dx = e.clientX - dragStartX
  const dy = e.clientY - dragStartY

  if (!lockedAxis) {
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    lockedAxis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    if (lockedAxis === 'y') {
      cancelDrag()
      return
    }
    if (lockedAxis === 'x') {
      try { mainRef.value?.setPointerCapture(e.pointerId) } catch {}
    }
  }

  if (lockedAxis === 'x') {
    e.preventDefault()
    dragOffset.value = dx
  }
}

function onDragEnd(e: PointerEvent) {
  if (!isDragging.value || e.pointerId !== pointerId) return
  const dx = dragOffset.value
  const wasAxisLocked = lockedAxis
  finishDrag()
  if (wasAxisLocked === 'x' && Math.abs(dx) > SWIPE_THRESHOLD) {
    if (dx < 0) nextImg()
    else prevImg()
  } else if (wasAxisLocked === null) {
    // No real drag — treat as click → open lightbox
    openLightbox()
  }
}

function cancelDrag() {
  if (pointerId !== null) {
    try { mainRef.value?.releasePointerCapture(pointerId) } catch {}
  }
  finishDrag()
}

function finishDrag() {
  isDragging.value = false
  dragOffset.value = 0
  pointerId = null
  lockedAxis = null
}

const galleryStyle = computed(() => {
  if (!isDragging.value) return {}
  return { '--drag-x': `${dragOffset.value}px` } as Record<string, string>
})

// Share
const shareCopied = ref(false)
let shareResetTimer: ReturnType<typeof setTimeout> | null = null

async function shareProduct() {
  if (!product.value) return
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const shareData = {
    title: product.value.name,
    text: `${product.value.name} — ${product.value.tagline}`,
    url,
  }
  // Prefer native share sheet (mobile)
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share(shareData)
      return
    } catch (err) {
      // User cancelled — bail without copy fallback
      if (err instanceof DOMException && err.name === 'AbortError') return
    }
  }
  // Clipboard fallback
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(url)
    } else if (typeof document !== 'undefined') {
      const ta = document.createElement('textarea')
      ta.value = url
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    shareCopied.value = true
    if (shareResetTimer) clearTimeout(shareResetTimer)
    shareResetTimer = setTimeout(() => { shareCopied.value = false }, 1800)
  } catch {}
}

// Lightbox
const lightboxOpen = ref(false)

function openLightbox() {
  if (!product.value || product.value.images.length === 0) return
  lightboxOpen.value = true
}

function closeLightbox() {
  lightboxOpen.value = false
}

function onLightboxKey(e: KeyboardEvent) {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') nextImg()
  else if (e.key === 'ArrowLeft') prevImg()
}

watch(lightboxOpen, (open) => {
  if (typeof document === 'undefined') return
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onLightboxKey)
  else window.removeEventListener('keydown', onLightboxKey)
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
    window.removeEventListener('keydown', onLightboxKey)
  }
})
</script>

<template>
  <main ref="root" class="pd">
    <template v-if="product">
      <div class="container pd-shell">
        <!-- Breadcrumb / back -->
        <nav class="pd-back" aria-label="Breadcrumb">
          <RouterLink to="/products" class="pd-back-link">
            <span class="back-arrow" aria-hidden="true">←</span>
            <span>kembali ke katalog</span>
          </RouterLink>
          <span class="pd-crumbs mono">
            <RouterLink to="/">hade</RouterLink>
            <span class="sep">/</span>
            <RouterLink to="/products">products</RouterLink>
            <span class="sep">/</span>
            <span class="current">{{ product.slug }}</span>
          </span>
        </nav>

        <!-- Hero split -->
        <section class="pd-hero">
          <div class="pd-gallery">
            <div
              class="pd-main"
              ref="mainRef"
              :class="{ 'is-dragging': isDragging }"
              :style="galleryStyle"
              @pointerdown="onDragStart"
              @pointermove="onDragMove"
              @pointerup="onDragEnd"
              @pointercancel="onDragEnd"
            >
              <img
                v-for="(img, i) in product.images"
                :key="img"
                class="pd-main-img"
                :class="{ 'is-active': i === activeImage }"
                :style="{ transform: `translate3d(calc(${(i - activeImage) * 100}% + var(--drag-x, 0px)), 0, 0)` }"
                :src="img"
                :alt="product.name"
                loading="eager"
                decoding="async"
                draggable="false"
              />

              <button
                v-if="product.images.length > 1"
                type="button"
                class="pd-arrow pd-prev"
                aria-label="Foto sebelumnya"
                @click="prevImg"
              >
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M10 3l-5 5 5 5" stroke="currentColor"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <button
                v-if="product.images.length > 1"
                type="button"
                class="pd-arrow pd-next"
                aria-label="Foto berikutnya"
                @click="nextImg"
              >
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M6 3l5 5-5 5" stroke="currentColor"
                    stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>

            <div class="pd-thumbs" v-if="product.images.length > 1">
              <button
                v-for="(img, i) in product.images"
                :key="img + i"
                type="button"
                class="pd-thumb"
                :class="{ 'is-active': i === activeImage }"
                :aria-label="`Pilih foto ${i + 1}`"
                @click="selectImage(i)"
              >
                <img :src="img" :alt="`thumbnail ${i + 1}`" loading="lazy" />
              </button>
            </div>
          </div>

          <div class="pd-info">
            <span class="pd-family mono" data-stagger>
              {{ product.family }} · {{ product.index }} / 07
            </span>

            <h1 class="pd-title" data-stagger>{{ product.name }}</h1>

            <p class="pd-mount mono" data-stagger>{{ product.mount }}</p>

            <p class="pd-tag" data-stagger>{{ product.tagline }}</p>

            <div class="pd-price-row" data-stagger>
              <div class="pd-price">
                <span class="price-num">{{ product.price }}</span>
                <span class="price-sub mono">
                  diskon {{ DISCOUNT_PERCENT }}% via WA · gratis ongkir
                </span>
              </div>
              <div class="pd-rating">
                <span class="rating-num">
                  <svg class="rating-star" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.6l2.86 6.18 6.74.66-5.08 4.62 1.5 6.66L12 17.3l-6.02 3.42 1.5-6.66L2.4 9.44l6.74-.66L12 2.6z" fill="currentColor"/>
                  </svg>
                  <span class="rating-val">{{ product.rating }}</span>
                  <span class="rating-of">/ 5</span>
                </span>
                <span class="rating-sub mono">{{ product.sold }}</span>
              </div>
            </div>

            <div class="pd-bullets" data-stagger>
              <div
                v-for="b in product.bullets"
                :key="b"
                class="pd-bullet"
              >
                <span class="bullet-mark" aria-hidden="true"></span>
                <span>{{ b }}</span>
              </div>
            </div>

            <div class="pd-actions" data-stagger>
              <button
                type="button"
                class="btn btn-share"
                :class="{ 'is-copied': shareCopied }"
                :aria-label="shareCopied ? 'Tautan disalin' : 'Bagikan produk'"
                @click="shareProduct"
              >
                <span class="share-icon" aria-hidden="true">
                  <svg v-if="!shareCopied" viewBox="0 0 24 24" fill="none">
                    <path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .17 4l-6.34 3.66A3 3 0 1 0 9 14l6 3.34A3 3 0 1 0 18 16a3 3 0 0 0-1.83.66L9.83 13A3.04 3.04 0 0 0 9 11l6.17-3.66A3 3 0 0 0 18 8z"
                      stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none">
                    <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor"
                      stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="share-label">{{ shareCopied ? 'Tautan disalin' : 'Bagikan' }}</span>
              </button>
              <a
                class="btn btn-shopee"
                :href="product.link"
                target="_blank"
                rel="noreferrer"
                @click="openShopeeProduct(product.link, $event)"
              >
                Lihat di Shopee
              </a>
              <a
                class="btn btn-wa"
                :href="waProductLink(product.name, product.price)"
                target="_blank"
                rel="noreferrer"
              >
                <span class="wa-mark" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13z"/>
                  </svg>
                </span>
                Pesan via WhatsApp
              </a>
            </div>

            <p class="pd-foot mono" data-stagger>
              {{ product.shipNote ?? 'order < jam 14:00 → kirim hari yang sama (Sukabumi)' }}
            </p>
          </div>
        </section>
      </div>
    </template>

    <template v-else>
      <div class="container pd-empty">
        <span class="pd-mark mono">404 / produk tidak ditemukan</span>
        <h1 class="pd-empty-title">
          <span>Produk ini</span>
          <span class="italic">sudah tidak ada.</span>
        </h1>
        <RouterLink to="/products" class="btn btn-dark">
          Lihat katalog lengkap
        </RouterLink>
      </div>
    </template>

    <!-- Detail body — only when product exists -->
    <template v-if="product">
      <ProductDetailBody :product="product" :related="related" />
    </template>

    <!-- Lightbox -->
    <Transition name="lb">
      <div
        v-if="lightboxOpen && product"
        class="lb"
        role="dialog"
        aria-modal="true"
        aria-label="Pratinjau foto produk"
        @click.self="closeLightbox"
      >
        <button
          type="button"
          class="lb-close"
          aria-label="Tutup"
          @click="closeLightbox"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" />
          </svg>
        </button>

        <button
          v-if="product.images.length > 1"
          type="button"
          class="lb-arrow lb-prev"
          aria-label="Foto sebelumnya"
          @click.stop="prevImg"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M10 3l-5 5 5 5" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <button
          v-if="product.images.length > 1"
          type="button"
          class="lb-arrow lb-next"
          aria-label="Foto berikutnya"
          @click.stop="nextImg"
        >
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <figure class="lb-stage" @click.self="closeLightbox">
          <img
            :src="product.images[activeImage]"
            :alt="product.name"
            class="lb-img"
            draggable="false"
          />
          <figcaption class="lb-caption mono">
            {{ activeImage + 1 }} / {{ product.images.length }}
          </figcaption>
        </figure>
      </div>
    </Transition>
  </main>
</template>

<style scoped>
.pd {
  background: var(--bg);
  min-height: 100dvh;
  padding-top: clamp(7rem, 14vh, 9rem);
}

.pd-shell {
  display: flex;
  flex-direction: column;
  gap: clamp(2rem, 4vh, 3rem);
}

/* Back / breadcrumb */
.pd-back {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.pd-back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 13px;
  color: var(--fg-muted);
  padding: 0.4rem 0.7rem 0.4rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--hairline-strong);
  background: #fff;
  transition: color 0.3s var(--ease-out), border-color 0.3s var(--ease-out), background 0.3s var(--ease-out);
}

.pd-back-link:hover {
  color: var(--c-ink);
  border-color: var(--c-ink);
  background: rgba(14, 14, 15, 0.03);
}

.back-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: var(--c-ink);
  color: var(--c-paper);
  font-size: 12px;
  line-height: 1;
}

.pd-crumbs {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.pd-crumbs a { color: var(--fg-muted); transition: color 0.3s var(--ease-out); }
.pd-crumbs a:hover { color: var(--c-ink); }
.pd-crumbs .sep { opacity: 0.45; }
.pd-crumbs .current { color: var(--c-ink); max-width: 22ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Hero split */
.pd-hero {
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  align-items: start;
  background: #fff;
  border: 1px solid rgba(14, 14, 15, 0.2);
  border-radius: 8px;
  padding: clamp(1.25rem, 3vw, 2rem);
  box-shadow: 0 1px 2px rgba(14, 14, 15, 0.04), 0 4px 12px -6px rgba(14, 14, 15, 0.06);
}

/* Gallery */
.pd-gallery {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.pd-main {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  touch-action: pan-y;
  cursor: grab;
  user-select: none;
  -webkit-user-select: none;
}

.pd-main.is-dragging {
  cursor: grabbing;
}

.pd-main-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: contrast(1.02);
  transition: transform 0.55s var(--ease-out);
  will-change: transform;
  pointer-events: none;
  -webkit-user-drag: none;
  user-select: none;
}

.pd-main-img.is-active {
  pointer-events: auto;
}

.pd-main.is-dragging .pd-main-img {
  transition: none;
}

.pd-arrow {
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 40px;
  height: 40px;
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
  transition: transform 0.4s var(--ease-out), background 0.4s var(--ease-out), color 0.4s var(--ease-out);
}

.pd-arrow svg { width: 14px; height: 14px; }
.pd-prev { left: 0.85rem; }
.pd-next { right: 0.85rem; }

.pd-arrow:hover {
  background: var(--c-ink);
  color: var(--c-paper);
  transform: translateY(-50%) scale(1.06);
}

.pd-arrow:active { transform: translateY(-50%) scale(0.94); }

.pd-thumbs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(64px, 1fr));
  gap: 0.5rem;
}

.pd-thumb {
  position: relative;
  aspect-ratio: 1;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid var(--hairline);
  background: var(--c-paper-2);
  cursor: pointer;
  transition: border-color 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}

.pd-thumb img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.7;
  transition: opacity 0.3s var(--ease-out);
}

.pd-thumb:hover img { opacity: 1; }
.pd-thumb.is-active {
  border-color: var(--c-ink);
}
.pd-thumb.is-active img { opacity: 1; }

/* Info column */
.pd-info {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;
}

.pd-family {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin-bottom: 0.85rem;
}

.pd-title {
  margin: 0 0 0.4rem;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2rem, 4.5vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--c-ink);
  text-wrap: balance;
}

.pd-mount {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin: 0 0 1.2rem;
}

.pd-tag {
  font-size: 16px;
  line-height: 1.55;
  color: var(--fg-muted);
  margin: 0 0 1.8rem;
  max-width: 48ch;
}

.pd-price-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
  margin-bottom: 1.4rem;
}

.pd-price { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }

.price-num {
  font-size: clamp(16px, 1.6vw, 19px);
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--c-ink);
  white-space: nowrap;
}

.price-sub {
  font-size: 9.5px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #128c4a;
}

.pd-rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
  flex-shrink: 0;
}

.rating-num {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--c-ink);
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.rating-of {
  font-size: 11px;
  color: var(--fg-subtle);
  font-weight: 400;
}

.rating-star {
  width: 12px;
  height: 12px;
  color: #f5b301;
  flex-shrink: 0;
}

.rating-sub {
  font-size: 9px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  white-space: nowrap;
}

.pd-bullets {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem 1rem;
  margin-bottom: 1.6rem;
}

.pd-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--fg-muted);
}

.bullet-mark {
  flex-shrink: 0;
  width: 5px;
  height: 5px;
  margin-top: 0.55em;
  border-radius: 50%;
  background: var(--c-ink);
}

.pd-actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 1.2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.3rem;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
  border-radius: 999px;
  border: 1px solid transparent;
  transition: transform 0.3s var(--ease-out), background 0.3s var(--ease-out),
    color 0.3s var(--ease-out), border-color 0.3s var(--ease-out),
    box-shadow 0.4s var(--ease-out);
}

.btn:active { transform: scale(0.98); }

.btn-wa {
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  color: #fff;
  border-color: rgba(255, 255, 255, 0.18);
  padding: 0.85rem 1.3rem 0.85rem 0.55rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 12px 28px -14px rgba(18, 140, 74, 0.55);
}

.btn-wa:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32),
    0 18px 36px -14px rgba(18, 140, 74, 0.7);
}

.wa-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.wa-mark svg { width: 14px; height: 14px; }

.btn-shopee {
  background: #ee4d2d;
  color: #fff;
  border-color: #ee4d2d;
}

.btn-shopee:hover {
  background: #d8431f;
  border-color: #d8431f;
  color: #fff;
}

.btn-share {
  background: transparent;
  color: var(--c-ink);
  border-color: var(--hairline-strong);
  padding: 0.85rem 1.1rem;
}

.btn-share:hover {
  border-color: var(--c-ink);
  background: rgba(14, 14, 15, 0.04);
}

.btn-share.is-copied {
  border-color: #128c4a;
  color: #128c4a;
}

.share-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.share-icon svg { width: 16px; height: 16px; }

.btn-dark {
  background: var(--c-ink);
  color: var(--c-paper);
  padding: 0.95rem 1.4rem;
}

.btn-dark:hover { background: #1f1f21; }

.pd-foot {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin: 0.6rem 0 0;
}

/* Empty state */
.pd-empty {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: flex-start;
  padding: 2rem 0 6rem;
}

.pd-mark {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.pd-empty-title {
  margin: 0 0 1rem;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2rem, 4.5vw, 3rem);
  line-height: 1;
  letter-spacing: -0.04em;
  display: flex;
  flex-direction: column;
  color: var(--c-ink);
}

.pd-empty-title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
  letter-spacing: -0.05em;
}

/* Lightbox */
.lb {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(14, 14, 15, 0.92);
  backdrop-filter: blur(8px);
  padding: clamp(1rem, 4vw, 3rem);
}

.lb-stage {
  position: relative;
  margin: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.9rem;
  pointer-events: none;
}

.lb-img {
  max-width: 100%;
  max-height: calc(100% - 2.4rem);
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 24px 60px -20px rgba(0, 0, 0, 0.6);
  pointer-events: auto;
  -webkit-user-drag: none;
  user-select: none;
}

.lb-caption {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
}

.lb-close,
.lb-arrow {
  position: absolute;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: background 0.3s var(--ease-out), transform 0.3s var(--ease-out);
}

.lb-close svg,
.lb-arrow svg { width: 16px; height: 16px; }

.lb-close { top: clamp(1rem, 3vw, 1.5rem); right: clamp(1rem, 3vw, 1.5rem); }
.lb-prev { left: clamp(1rem, 3vw, 1.5rem); top: 50%; transform: translateY(-50%); }
.lb-next { right: clamp(1rem, 3vw, 1.5rem); top: 50%; transform: translateY(-50%); }

.lb-close:hover,
.lb-arrow:hover {
  background: rgba(255, 255, 255, 0.18);
}

.lb-prev:hover { transform: translateY(-50%) scale(1.06); }
.lb-next:hover { transform: translateY(-50%) scale(1.06); }
.lb-close:hover { transform: scale(1.06); }

/* Lightbox transition */
.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.3s var(--ease-out);
}
.lb-enter-active .lb-img,
.lb-leave-active .lb-img {
  transition: transform 0.4s var(--ease-out), opacity 0.3s var(--ease-out);
}
.lb-enter-from,
.lb-leave-to { opacity: 0; }
.lb-enter-from .lb-img,
.lb-leave-to .lb-img { transform: scale(0.96); opacity: 0; }

/* Responsive */
@media (max-width: 1024px) {
  .pd-hero { grid-template-columns: 1fr; }
  .pd-gallery { position: static; }
}

@media (max-width: 640px) {
  .pd {
    padding-top: 5.25rem;
    padding-bottom: calc(76px + env(safe-area-inset-bottom, 0px));
  }
  .pd-shell { gap: 1.1rem; }
  .pd-back { gap: 0.5rem; }
  .pd-crumbs { font-size: 10px; }
  .pd-crumbs .current { max-width: 14ch; }
  .pd-actions { gap: 0.5rem; }
  .pd-actions .btn { width: 100%; }

  /* Full-bleed hero on mobile — drop card chrome, let gallery hit screen edges */
  .pd-hero {
    background: transparent;
    border: 0;
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    gap: 1.1rem;
    margin-left: calc(var(--gutter) * -1);
    margin-right: calc(var(--gutter) * -1);
  }

  .pd-gallery { gap: 0.55rem; }
  .pd-main { border-radius: 0; aspect-ratio: 4 / 3; }
  .pd-arrow { width: 36px; height: 36px; }
  .pd-prev { left: 0.6rem; }
  .pd-next { right: 0.6rem; }

  /* Side gutter only for text + thumbs, image stays edge-to-edge */
  .pd-thumbs {
    padding: 0 var(--gutter);
    grid-template-columns: repeat(auto-fill, minmax(56px, 1fr));
    gap: 0.4rem;
  }
  .pd-info { padding: 0.25rem var(--gutter) 0; }

  .pd-family { margin-bottom: 0.55rem; }
  .pd-title {
    font-size: clamp(1.35rem, 5.4vw, 1.7rem);
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .pd-mount { margin-bottom: 0.9rem; }
  .pd-tag {
    font-size: 14.5px;
    line-height: 1.6;
    margin-bottom: 1.3rem;
  }

  .pd-price-row { padding: 1rem 0; margin-bottom: 1.1rem; }
  .price-num { font-size: 17px; }
  .price-sub { font-size: 9.5px; letter-spacing: 0.14em; }
  .rating-num { font-size: 15px; }
  .rating-sub { font-size: 9.5px; letter-spacing: 0.14em; }

  .pd-bullets {
    grid-template-columns: 1fr;
    gap: 0.4rem;
    margin-bottom: 1.2rem;
  }
  .pd-bullet { font-size: 13px; }

  .pd-actions {
    position: fixed;
    inset: auto 0 0 0;
    z-index: 50;
    flex-wrap: nowrap;
    gap: 0;
    margin: 0;
    padding: 0 0 env(safe-area-inset-bottom, 0px);
    background: #fff;
    border-top: 1px solid var(--hairline-strong);
    box-shadow: 0 -8px 24px -12px rgba(14, 14, 15, 0.18);
  }
  .pd-actions .btn {
    flex: 1 1 0;
    width: auto;
    min-width: 0;
    height: 56px;
    padding: 0 0.9rem;
    font-size: 14px;
    font-weight: 600;
    border-radius: 0;
    border: 0;
    box-shadow: none;
  }
  .pd-actions .btn-wa {
    flex: 1.4 1 0;
    background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
    color: #fff;
    padding: 0 0.9rem 0 0.55rem;
  }
  .pd-actions .btn-wa:hover { transform: none; }
  .pd-actions .btn-shopee {
    background: #ee4d2d;
    color: #fff;
  }
  .pd-actions .btn-shopee:hover { background: #d8431f; }
  .pd-actions .btn-share {
    flex: 0 0 56px;
    width: 56px;
    padding: 0;
    background: #fff;
    color: var(--c-ink);
    border-right: 1px solid var(--hairline-strong);
  }
  .pd-actions .btn-share.is-copied {
    color: #128c4a;
  }
  .pd-actions .btn-share .share-label {
    display: none;
  }
  .pd-actions .btn-share .share-icon { width: 18px; height: 18px; }
  .pd-actions .btn-share .share-icon svg { width: 18px; height: 18px; }
  .pd-actions .wa-mark { width: 24px; height: 24px; }
  .pd-actions .wa-mark svg { width: 12px; height: 12px; }

  .pd-foot { display: none; }

  .pd-empty-title { font-size: clamp(1.7rem, 7.5vw, 2.4rem); }
}
</style>

