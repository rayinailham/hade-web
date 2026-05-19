<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getLenis } from '../composables/useLenis'
import { waLink, SHOPEE_STORE, DISCOUNT_PERCENT } from '../composables/useContact'

const open = ref(false)
const scrolled = ref(false)
const waUrl = waLink()

function onScroll() {
  scrolled.value = window.scrollY > 24
}

function scrollTo(id: string) {
  open.value = false
  const el = document.getElementById(id)
  if (!el) return
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(el, { offset: -40, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="nav-inner">
      <a href="#top" class="brand" @click.prevent="scrollTo('top')">
        <img src="/hade-logo.jpg" alt="hade creative" />
        <span class="brand-text">
          <strong>hade</strong>
          <em>creative</em>
        </span>
      </a>

      <nav class="links" aria-label="Primary">
        <button @click="scrollTo('manifesto')">Filosofi</button>
        <button @click="scrollTo('products')">Produk</button>
        <button @click="scrollTo('videos')">Video</button>
        <button @click="scrollTo('compatibility')">Kompatibilitas</button>
      </nav>

      <a class="cta wa-cta" :href="waUrl" target="_blank" rel="noreferrer">
        <span class="wa-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
          </svg>
        </span>
        <span class="wa-text">
          <span>Pesan via WA</span>
          <span class="wa-badge mono">-{{ DISCOUNT_PERCENT }}%</span>
        </span>
      </a>

      <button class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <span></span>
        <span></span>
      </button>
    </div>

    <div v-show="open" class="mobile-panel">
      <button @click="scrollTo('manifesto')">Filosofi</button>
      <button @click="scrollTo('products')">Produk</button>
      <button @click="scrollTo('videos')">Video</button>
      <button @click="scrollTo('compatibility')">Kompatibilitas</button>
      <a class="cta wa-cta" :href="waUrl" target="_blank" rel="noreferrer">
        <span class="wa-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
          </svg>
        </span>
        <span class="wa-text">
          <span>Pesan via WhatsApp</span>
          <span class="wa-badge mono">-{{ DISCOUNT_PERCENT }}% &middot; gratis ongkir</span>
        </span>
      </a>
      <a class="shopee-mobile" :href="SHOPEE_STORE" target="_blank" rel="noreferrer">
        <span class="shopee-mark" aria-hidden="true">S</span>
        <span>Lihat di Shopee</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: clamp(1rem, 2vw, 1.5rem);
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  pointer-events: none;
}

.nav-inner {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.4rem 0.4rem 1rem;
  border-radius: 999px;
  background: rgba(245, 245, 243, 0.72);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border: 1px solid var(--hairline);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.6) inset,
    0 12px 36px -18px rgba(14, 14, 15, 0.18);
  transition: all 0.7s var(--ease-out);
}

.nav.is-scrolled .nav-inner {
  background: rgba(245, 245, 243, 0.92);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.6) inset,
    0 18px 50px -22px rgba(14, 14, 15, 0.28);
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding-right: 0.75rem;
  border-right: 1px solid var(--hairline);
}

.brand img {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  object-fit: cover;
  filter: grayscale(1) contrast(1.05);
  border: 1px solid var(--hairline);
}

.brand-text {
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  font-size: 14px;
  letter-spacing: -0.02em;
}

.brand-text strong {
  font-weight: 600;
  color: var(--c-ink);
}

.brand-text em {
  font-style: italic;
  font-family: var(--font-display);
  color: var(--fg-subtle);
  font-size: 13px;
}

.links {
  display: flex;
  gap: 0.25rem;
  padding: 0 0.5rem;
}

.links button {
  padding: 0.55rem 0.9rem;
  font-size: 13.5px;
  letter-spacing: -0.01em;
  color: var(--fg-muted);
  border-radius: 999px;
  transition: all 0.4s var(--ease-out);
}

.links button:hover {
  color: var(--c-ink);
  background: rgba(14, 14, 15, 0.05);
}

.cta {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.55rem 0.55rem 0.55rem 1rem;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.5s var(--ease-out);
}

.cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 30px -10px rgba(14, 14, 15, 0.5);
}

.cta:active {
  transform: scale(0.98);
}

/* WhatsApp primary CTA — distinct from Shopee */
.cta.wa-cta {
  position: relative;
  padding: 0.4rem 0.85rem 0.4rem 0.4rem;
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 10px 26px -12px rgba(18, 140, 74, 0.55);
  overflow: hidden;
  isolation: isolate;
}

.cta.wa-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.22) 50%, transparent 70%);
  transform: translateX(-110%);
  transition: transform 1.1s var(--ease-out);
  pointer-events: none;
  z-index: 1;
}

.cta.wa-cta:hover {
  transform: translateY(-1px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 14px 32px -12px rgba(18, 140, 74, 0.65);
}

.cta.wa-cta:hover::before {
  transform: translateX(110%);
}

.cta.wa-cta .wa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  position: relative;
  z-index: 2;
}

.cta.wa-cta .wa-icon svg { width: 14px; height: 14px; }

.cta.wa-cta .wa-text {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 2;
}

.wa-badge {
  font-size: 10.5px;
  letter-spacing: 0.06em;
  padding: 0.15rem 0.4rem;
  background: rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  font-weight: 600;
}

/* Subtle Shopee link in nav — present but not loud */
.shopee-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: rgba(238, 77, 45, 0.08);
  border: 1px solid rgba(238, 77, 45, 0.25);
  color: #ee4d2d;
  margin-left: 0.25rem;
  transition: background 0.4s var(--ease-out), border-color 0.4s var(--ease-out);
}

.shopee-link:hover {
  background: rgba(238, 77, 45, 0.14);
  border-color: rgba(238, 77, 45, 0.4);
}

.shopee-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: #ee4d2d;
  color: #fff;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 12px;
  line-height: 1;
}

.cta-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  transition: all 0.5s var(--ease-out);
}

.cta:hover .cta-icon {
  background: rgba(255, 255, 255, 0.22);
  transform: translate(2px, -2px) scale(1.05);
}

.cta-icon svg {
  width: 12px;
  height: 12px;
}

.burger {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: 999px;
  position: relative;
}

.burger span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 16px;
  height: 1.5px;
  background: var(--c-ink);
  border-radius: 2px;
  transform-origin: center;
  transition: transform 0.5s var(--ease-out);
}

.burger span:nth-child(1) { transform: translate(-50%, -4px); }
.burger span:nth-child(2) { transform: translate(-50%, 3px); }

.is-open .burger span:nth-child(1) { transform: translate(-50%, 0) rotate(45deg); }
.is-open .burger span:nth-child(2) { transform: translate(-50%, 0) rotate(-45deg); }

.mobile-panel {
  display: none;
}

@media (max-width: 880px) {
  .links, .nav-inner > .cta, .nav-inner > .shopee-link { display: none; }
  .burger { display: inline-flex; align-items: center; justify-content: center; }

  .mobile-panel {
    pointer-events: auto;
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 1rem;
    right: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 0.5rem;
    background: rgba(245, 245, 243, 0.96);
    backdrop-filter: blur(20px);
    border: 1px solid var(--hairline);
    border-radius: 1.25rem;
    box-shadow: 0 24px 60px -20px rgba(14, 14, 15, 0.25);
  }

  .mobile-panel button,
  .mobile-panel .cta,
  .mobile-panel .shopee-mobile {
    width: 100%;
    text-align: left;
    padding: 0.85rem 1rem;
    border-radius: 0.85rem;
    font-size: 15px;
  }

  .mobile-panel .cta {
    justify-content: flex-start;
    gap: 0.7rem;
    margin-top: 0.5rem;
  }

  .mobile-panel .cta.wa-cta {
    padding: 0.6rem 0.85rem 0.6rem 0.55rem;
  }

  .mobile-panel .cta.wa-cta .wa-icon {
    width: 34px;
    height: 34px;
  }

  .mobile-panel .cta.wa-cta .wa-icon svg { width: 16px; height: 16px; }

  .mobile-panel .cta.wa-cta .wa-text {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.15rem;
    line-height: 1.05;
  }

  .mobile-panel .wa-badge {
    font-size: 9.5px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.18rem 0.45rem;
  }

  .shopee-mobile {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    color: #c43d20;
    background: rgba(238, 77, 45, 0.06);
    border: 1px solid rgba(238, 77, 45, 0.22);
    font-size: 13px;
    margin-top: 0.15rem;
  }

  .shopee-mobile:hover {
    background: rgba(238, 77, 45, 0.1);
  }
}

@media (max-width: 640px) {
  .nav {
    top: 0.75rem;
    padding: 0 0.75rem;
  }

  .nav-inner {
    padding: 0.3rem 0.3rem 0.3rem 0.75rem;
    gap: 0.4rem;
  }

  .brand {
    padding-right: 0.55rem;
    gap: 0.45rem;
  }

  .brand img {
    width: 24px;
    height: 24px;
    border-radius: 6px;
  }

  .brand-text {
    font-size: 12.5px;
    gap: 0.2rem;
  }

  .brand-text em {
    font-size: 11.5px;
  }

  .burger {
    width: 34px;
    height: 34px;
  }

  .mobile-panel {
    left: 0.75rem;
    right: 0.75rem;
  }

  .mobile-panel button,
  .mobile-panel .cta {
    font-size: 13.5px;
    padding: 0.7rem 0.85rem;
  }
}
</style>
