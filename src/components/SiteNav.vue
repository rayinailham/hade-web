<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getLenis } from '../composables/useLenis'

const open = ref(false)
const scrolled = ref(false)

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

      <a class="cta" href="https://s.shopee.co.id/4AwuG0d1or" target="_blank" rel="noreferrer">
        <span>Beli di Shopee</span>
        <span class="cta-icon" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </a>

      <button class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <span></span>
        <span></span>
      </button>
    </div>

    <div class="mobile-panel" :hidden="!open">
      <button @click="scrollTo('manifesto')">Filosofi</button>
      <button @click="scrollTo('products')">Produk</button>
      <button @click="scrollTo('videos')">Video</button>
      <button @click="scrollTo('compatibility')">Kompatibilitas</button>
      <a class="cta" href="https://s.shopee.co.id/4AwuG0d1or" target="_blank" rel="noreferrer">
        Beli di Shopee
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
  .links, .nav-inner > .cta { display: none; }
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
  .mobile-panel .cta {
    width: 100%;
    text-align: left;
    padding: 0.85rem 1rem;
    border-radius: 0.85rem;
    font-size: 15px;
  }

  .mobile-panel .cta {
    justify-content: center;
    margin-top: 0.25rem;
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
