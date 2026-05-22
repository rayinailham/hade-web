<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { waLink } from '../composables/useContact'

gsap.registerPlugin(ScrollTrigger)

const waUrl = waLink()

const navRoot = ref<HTMLElement | null>(null)
const shell = ref<HTMLElement | null>(null)
const condensed = ref(false)
const open = ref(false)

let ctx: gsap.Context | null = null
let st: ScrollTrigger | null = null

const links = [
  { href: '#manifesto', label: 'Manifesto' },
  { href: '#products', label: 'Produk' },
  { href: '#compatibility', label: 'Kompatibilitas' },
  { href: '#videos', label: 'Galeri' },
]

onMounted(() => {
  ctx = gsap.context(() => {
    // Initial entrance — fade in nav after hero headline starts
    gsap.fromTo(
      navRoot.value,
      { y: -16, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
      },
    )

    // Toggle condensed pill on scroll
    st = ScrollTrigger.create({
      start: 60,
      end: 99999,
      onEnter: () => (condensed.value = true),
      onLeaveBack: () => (condensed.value = false),
    })
  }, navRoot.value!)
})

onBeforeUnmount(() => {
  st?.kill()
  ctx?.revert()
})

function go(href: string, e: MouseEvent) {
  e.preventDefault()
  open.value = false
  const el = document.querySelector(href) as HTMLElement | null
  if (!el) return
  const lenis = (window as unknown as { lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).lenis
  if (lenis) {
    lenis.scrollTo(el, { offset: -24, duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>

<template>
  <header
    ref="navRoot"
    class="site-nav"
    :class="{ 'is-condensed': condensed, 'is-open': open }"
    aria-label="Navigasi utama"
  >
    <div ref="shell" class="nav-shell">
      <a class="brand" href="#top" @click="(e) => go('#top', e)" aria-label="hade — beranda">
        <span class="brand-mark" aria-hidden="true">
          <img src="/hade-logo.jpg" alt="" width="28" height="28" decoding="async" />
        </span>
        <span class="brand-word">hade</span>
        <span class="brand-dot mono">/ creative</span>
      </a>

      <nav class="nav-links" aria-label="Bagian halaman">
        <a
          v-for="(l, i) in links"
          :key="l.href"
          :href="l.href"
          class="nav-link"
          :style="{ '--i': i }"
          @click="(e) => go(l.href, e)"
        >
          <span class="nav-link-num mono">0{{ i + 1 }}</span>
          <span class="nav-link-label">{{ l.label }}</span>
        </a>
      </nav>

      <a class="nav-cta" :href="waUrl" target="_blank" rel="noreferrer">
        <span class="nav-cta-dot" aria-hidden="true"></span>
        <span class="nav-cta-label">Pesan</span>
        <span class="nav-cta-arrow" aria-hidden="true">
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
      </a>

      <button
        class="nav-burger"
        type="button"
        :aria-expanded="open"
        aria-controls="nav-mobile"
        aria-label="Buka menu"
        @click="open = !open"
      >
        <span></span>
        <span></span>
      </button>
    </div>

    <div id="nav-mobile" class="nav-mobile" :hidden="!open">
      <a
        v-for="l in links"
        :key="l.href"
        :href="l.href"
        class="nav-mobile-link"
        @click="(e) => go(l.href, e)"
      >
        {{ l.label }}
      </a>
      <a class="nav-mobile-cta" :href="waUrl" target="_blank" rel="noreferrer">
        Pesan via WhatsApp
      </a>
    </div>
  </header>
</template>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  display: flex;
  justify-content: center;
  pointer-events: none;
  padding: clamp(1rem, 2.4vh, 1.5rem) var(--gutter);
  transition: padding 0.6s var(--ease-out);
}

.nav-shell {
  pointer-events: auto;
  width: 100%;
  max-width: var(--container);
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: clamp(1rem, 3vw, 2.25rem);
  padding: 0;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  -webkit-backdrop-filter: none;
          backdrop-filter: none;
  box-shadow: none;
  transition:
    max-width 0.7s var(--ease-out),
    padding 0.7s var(--ease-out),
    gap 0.7s var(--ease-out),
    background 0.7s var(--ease-out),
    border-color 0.7s var(--ease-out),
    box-shadow 0.7s var(--ease-out),
    backdrop-filter 0.7s var(--ease-out);
}

/* Condensed: pill with glass + border, tighter spacing */
.site-nav.is-condensed .nav-shell {
  max-width: 880px;
  gap: 0.5rem;
  padding: 0.45rem 0.45rem 0.45rem 1rem;
  background: rgba(255, 255, 255, 0.72);
  border-color: var(--hairline-strong);
  -webkit-backdrop-filter: blur(40px) saturate(1.7);
          backdrop-filter: blur(40px) saturate(1.7);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 1px 0 rgba(14, 14, 15, 0.04),
    0 22px 48px -28px rgba(14, 14, 15, 0.35);
}

.site-nav.is-condensed {
  padding-top: clamp(0.65rem, 1.6vh, 1rem);
}

/* Brand */
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: var(--c-ink);
  letter-spacing: -0.02em;
  transition: opacity 0.5s var(--ease-out);
}

.brand-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  overflow: hidden;
  background: var(--c-ink);
  border: 1px solid var(--hairline-strong);
  flex-shrink: 0;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.brand-word {
  font-weight: 500;
  font-size: 15px;
  line-height: 1;
}

.brand-dot {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  transition: opacity 0.5s var(--ease-out), max-width 0.5s var(--ease-out);
}

.site-nav.is-condensed .brand-dot {
  opacity: 0;
  max-width: 0;
  overflow: hidden;
  margin-left: -0.4rem;
}

/* Links */
.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: clamp(1.4rem, 2.6vw, 2.4rem);
  transition: gap 0.7s var(--ease-out);
}

.site-nav.is-condensed .nav-links {
  gap: 0.15rem;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.5rem 0.25rem;
  font-size: 13.5px;
  letter-spacing: -0.005em;
  color: var(--fg-muted);
  transition: color 0.4s var(--ease-out), padding 0.6s var(--ease-out), background 0.4s var(--ease-out);
  border-radius: 999px;
}

.site-nav.is-condensed .nav-link {
  padding: 0.5rem 0.85rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0.25rem;
  right: 0.25rem;
  bottom: 0.25rem;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.5s var(--ease-out);
}

.site-nav.is-condensed .nav-link::after {
  display: none;
}

.nav-link:hover {
  color: var(--c-ink);
}

.nav-link:hover::after {
  transform: scaleX(1);
}

.site-nav.is-condensed .nav-link:hover {
  background: rgba(14, 14, 15, 0.05);
}

.nav-link-num {
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--fg-subtle);
  transition: opacity 0.5s var(--ease-out), max-width 0.5s var(--ease-out), margin 0.5s var(--ease-out);
}

.site-nav.is-condensed .nav-link-num {
  opacity: 0;
  max-width: 0;
  margin-right: -0.45rem;
  overflow: hidden;
}

.nav-link-label { white-space: nowrap; }

/* CTA */
.nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.55rem 0.55rem 0.95rem;
  border-radius: 999px;
  background: var(--c-ink);
  color: var(--c-paper);
  font-size: 13px;
  letter-spacing: -0.005em;
  border: 1px solid var(--c-ink);
  transition: transform 0.55s var(--ease-out), box-shadow 0.55s var(--ease-out);
}

.nav-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 32px -16px rgba(14, 14, 15, 0.55);
}

.nav-cta-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1faa55;
  box-shadow: 0 0 0 3px rgba(31, 170, 85, 0.25);
  animation: navPulse 2.4s var(--ease-out) infinite;
}

@keyframes navPulse {
  0%, 100% { box-shadow: 0 0 0 3px rgba(31, 170, 85, 0.25); }
  50% { box-shadow: 0 0 0 6px rgba(31, 170, 85, 0); }
}

.nav-cta-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
}

.nav-cta-arrow svg { width: 12px; height: 12px; }

/* Burger (mobile) */
.nav-burger {
  display: none;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  border-radius: 999px;
  border: 1px solid var(--hairline-strong);
  background: rgba(255, 255, 255, 0.6);
  -webkit-backdrop-filter: blur(26px);
          backdrop-filter: blur(26px);
}

.nav-burger span {
  display: block;
  width: 16px;
  height: 1.5px;
  background: var(--c-ink);
  transition: transform 0.4s var(--ease-out);
}

.site-nav.is-open .nav-burger span:first-child {
  transform: translateY(3.25px) rotate(45deg);
}

.site-nav.is-open .nav-burger span:last-child {
  transform: translateY(-3.25px) rotate(-45deg);
}

/* Mobile drawer */
.nav-mobile {
  display: none;
}

@media (max-width: 860px) {
  .nav-shell {
    grid-template-columns: auto 1fr;
  }
  .nav-links { display: none; }
  .nav-cta { display: none; }
  .nav-burger {
    display: inline-flex;
    justify-self: end;
  }

  .site-nav.is-condensed .nav-shell {
    max-width: 100%;
    padding: 0.4rem 0.5rem 0.4rem 0.85rem;
  }

  .site-nav.is-condensed .brand-dot {
    opacity: 1;
    max-width: none;
    overflow: visible;
    margin-left: 0;
  }

  .nav-mobile {
    pointer-events: auto;
    position: absolute;
    top: calc(100% + 0.35rem);
    left: var(--gutter);
    right: var(--gutter);
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    border-radius: 22px;
    border: 1px solid var(--hairline-strong);
    background: rgba(255, 255, 255, 0.78);
    -webkit-backdrop-filter: blur(32px) saturate(1.6);
            backdrop-filter: blur(32px) saturate(1.6);
    box-shadow: 0 28px 56px -28px rgba(14, 14, 15, 0.4);
  }

  .nav-mobile[hidden] { display: none; }

  .nav-mobile-link {
    padding: 0.85rem 1rem;
    font-size: 15px;
    color: var(--c-ink);
    border-radius: 14px;
  }

  .nav-mobile-link:hover { background: rgba(14, 14, 15, 0.05); }

  .nav-mobile-cta {
    margin-top: 0.35rem;
    padding: 0.85rem 1rem;
    background: var(--c-ink);
    color: var(--c-paper);
    border-radius: 14px;
    font-size: 14px;
    text-align: center;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-shell,
  .nav-link,
  .nav-link-num,
  .brand-dot,
  .nav-links { transition: none !important; }
  .nav-cta-dot { animation: none; }
}
</style>
