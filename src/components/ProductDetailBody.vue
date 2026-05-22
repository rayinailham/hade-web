<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../data/products'
import { waLink, DISCOUNT_PERCENT } from '../composables/useContact'
import ProductCard from './ProductCard.vue'

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
          <div class="pdb-rel-head-text">
            <span class="pdb-section-mark mono">produk lainnya</span>
            <h2 class="pdb-section-title">
              <span>Tetap satu sistem,</span>
              <span class="italic">beda fungsi.</span>
            </h2>
          </div>
          <RouterLink to="/products" class="pdb-rel-viewall mono">
            lihat semua →
          </RouterLink>
        </header>
        <div class="pdb-rel-grid">
          <ProductCard
            v-for="r in related"
            :key="r.slug"
            :product="r"
            compact
          />
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
  padding: clamp(1rem, 2vh, 1.5rem) 0 clamp(4rem, 8vh, 6rem);
  margin-top: clamp(1rem, 2vh, 1.5rem);
}

.pdb-detail {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: clamp(2rem, 5vw, 4rem);
  padding: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: clamp(1rem, 2vh, 1.5rem);
  background: #fff;
  border: 1px solid rgba(14, 14, 15, 0.2);
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(14, 14, 15, 0.04), 0 4px 12px -6px rgba(14, 14, 15, 0.06);
}

.pdb-desc {
  padding: 0.25rem 0;
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
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem 1rem;
}

.pdb-inbox-list li {
  position: relative;
  padding-left: 1.1rem;
  font-size: 12.5px;
  color: var(--fg-muted);
  line-height: 1.5;
}

.pdb-inbox-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 7px;
  height: 1px;
  background: var(--c-ink);
}

.pdb-specs {
  align-self: flex-start;
  padding: 1.3rem;
  border: 1px solid rgba(14, 14, 15, 0.5);
  border-radius: 8px;
  background: #fff;
}

.pdb-spec-list {
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0 1rem;
}

.pdb-spec-row {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--hairline);
  font-size: 12px;
  line-height: 1.4;
  min-width: 0;
}

.pdb-spec-row:last-child { border-bottom: 1px solid var(--hairline); }
.pdb-spec-row:nth-last-child(-n+2) { border-bottom: 0; }

.pdb-spec-row dt {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin: 0;
}

.pdb-spec-row dd {
  margin: 0;
  color: var(--c-ink);
  font-weight: 500;
  font-size: 12px;
  word-break: break-word;
}

/* Related — chrome-free editorial layout */
.pdb-related {
  padding: 0;
  margin: clamp(2.5rem, 5vh, 3.5rem) 0 clamp(1rem, 2vh, 1.5rem);
  background: transparent;
  border: 0;
  border-radius: 0;
  box-shadow: none;
}

.pdb-rel-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: clamp(1.5rem, 3vh, 2.25rem);
  padding-bottom: clamp(1rem, 2vh, 1.5rem);
  border-bottom: 1px solid var(--hairline);
  flex-wrap: wrap;
}

.pdb-rel-head-text { display: flex; flex-direction: column; }

.pdb-rel-viewall {
  position: relative;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-muted);
  padding: 0.4rem 0;
  white-space: nowrap;
  transition: color 0.3s var(--ease-out);
}

.pdb-rel-viewall::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0.35);
  transform-origin: left;
  transition: transform 0.45s var(--ease-out);
}

.pdb-rel-viewall:hover {
  color: var(--c-ink);
}

.pdb-rel-viewall:hover::after { transform: scaleX(1); }

.pdb-rel-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: clamp(1.2rem, 2.4vw, 2rem) clamp(1rem, 2vw, 1.6rem);
}

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
  .pdb-rel-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.4rem 1.1rem;
  }
}

@media (max-width: 640px) {
  .pdb-detail {
    padding: 1.1rem;
    gap: 1.5rem;
  }
  .pdb-section-title {
    font-size: clamp(1.25rem, 5vw, 1.55rem);
    letter-spacing: -0.025em;
    line-height: 1.15;
  }
  .pdb-section-body {
    font-size: 13.5px;
    line-height: 1.65;
    margin-bottom: 1.75rem;
  }
  .pdb-section-mark { font-size: 9.5px; margin-bottom: 0.75rem; }

  .pdb-rel-head {
    margin-bottom: 1.25rem;
    padding-bottom: 0.85rem;
    gap: 0.85rem;
  }
  .pdb-rel-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.1rem 0.75rem;
  }
  .cat-card {
    padding: 0;
    gap: 0.6rem;
  }
  .card-title { font-size: 14px; }
  .card-mount { font-size: 9px; }
  .card-tagline { font-size: 11px; -webkit-line-clamp: 3; }
  .card-price { font-size: 11.5px; }
  .card-link { font-size: 9px; }
  .card-foot { padding-top: 0.5rem; gap: 0.3rem; }
  .card-tag {
    top: 0.45rem;
    left: 0.45rem;
    padding: 0.22rem 0.45rem;
    font-size: 8.5px;
  }
  .card-arrow { display: none; }
  .pdb-inbox-list {
    grid-template-columns: 1fr;
    gap: 0.45rem;
  }
  .pdb-inbox-list li { font-size: 12px; }

  .pdb-specs { padding: 1rem; }
  .pdb-spec-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 0.85rem;
  }
  .pdb-spec-row {
    padding: 0.5rem 0;
    font-size: 11.5px;
  }
  .pdb-spec-row dt { font-size: 9px; letter-spacing: 0.14em; }
  .pdb-spec-row dd { font-size: 11.5px; }
  .pdb-spec-row:nth-last-child(-n+2) { border-bottom: 0; }
  .pdb-spec-row:last-child { border-bottom: 0; }

  .pdb-cta-card { border-radius: 8px; }
  .pdb-cta-title { font-size: clamp(1.4rem, 5.6vw, 1.8rem); }
  .pdb-cta-desc { font-size: 13px; }
}
</style>
