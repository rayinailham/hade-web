<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../data/products'
import { waLink, DISCOUNT_PERCENT } from '../composables/useContact'

defineProps<{
  product: Product
  related: Product[]
}>()
</script>

<template>
  <div class="pdb">
    <div class="container">
      <!-- Description + specs -->
      <section class="pdb-detail pd-reveal">
        <div class="pdb-desc">
          <span class="pdb-section-mark mono">tentang produk</span>
          <h2 class="pdb-section-title">{{ product.tagline }}</h2>
          <p class="pdb-section-body">{{ product.description }}</p>

          <div class="pdb-inbox">
            <span class="pdb-section-mark mono">isi paket</span>
            <ul class="pdb-inbox-list">
              <li v-for="i in product.inBox" :key="i">{{ i }}</li>
            </ul>
          </div>
        </div>

        <aside class="pdb-specs">
          <span class="pdb-section-mark mono">spesifikasi</span>
          <dl class="pdb-spec-list">
            <div v-for="s in product.specs" :key="s.label" class="pdb-spec-row">
              <dt>{{ s.label }}</dt>
              <dd>{{ s.value }}</dd>
            </div>
          </dl>
        </aside>
      </section>

      <!-- Related -->
      <section class="pdb-related pd-reveal" v-if="related.length">
        <header class="pdb-rel-head">
          <span class="pdb-section-mark mono">produk lainnya</span>
          <h2 class="pdb-section-title">
            <span>Tetap satu sistem,</span>
            <span class="italic">beda fungsi.</span>
          </h2>
        </header>
        <div class="pdb-rel-grid">
          <RouterLink
            v-for="r in related"
            :key="r.slug"
            :to="`/products/${r.slug}`"
            class="pdb-rel-card"
          >
            <div class="rel-visual">
              <img :src="r.images[0]" :alt="r.name" loading="lazy" decoding="async" />
            </div>
            <div class="rel-meta">
              <span class="rel-family mono">{{ r.family }}</span>
              <h3 class="rel-title">{{ r.name }}</h3>
              <span class="rel-link mono">lihat detail →</span>
            </div>
          </RouterLink>
        </div>
      </section>

      <!-- Final cta -->
      <section class="pdb-cta pd-reveal">
        <div class="pdb-cta-card">
          <span class="pdb-cta-mark mono">end / detail</span>
          <h2 class="pdb-cta-title">
            <span>Mau diskon {{ DISCOUNT_PERCENT }}%</span>
            <span class="italic">+ gratis ongkir?</span>
          </h2>
          <p class="pdb-cta-desc">
            Chat admin Hade di WhatsApp. Sebutkan tipe HP, lensa yang sudah
            kamu punya, dan kebutuhan shooting. Kami akan bantu pilih paket
            paling pas.
          </p>
          <a class="pdb-cta-btn" :href="waLink()" target="_blank" rel="noreferrer">
            <span class="cta-btn-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13z"/>
              </svg>
            </span>
            Chat WhatsApp
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.pdb {
  padding: clamp(4rem, 9vh, 7rem) 0 clamp(4rem, 8vh, 6rem);
  border-top: 1px solid var(--hairline);
  margin-top: clamp(3rem, 6vh, 4.5rem);
}

.pdb-detail {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding-bottom: clamp(3rem, 7vh, 5rem);
  border-bottom: 1px solid var(--hairline);
}

.pdb-section-mark {
  display: inline-block;
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin-bottom: 1rem;
}

.pdb-section-title {
  margin: 0 0 1rem;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(1.6rem, 2.6vw, 2.2rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
  color: var(--c-ink);
  display: flex;
  flex-direction: column;
  text-wrap: balance;
}

.pdb-section-title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
  letter-spacing: -0.045em;
}

.pdb-section-body {
  font-size: 15px;
  line-height: 1.7;
  color: var(--fg-muted);
  max-width: 60ch;
  margin: 0 0 2.5rem;
}

.pdb-inbox-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.pdb-inbox-list li {
  position: relative;
  padding-left: 1.4rem;
  font-size: 14.5px;
  color: var(--fg-muted);
  line-height: 1.55;
}

.pdb-inbox-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 8px;
  height: 1px;
  background: var(--c-ink);
}

.pdb-specs {
  position: sticky;
  top: 140px;
  align-self: flex-start;
  padding: 1.6rem;
  border: 1px solid var(--hairline-strong);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(12px);
}

.pdb-spec-list {
  margin: 0;
  display: flex;
  flex-direction: column;
}

.pdb-spec-row {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid var(--hairline);
  font-size: 13.5px;
  line-height: 1.45;
}

.pdb-spec-row:last-child { border-bottom: 0; }

.pdb-spec-row dt {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin: 0;
}

.pdb-spec-row dd {
  margin: 0;
  color: var(--c-ink);
  font-weight: 500;
}

/* Related */
.pdb-related {
  padding: clamp(3.5rem, 7vh, 5rem) 0 clamp(3rem, 6vh, 4.5rem);
  border-bottom: 1px solid var(--hairline);
}

.pdb-rel-head { margin-bottom: 2.5rem; }

.pdb-rel-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(1.4rem, 2.4vw, 2.2rem);
}

.pdb-rel-card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  color: var(--c-ink);
}

.rel-visual {
  position: relative;
  aspect-ratio: 4 / 3;
  background: var(--c-paper-2);
  border-radius: 4px;
  overflow: hidden;
}

.rel-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.1s var(--ease-out);
  transform: scale(1.02);
}

.pdb-rel-card:hover .rel-visual img { transform: scale(1.07); }

.rel-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 0 0.1rem;
}

.rel-family {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.rel-title {
  margin: 0.1rem 0 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 1.1;
  letter-spacing: -0.025em;
}

.rel-link {
  margin-top: 0.4rem;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-muted);
  transition: color 0.3s var(--ease-out);
}

.pdb-rel-card:hover .rel-link { color: var(--c-ink); }

/* Final CTA */
.pdb-cta { padding-top: clamp(3rem, 6vh, 4.5rem); }

.pdb-cta-card {
  position: relative;
  background: var(--c-ink);
  color: var(--c-paper);
  padding: clamp(2.5rem, 5vw, 4rem);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  overflow: hidden;
}

.pdb-cta-mark {
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.5);
}

.pdb-cta-title {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(1.6rem, 3.2vw, 2.4rem);
  line-height: 1.02;
  letter-spacing: -0.04em;
  margin: 0;
  display: flex;
  flex-direction: column;
}

.pdb-cta-title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: rgba(245, 245, 243, 0.7);
}

.pdb-cta-desc {
  font-size: 14.5px;
  line-height: 1.6;
  color: rgba(245, 245, 243, 0.65);
  margin: 0;
  max-width: 56ch;
}

.pdb-cta-btn {
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
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 12px 30px -14px rgba(18, 140, 74, 0.55);
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}

.pdb-cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.32),
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

@media (max-width: 1024px) {
  .pdb-detail { grid-template-columns: 1fr; }
  .pdb-specs {
    position: static;
    margin-top: 1rem;
  }
  .pdb-rel-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .pdb-rel-grid { grid-template-columns: 1fr; }
  .pdb-spec-row { grid-template-columns: 1fr; gap: 0.25rem; }
  .pdb-cta-card { border-radius: 8px; }
}
</style>
