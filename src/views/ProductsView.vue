<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, reactive } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products, type ProductFamily } from '../data/products'
import { waLink, DISCOUNT_PERCENT } from '../composables/useContact'
import { navigateToProduct } from '../composables/useProductTransition'

gsap.registerPlugin(ScrollTrigger)

const router = useRouter()

// natural aspect ratio (w/h) per slug — drives justified row layout
const aspectMap = reactive<Record<string, number>>({})

function onImgLoad(slug: string, e: Event) {
  const img = e.target as HTMLImageElement
  if (img.naturalWidth && img.naturalHeight) {
    aspectMap[slug] = img.naturalWidth / img.naturalHeight
  }
}

function goToProduct(e: MouseEvent, slug: string) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
  e.preventDefault()
  const card = e.currentTarget as HTMLElement | null
  const img = card?.querySelector<HTMLElement>('.card-visual img')
  navigateToProduct(router, slug, `/products/${slug}`, img)
}

type Filter = 'Semua' | ProductFamily
const filters: Filter[] = ['Semua', 'Clamp', 'Direc Sensor', 'Bracket', 'Grip']

const activeFilter = ref<Filter>('Semua')

const visibleProducts = computed(() =>
  activeFilter.value === 'Semua'
    ? products
    : products.filter((p) => p.family === activeFilter.value),
)

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value) return

  ctx = gsap.context(() => {
    // Hero entrance
    gsap.from('.cat-hero [data-stagger]', {
      y: 32,
      opacity: 0,
      filter: 'blur(8px)',
      duration: 1,
      ease: 'power3.out',
      stagger: 0.08,
      delay: 0.1,
    })

    // Cards reveal on scroll
    const cards = gsap.utils.toArray<HTMLElement>('.cat-card')
    cards.forEach((card, i) => {
      gsap.fromTo(
        card,
        { y: 40, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        },
      )
    })
  }, root.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
})

function setFilter(f: Filter) {
  activeFilter.value = f
}
</script>

<template>
  <main ref="root" class="catalog">
    <!-- Hero -->
    <section class="cat-hero">
      <div class="container">
        <span class="cat-eyebrow mono" data-stagger>
          <span class="dot"></span>
          katalog · {{ products.length }} produk
        </span>

        <h1 class="cat-title" data-stagger>
          <span>Tujuh adapter,</span>
          <span class="italic">satu sistem.</span>
        </h1>

        <p class="cat-lede" data-stagger>
          Setiap produk Hade dibuat untuk satu pekerjaan: mengubah HP yang sudah
          kamu pakai jadi kamera setara DSLR. Pilih berdasarkan lensa yang sudah
          kamu punya, atau jenis hasil yang kamu inginkan.
        </p>

        <div class="cat-meta" data-stagger>
          <span class="meta-cell">
            <span class="meta-num mono">{{ products.length }}</span>
            <span class="meta-label">model aktif</span>
          </span>
          <span class="meta-divider"></span>
          <span class="meta-cell">
            <span class="meta-num mono">{{ DISCOUNT_PERCENT }}%</span>
            <span class="meta-label">diskon via WA</span>
          </span>
          <span class="meta-divider"></span>
          <span class="meta-cell">
            <span class="meta-num mono">1 bln</span>
            <span class="meta-label">garansi ganti baru</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Filter rail -->
    <section class="cat-filters">
      <div class="container">
        <div class="filter-row">
          <button
            v-for="f in filters"
            :key="f"
            type="button"
            class="filter-chip"
            :class="{ 'is-active': activeFilter === f }"
            @click="setFilter(f)"
          >
            <span>{{ f }}</span>
            <span v-if="f !== 'Semua'" class="filter-count mono">
              {{ products.filter(p => p.family === f).length }}
            </span>
          </button>
        </div>
      </div>
    </section>

    <!-- Grid -->
    <section class="cat-grid-wrap">
      <div class="container">
        <div class="cat-grid">
          <RouterLink
            v-for="p in visibleProducts"
            :key="p.slug"
            :to="`/products/${p.slug}`"
            class="cat-card"
            :class="{ 'is-best': p.best }"
            :style="{ '--r': aspectMap[p.slug] ?? 1.25 }"
            @click="(e: MouseEvent) => goToProduct(e, p.slug)"
          >
            <div class="card-visual">
              <img
                :src="p.images[0]"
                :alt="p.name"
                loading="lazy"
                decoding="async"
                @load="(e) => onImgLoad(p.slug, e)"
              />
              <span v-if="p.best" class="card-tag mono">terlaris</span>
              <span class="card-arrow" aria-hidden="true">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M5 11l6-6M6 5h5v5" stroke="currentColor"
                    stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </div>
            <div class="card-meta">
              <span class="card-family mono">
                {{ p.family }} · {{ p.index }} / 07
              </span>
              <h3 class="card-title">{{ p.name }}</h3>
              <span class="card-mount mono">{{ p.mount }}</span>
              <p class="card-tagline">{{ p.tagline }}</p>
              <div class="card-foot">
                <span class="card-price">{{ p.price }}</span>
                <span class="card-link mono">lihat detail →</span>
              </div>
            </div>
          </RouterLink>
        </div>

        <p v-if="!visibleProducts.length" class="cat-empty">
          Tidak ada produk untuk filter ini.
        </p>
      </div>
    </section>

    <!-- CTA -->
    <section class="cat-cta">
      <div class="container">
        <div class="cta-card">
          <span class="cta-mark mono">END / katalog</span>
          <h2 class="cta-title">
            <span>Bingung mulai dari mana?</span>
            <span class="italic">Chat dulu, gratis.</span>
          </h2>
          <p class="cta-desc">
            Sebutkan tipe HP & lensa (atau brand favorit kamu), admin Hade akan
            kirim rekomendasi paket dalam hitungan menit. Diskon
            {{ DISCOUNT_PERCENT }}% + gratis ongkir berlaku saat pesan via WA.
          </p>
          <a class="cta-btn" :href="waLink()" target="_blank" rel="noreferrer">
            <span class="cta-btn-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13z"/>
              </svg>
            </span>
            Chat WhatsApp
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.catalog {
  background: var(--bg);
  min-height: 100dvh;
  padding-top: clamp(7rem, 14vh, 9rem);
}

/* ========== Hero ========== */
.cat-hero {
  padding: clamp(2rem, 5vh, 3rem) 0 clamp(2.5rem, 5vh, 3.5rem);
  border-bottom: 1px solid var(--hairline);
}

.cat-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.4rem 0.85rem;
  border: 1px solid var(--hairline-strong);
  border-radius: 999px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: var(--fg-muted);
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
}

.cat-eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-ink);
  animation: cat-pulse 2.4s var(--ease-out) infinite;
}

@keyframes cat-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.7); }
}

.cat-title {
  margin: 1.4rem 0 1.1rem;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2.4rem, 6.5vw, 5rem);
  line-height: 0.96;
  letter-spacing: -0.045em;
  color: var(--c-ink);
  display: flex;
  flex-direction: column;
  text-wrap: balance;
}

.cat-title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  letter-spacing: -0.05em;
  color: var(--c-iron);
}

.cat-lede {
  font-size: clamp(15px, 1.4vw, 17px);
  line-height: 1.55;
  color: var(--fg-muted);
  max-width: 58ch;
  margin: 0;
  text-wrap: pretty;
}

.cat-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.3rem;
  margin-top: 2.2rem;
  padding-top: 1.6rem;
  border-top: 1px solid var(--hairline);
}

.meta-cell {
  display: inline-flex;
  flex-direction: column;
  gap: 0.2rem;
}

.meta-num {
  font-size: 22px;
  letter-spacing: -0.02em;
  color: var(--c-ink);
  font-weight: 500;
}

.meta-label {
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.meta-divider {
  width: 1px;
  height: 32px;
  background: var(--hairline-strong);
}

/* ========== Filter row ========== */
.cat-filters {
  position: sticky;
  top: 88px;
  z-index: 20;
  padding: 1rem 0;
  background: rgba(245, 245, 243, 0.78);
  backdrop-filter: blur(28px) saturate(1.4);
  -webkit-backdrop-filter: blur(28px) saturate(1.4);
  border-bottom: 1px solid var(--hairline);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  border-radius: 999px;
  border: 1px solid var(--hairline-strong);
  background: transparent;
  color: var(--fg-muted);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: -0.005em;
  transition:
    background 0.35s var(--ease-out),
    color 0.35s var(--ease-out),
    border-color 0.35s var(--ease-out),
    transform 0.35s var(--ease-out);
}

.filter-chip:hover {
  border-color: var(--c-ink);
  color: var(--c-ink);
}

.filter-chip:active { transform: scale(0.97); }

.filter-chip.is-active {
  background: var(--c-ink);
  color: var(--c-paper);
  border-color: var(--c-ink);
}

.filter-count {
  font-size: 10.5px;
  letter-spacing: 0.12em;
  opacity: 0.65;
}

.filter-chip.is-active .filter-count { opacity: 0.7; }

/* ========== Grid ========== */
.cat-grid-wrap {
  padding: clamp(2.5rem, 6vh, 4.5rem) 0 clamp(3.5rem, 8vh, 6rem);
}

.cat-grid {
  display: flex;
  flex-wrap: wrap;
  gap: clamp(1.4rem, 2.6vw, 2.4rem) clamp(1.2rem, 2.4vw, 2.2rem);
  --row-h: clamp(220px, 26vw, 320px);
}

.cat-card {
  /* width grows from natural aspect ratio (--r = w/h) at row height */
  flex: var(--r, 1.25) 1 calc(var(--row-h) * var(--r, 1.25));
  min-width: min(280px, 100%);
  display: flex;
  flex-direction: column;
  gap: 0.95rem;
  color: var(--c-ink);
  cursor: pointer;
}

.card-visual {
  position: relative;
  width: 100%;
  height: var(--row-h);
  background: var(--c-paper-2);
  border-radius: 4px;
  overflow: hidden;
}

.card-visual img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: clamp(0.6rem, 1.4vw, 1.1rem);
  transform: scale(1.02);
  transition: transform 1.2s var(--ease-out), filter 0.6s var(--ease-out);
  filter: contrast(1.02);
}

.cat-card:hover .card-visual img {
  transform: scale(1.05);
}

.card-tag {
  position: absolute;
  top: 0.85rem;
  left: 0.85rem;
  z-index: 2;
  padding: 0.32rem 0.6rem;
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 999px;
}

.card-arrow {
  position: absolute;
  bottom: 0.85rem;
  right: 0.85rem;
  z-index: 2;
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

.card-arrow svg { width: 14px; height: 14px; }

.cat-card:hover .card-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0 0.15rem;
}

.card-family {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.card-title {
  margin: 0.1rem 0 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.3rem, 1.6vw, 1.6rem);
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--c-ink);
}

.card-mount {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.card-tagline {
  margin: 0.35rem 0 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--fg-muted);
  max-width: 38ch;
}

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.85rem;
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--hairline);
}

.card-price {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--c-ink);
  letter-spacing: -0.005em;
}

.card-link {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-muted);
  transition: color 0.3s var(--ease-out);
}

.cat-card:hover .card-link { color: var(--c-ink); }

.cat-empty {
  text-align: center;
  font-size: 14px;
  color: var(--fg-muted);
  padding: 4rem 0;
}

/* ========== Bottom CTA ========== */
.cat-cta {
  padding: 0 0 clamp(4rem, 8vh, 6rem);
}

.cta-card {
  position: relative;
  background: var(--c-ink);
  color: var(--c-paper);
  padding: clamp(2.5rem, 6vw, 4.5rem);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  align-items: flex-start;
  overflow: hidden;
}

.cta-card::before {
  content: '';
  position: absolute;
  inset: -40% -10% auto auto;
  width: 60%;
  aspect-ratio: 1;
  background: radial-gradient(circle, rgba(245, 245, 243, 0.08), transparent 65%);
  pointer-events: none;
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
  font-size: clamp(1.7rem, 3.4vw, 2.6rem);
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
  color: rgba(245, 245, 243, 0.75);
}

.cta-desc {
  font-size: 14.5px;
  line-height: 1.6;
  color: rgba(245, 245, 243, 0.65);
  margin: 0;
  max-width: 56ch;
}

.cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.75rem 1.1rem 0.75rem 0.6rem;
  margin-top: 0.5rem;
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  color: #fff;
  font-size: 13.5px;
  font-weight: 500;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 12px 30px -14px rgba(18, 140, 74, 0.55);
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}

.cta-btn:hover {
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    0 18px 36px -14px rgba(18, 140, 74, 0.7);
}

.cta-btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
}

.cta-btn-icon svg { width: 14px; height: 14px; }

/* ========== Tablet ========== */
@media (max-width: 1024px) {
  .cat-grid {
    --row-h: clamp(200px, 32vw, 280px);
  }
}

/* ========== Mobile ========== */
@media (max-width: 640px) {
  .catalog { padding-top: 6.5rem; }
  .cat-filters { top: 76px; }
  .cat-grid {
    --row-h: clamp(220px, 56vw, 320px);
    gap: 1.4rem;
  }
  .cat-card {
    flex: 1 1 100%;
    min-width: 100%;
  }
  .cat-meta { gap: 1rem; }
  .meta-divider { display: none; }
  .cta-card { border-radius: 8px; }
}
</style>
