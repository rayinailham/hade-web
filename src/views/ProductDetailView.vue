<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { findProduct, products } from '../data/products'
import { waProductLink, DISCOUNT_PERCENT } from '../composables/useContact'
import ProductDetailBody from '../components/ProductDetailBody.vue'

gsap.registerPlugin(ScrollTrigger)

const route = useRoute()

const product = computed(() => {
  const slug = (route.params.slug as string) ?? ''
  return findProduct(slug)
})

const activeImage = ref(0)

watch(
  () => product.value?.slug,
  () => {
    activeImage.value = 0
  },
)

const related = computed(() => {
  if (!product.value) return []
  return products.filter((p) => p.slug !== product.value!.slug).slice(0, 3)
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
            <div class="pd-main">
              <img
                v-for="(img, i) in product.images"
                :key="img"
                class="pd-main-img"
                :class="{ 'is-active': i === activeImage }"
                :src="img"
                :alt="product.name"
                loading="eager"
                decoding="async"
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
                <span class="rating-num">{{ product.rating }}</span>
                <span class="rating-sub mono">
                  / 5 · {{ product.sold }}
                </span>
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
              <a class="btn btn-shopee" :href="product.link" target="_blank" rel="noreferrer">
                Lihat di Shopee
              </a>
            </div>

            <p class="pd-foot mono" data-stagger>
              order &lt; jam 14:00 → kirim hari yang sama (Sukabumi)
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
  background: var(--c-paper-2);
  border-radius: 6px;
  overflow: hidden;
}

.pd-main-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.02);
  opacity: 0;
  transform: scale(1.02);
  transition: opacity 0.7s var(--ease-out), transform 1.4s var(--ease-out);
  pointer-events: none;
}

.pd-main-img.is-active {
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
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
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.2rem 0;
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
  margin-bottom: 1.4rem;
}

.pd-price { display: flex; flex-direction: column; gap: 0.25rem; }

.price-num {
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--c-ink);
}

.price-sub {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #128c4a;
}

.pd-rating {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.rating-num {
  font-size: 18px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--c-ink);
}

.rating-sub {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.pd-bullets {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
}

.pd-bullet {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 14px;
  line-height: 1.55;
  color: var(--fg-muted);
}

.bullet-mark {
  flex-shrink: 0;
  width: 6px;
  height: 6px;
  margin-top: 0.5em;
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
  background: transparent;
  color: var(--c-ink);
  border-color: var(--hairline-strong);
}

.btn-shopee:hover {
  border-color: var(--c-ink);
  background: rgba(14, 14, 15, 0.04);
}

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

/* Responsive */
@media (max-width: 1024px) {
  .pd-hero { grid-template-columns: 1fr; }
  .pd-gallery { position: static; }
}

@media (max-width: 640px) {
  .pd { padding-top: 6.5rem; }
  .pd-shell { gap: 1.5rem; }
  .pd-back { gap: 0.5rem; }
  .pd-crumbs { font-size: 10px; }
  .pd-crumbs .current { max-width: 14ch; }
  .pd-actions .btn { width: 100%; }
}
</style>

