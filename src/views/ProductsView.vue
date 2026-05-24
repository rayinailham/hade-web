<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useHead } from '@unhead/vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products, type ProductFamily } from '../data/products'
import { waLink, DISCOUNT_PERCENT } from '../composables/useContact'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, abs, parsePriceRange, priceVariantCount } from '../composables/useSeo'
import ProductCard from '../components/ProductCard.vue'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const pageUrl = `${SITE_URL}/products`
const pageTitle = `Katalog Adapter Lensa HP — ${SITE_NAME}`
const pageDescription = `7 adapter lensa untuk HP: clamp DSLR/mirrorless, direc sensor Canon/Nikon/Sony/MFT, bracket tele 18x–60x, grip Bluetooth. Diskon ${DISCOUNT_PERCENT}% via WA.`

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: pageUrl },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ],
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: pageTitle,
        url: pageUrl,
        description: pageDescription,
        inLanguage: 'id-ID',
        isPartOf: { '@id': `${SITE_URL}/#website` },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${SITE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Katalog', item: pageUrl },
          ],
        },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: products.length,
          itemListElement: products.map((p, i) => {
            const { low, high } = parsePriceRange(p.price)
            return {
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Product',
                name: p.name,
                url: `${SITE_URL}/products/${p.slug}`,
                image: p.images[0] ? abs(p.images[0]) : DEFAULT_OG_IMAGE,
                description: p.tagline,
                brand: { '@type': 'Brand', name: 'Hade Creative' },
                category: p.family,
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'IDR',
                  lowPrice: low,
                  highPrice: high,
                  offerCount: priceVariantCount(p.price),
                  availability: 'https://schema.org/InStock',
                  url: `${SITE_URL}/products/${p.slug}`,
                },
              },
            }
          }),
        },
      }),
    },
  ],
})

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

async function setFilter(f: Filter) {
  activeFilter.value = f
  // wait for Vue to re-render shorter/longer grid before scrolling
  await nextTick()
  const target = document.querySelector('.cat-grid-wrap') as HTMLElement | null
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - 80
  // clamp to max scroll so we never overshoot into footer on short lists
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight
  const y = Math.min(top, Math.max(0, maxScroll))
  // Lenis owns scroll; fallback to native if absent
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: number, o?: object) => void } }).lenis
  if (lenis) {
    lenis.scrollTo(y, { duration: 0.7, easing: (t: number) => 1 - Math.pow(1 - t, 3) })
  } else {
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
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

    <!-- Filter toolbar + Grid -->
    <section class="cat-grid-wrap">
      <div class="container">
        <!-- Top filter toolbar -->
        <div class="cat-toolbar">
          <div class="toolbar-head">
            <span class="filter-label mono">filter</span>
            <span class="filter-total mono">
              {{ visibleProducts.length }} / {{ products.length }}
            </span>
          </div>
          <div class="filter-row" role="tablist" aria-label="Filter kategori">
            <button
              v-for="f in filters"
              :key="f"
              type="button"
              class="filter-chip"
              :class="{ 'is-active': activeFilter === f }"
              :aria-pressed="activeFilter === f"
              @click="setFilter(f)"
            >
              <span>{{ f }}</span>
              <span v-if="f !== 'Semua'" class="filter-count mono">
                {{ products.filter(p => p.family === f).length }}
              </span>
            </button>
          </div>
        </div>

        <!-- Grid -->
        <div class="cat-main">
          <div class="cat-grid">
            <ProductCard
              v-for="(p, i) in visibleProducts"
              :key="p.slug"
              :product="p"
              :index="i"
              class="cat-card"
            />
          </div>

          <p v-if="!visibleProducts.length" class="cat-empty">
            Tidak ada produk untuk filter ini.
          </p>
        </div>
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
  padding-top: clamp(4.5rem, 8vh, 6rem);
}

/* ========== Hero ========== */
.cat-hero {
  padding: clamp(1rem, 2.5vh, 1.5rem) 0 clamp(1.5rem, 3.5vh, 2.5rem);
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

/* ========== Layout: top toolbar + grid ========== */
.cat-grid-wrap {
  padding: clamp(2rem, 5vh, 3.5rem) 0 clamp(3.5rem, 8vh, 6rem);
}

.cat-main { min-width: 0; }

/* ========== Top filter toolbar ========== */
.cat-toolbar {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding-bottom: 1rem;
  margin-bottom: clamp(1.4rem, 3vw, 2rem);
  border-bottom: 1px solid var(--hairline);
}

.toolbar-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
}

.filter-label {
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.filter-total {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  color: var(--fg-muted);
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.filter-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  border: 1px solid var(--hairline-strong);
  background: #fff;
  color: var(--fg-muted);
  font-size: 12.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
  cursor: pointer;
  white-space: nowrap;
  transition:
    background 0.3s var(--ease-out),
    color 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out);
}

.filter-chip:hover {
  color: var(--c-ink);
  border-color: var(--c-ink);
}

.filter-chip.is-active {
  background: var(--c-ink);
  color: var(--c-paper);
  border-color: var(--c-ink);
}

.filter-count {
  font-size: 10px;
  letter-spacing: 0.12em;
  opacity: 0.55;
  padding-left: 0.3rem;
  border-left: 1px solid currentColor;
}

.filter-chip.is-active .filter-count { opacity: 0.75; }

.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.2rem, 2.4vw, 2rem) clamp(1rem, 2vw, 1.6rem);
}

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
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.4rem 1.1rem;
  }
}

/* ========== Mobile ========== */
@media (max-width: 640px) {
  .catalog { padding-top: 6.5rem; }
  .cat-toolbar {
    gap: 0.6rem;
    padding-bottom: 0.85rem;
    margin-bottom: 1.2rem;
  }
  .filter-row { gap: 0.35rem; }
  .filter-chip {
    padding: 0.4rem 0.7rem;
    font-size: 11.5px;
  }
  .cat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.85rem 0.7rem;
  }
  .cat-card {
    padding: 0.55rem 0.55rem 0.75rem;
    gap: 0.55rem;
    border-radius: 6px;
  }
  .card-title { font-size: 14px; }
  .card-mount { font-size: 9px; }
  .card-tagline { font-size: 11px; -webkit-line-clamp: 3; }
  .card-price { font-size: 11.5px; }
  .card-link { font-size: 9px; }
  .card-foot {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
    padding-top: 0.5rem;
  }
  .card-tag {
    top: 0.45rem;
    left: 0.45rem;
    padding: 0.22rem 0.45rem;
    font-size: 8.5px;
  }
  .card-arrow { display: none; }
  .cat-meta { gap: 1rem; }
  .meta-divider { display: none; }
  .cta-card { border-radius: 8px; }
}
</style>
