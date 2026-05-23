<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { Product } from '../data/products'

defineProps<{
  product: Product
  /** drop card padding on mobile (used in dense related grids) */
  compact?: boolean
}>()
</script>

<template>
  <RouterLink
    :to="`/products/${product.slug}`"
    class="cat-card"
    :class="{ 'is-best': product.best, 'is-compact': compact }"
  >
    <div class="card-visual">
      <img
        :src="product.images[0]"
        :alt="`${product.name} — ${product.mount}`"
        loading="lazy"
        decoding="async"
        width="600"
        height="600"
      />
      <span v-if="product.best" class="card-tag mono">terlaris</span>
      <span class="card-arrow" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M5 11l6-6M6 5h5v5"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </div>
    <div class="card-meta">
      <h3 class="card-title">{{ product.name }}</h3>
      <span class="card-mount mono">{{ product.mount }}</span>
      <p class="card-tagline">{{ product.tagline }}</p>
      <div class="card-foot">
        <span class="card-price">{{ product.price }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.cat-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: var(--c-ink);
  cursor: pointer;
  min-width: 0;
  height: 100%;
  background: #fff;
  border: 1px solid rgba(14, 14, 15, 0.12);
  border-radius: 8px;
  padding: 0.75rem 0.75rem 0.95rem;
  transition: border-color 0.3s var(--ease-out), transform 0.4s var(--ease-out);
}

.cat-card:hover {
  border-color: rgba(14, 14, 15, 0.25);
}

.card-visual {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  height: auto;
  background: var(--c-paper-2);
  border-radius: 4px;
  overflow: hidden;
}

.card-visual img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 1.2s var(--ease-out), filter 0.6s var(--ease-out);
  filter: contrast(1.02);
}

.cat-card:hover .card-visual img {
  transform: scale(1.05);
}

.card-tag {
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  z-index: 2;
  padding: 0.28rem 0.55rem;
  font-size: 9px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 999px;
}

.card-arrow {
  position: absolute;
  bottom: 0.7rem;
  right: 0.7rem;
  z-index: 2;
  width: 30px;
  height: 30px;
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

.card-arrow svg { width: 12px; height: 12px; }

.cat-card:hover .card-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding: 0 0.15rem;
  flex: 1;
}

.card-title {
  margin: 0.1rem 0 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: clamp(1.05rem, 1.3vw, 1.35rem);
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--c-ink);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: calc(2 * 1.15em);
}

.card-mount {
  font-size: 9.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.card-tagline {
  margin: 0.3rem 0 0;
  font-size: 12px;
  line-height: 1.5;
  color: var(--fg-muted);
  max-width: 38ch;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-foot {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.6rem;
  margin-top: auto;
  padding-top: 0.7rem;
  border-top: 1px solid var(--hairline);
}

.card-price {
  font-size: 12px;
  font-weight: 500;
  color: var(--c-ink);
  letter-spacing: -0.005em;
}

@media (max-width: 640px) {
  .cat-card {
    padding: 0.55rem 0.55rem 0.75rem;
    gap: 0.55rem;
    border-radius: 6px;
  }
  .cat-card.is-compact {
    padding: 0.55rem 0.55rem 0.75rem;
    gap: 0.55rem;
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
  .cat-card.is-compact .card-foot {
    flex-direction: column;
    align-items: stretch;
    gap: 0.35rem;
    padding-top: 0.5rem;
  }
  .cat-card.is-compact .card-price { align-self: flex-start; }
  .cat-card.is-compact .card-link { align-self: flex-end; }
  .card-tag {
    top: 0.45rem;
    left: 0.45rem;
    padding: 0.22rem 0.45rem;
    font-size: 8.5px;
  }
  .card-arrow { display: none; }
}
</style>
