<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { SITE_NAME } from '../composables/useSeo'

const router = useRouter()

useHead({
  title: `Halaman tidak ditemukan — ${SITE_NAME}`,
  meta: [
    { name: 'robots', content: 'noindex, follow' },
    { name: 'description', content: 'Halaman yang kamu cari tidak ditemukan di situs Hade Creative.' },
  ],
})
</script>

<template>
  <main class="nf">
    <div class="nf-inner">
      <span class="nf-mark mono">404 / route not found</span>
      <h1 class="nf-title">
        <span>Halaman ini</span>
        <span class="italic">belum ada.</span>
      </h1>
      <p class="nf-desc">
        Mungkin link-nya sudah berubah, atau produk yang dimaksud sudah diganti
        nama. Coba kembali ke beranda atau telusuri katalog.
      </p>
      <div class="nf-cta">
        <button type="button" class="btn btn-dark" @click="router.push('/')">
          Kembali ke beranda
        </button>
        <button type="button" class="btn btn-ghost" @click="router.push('/products')">
          Lihat katalog
        </button>
      </div>
    </div>
  </main>
</template>

<style scoped>
.nf {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem var(--gutter) 4rem;
  background: var(--bg);
}

.nf-inner {
  max-width: 580px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: center;
}

.nf-mark {
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.nf-title {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 1;
  letter-spacing: -0.04em;
  margin: 0;
  display: flex;
  flex-direction: column;
  color: var(--c-ink);
}

.nf-title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
  letter-spacing: -0.05em;
}

.nf-desc {
  font-size: 15px;
  line-height: 1.6;
  color: var(--fg-muted);
  max-width: 48ch;
  margin: 0;
}

.nf-cta {
  display: inline-flex;
  gap: 0.65rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 0.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.4rem;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.005em;
  border-radius: 6px;
  border: 1px solid transparent;
  transition: transform 0.3s var(--ease-out), background 0.3s var(--ease-out), border-color 0.3s var(--ease-out);
}

.btn:active { transform: scale(0.98); }

.btn-dark {
  background: var(--c-ink);
  color: var(--c-paper);
}

.btn-dark:hover { background: #1f1f21; }

.btn-ghost {
  background: transparent;
  color: var(--c-ink);
  border-color: var(--hairline-strong);
}

.btn-ghost:hover {
  border-color: var(--c-ink);
  background: rgba(14, 14, 15, 0.04);
}
</style>
