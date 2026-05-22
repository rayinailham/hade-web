<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { waLink, SHOPEE_STORE, DISCOUNT_PERCENT } from '../composables/useContact'

gsap.registerPlugin(ScrollTrigger)

const waUrl = waLink()

const root = ref<HTMLElement | null>(null)
const headline = ref<HTMLElement | null>(null)

let ctx: gsap.Context | null = null

onMounted(() => {
  ctx = gsap.context(() => {
    // Headline word-by-word reveal
    if (headline.value) {
      const words = headline.value.querySelectorAll<HTMLElement>('[data-word]')
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0, rotate: 6 },
        {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.4,
          stagger: 0.06,
          ease: 'power4.out',
          delay: 0.25,
        },
      )
    }

    // Parallax on hero device + texture
    const device = root.value?.querySelector('.device')
    const grid = root.value?.querySelector('.grid-tex')
    const halftone = root.value?.querySelector('.halftone')

    if (device || grid || halftone) {
      gsap.to(grid as Element, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(halftone as Element, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      gsap.to(device as Element, {
        yPercent: 12,
        scale: 0.94,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }

    // Eyebrow + meta line
    gsap.fromTo(
      '.hero .eyebrow, .hero .lede, .hero .actions, .hero .alt-row, .hero .meta-line',
      { y: 24, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.35,
      },
    )

    // Floating orbit numbers ticking
    gsap.to('.tick', {
      y: -4,
      repeat: -1,
      yoyo: true,
      duration: 2.6,
      ease: 'sine.inOut',
      stagger: 0.4,
    })
  }, root.value!)
})

onBeforeUnmount(() => ctx?.revert())

const headlineWords = ['Lensa', 'profesional.', 'Smartphone', 'kamu.']
</script>

<template>
  <section id="top" ref="root" class="hero">
    <!-- Textures (HERO ONLY) -->
    <div class="grid-tex" aria-hidden="true"></div>
    <div class="halftone" aria-hidden="true"></div>
    <div class="vignette" aria-hidden="true"></div>
    <div class="grain" aria-hidden="true"></div>

    <div class="container hero-grid">
      <div class="left">
        <span class="eyebrow">
          <span class="mono">est. 2017 — sukabumi</span>
        </span>

        <h1 ref="headline" class="headline">
          <span class="line">
            <span v-for="(w, i) in headlineWords.slice(0, 2)" :key="i" class="word-wrap">
              <span data-word>{{ w }}</span>
            </span>
          </span>
          <span class="line italic">
            <span v-for="(w, i) in headlineWords.slice(2)" :key="i" class="word-wrap">
              <span data-word>{{ w }}</span>
            </span>
          </span>
        </h1>

        <p class="lede">
          Adapter presisi yang menghubungkan lensa DSLR dan mirrorless ke
          smartphone. Optik yang sudah kamu kenal — di kamera yang selalu
          ada di sakumu.
        </p>

        <div class="actions">
          <a class="btn-primary wa-cta" :href="waUrl" target="_blank" rel="noreferrer">
            <span class="wa-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
              </svg>
            </span>
            <span class="wa-copy">
              <span class="wa-line">Pesan via WhatsApp</span>
              <span class="wa-sub mono">discount {{ DISCOUNT_PERCENT }}% &middot; gratis ongkir</span>
            </span>
            <span class="btn-icon">
              <svg viewBox="0 0 16 16" fill="none">
                <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
          </a>
          <a class="btn-ghost" href="#products">
            <span>Pelajari produk</span>
            <span class="dot"></span>
          </a>
        </div>

        <div class="alt-row">
          <span class="alt-label mono">atau cek harga di</span>
          <a class="btn-shopee" :href="SHOPEE_STORE" target="_blank" rel="noreferrer">
            <span class="shopee-mark" aria-hidden="true">S</span>
            <span>Shopee</span>
          </a>
        </div>

        <dl class="meta-line">
          <div>
            <dt>Terjual</dt>
            <dd class="mono tick">230+ unit</dd>
          </div>
          <div>
            <dt>Rating rata-rata</dt>
            <dd class="mono tick">4.78 / 5</dd>
          </div>
          <div>
            <dt>Tonton</dt>
            <dd class="mono tick">527K views</dd>
          </div>
        </dl>
      </div>

      <div class="right">
        <div class="device">
          <!-- OLD: pure CSS/HTML device (kept as fallback — re-enable if needed)
          <div class="device-shell">
            <div class="device-core">
              <div class="lens-stack">
                <div class="lens lens-back" aria-hidden="true"></div>
                <div class="lens lens-mid" aria-hidden="true"></div>
                <div class="lens lens-front" aria-hidden="true">
                  <div class="aperture">
                    <span></span><span></span><span></span>
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
              <div class="phone-frame" aria-hidden="true">
                <div class="phone-screen">
                  <div class="reticle">
                    <span class="reticle-h"></span>
                    <span class="reticle-v"></span>
                    <span class="reticle-c"></span>
                  </div>
                  <span class="meta-tag mono">f/1.8 · 1/250 · ISO 400</span>
                  <span class="meta-rec mono">REC ●</span>
                </div>
              </div>
            </div>
          </div>
          -->

          <svg
            class="device-svg"
            viewBox="0 0 300 400"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="dvShell" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="rgba(255,255,255,0.6)" />
                <stop offset="100%" stop-color="rgba(245,245,243,0.4)" />
              </linearGradient>
              <linearGradient id="dvCore" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#f5f5f3" />
                <stop offset="100%" stop-color="#ffffff" />
              </linearGradient>
              <linearGradient id="dvScreen" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#1a1a1c" />
                <stop offset="70%" stop-color="#0a0a0c" />
                <stop offset="100%" stop-color="#1c1b1e" />
              </linearGradient>
              <radialGradient id="dvLensA" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#2a292c" />
                <stop offset="100%" stop-color="#0e0e0f" />
              </radialGradient>
              <radialGradient id="dvLensB" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#1a1a1c" />
                <stop offset="100%" stop-color="#050506" />
              </radialGradient>
              <radialGradient id="dvLensM" cx="30%" cy="25%" r="75%">
                <stop offset="0%" stop-color="#2c2b2e" />
                <stop offset="100%" stop-color="#08080a" />
              </radialGradient>
              <radialGradient id="dvLensF" cx="28%" cy="22%" r="75%">
                <stop offset="0%" stop-color="#4d4c50" />
                <stop offset="100%" stop-color="#0a0a0c" />
              </radialGradient>
              <radialGradient id="dvAp" cx="50%" cy="50%" r="50%">
                <stop offset="30%" stop-color="#050506" />
                <stop offset="100%" stop-color="#1c1b1e" />
              </radialGradient>
              <filter id="dvShadowLens" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="7" />
                <feOffset dx="0" dy="14" />
                <feComponentTransfer><feFuncA type="linear" slope="0.55" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="dvShadowPhone" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="6" />
                <feOffset dx="0" dy="12" />
                <feComponentTransfer><feFuncA type="linear" slope="0.4" /></feComponentTransfer>
                <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <rect x="0.5" y="0.5" width="299" height="399" rx="36" ry="36" fill="url(#dvShell)" stroke="#e5e4e0" stroke-width="1" />
            <rect x="10.5" y="10.5" width="279" height="379" rx="28" ry="28" fill="url(#dvCore)" stroke="#eeeeec" stroke-width="1" />

            <g filter="url(#dvShadowPhone)">
              <rect x="75" y="151" width="150" height="217" rx="24" ry="24" fill="#0e0e0f" />
            </g>
            <rect x="81" y="157" width="138" height="205" rx="18" ry="18" fill="url(#dvScreen)" />

            <rect x="103" y="190" width="94" height="139" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="1" stroke-dasharray="3 3" />
            <line x1="103" y1="259.5" x2="197" y2="259.5" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
            <line x1="150" y1="190" x2="150" y2="329" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
            <circle cx="150" cy="259.5" r="7" fill="none" stroke="rgba(255,255,255,0.45)" stroke-width="1" />

            <text x="89" y="356" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="9.5" fill="rgba(255,255,255,0.65)" letter-spacing="1">f/1.8 · 1/250 · ISO 400</text>
            <text x="211" y="174" text-anchor="end" font-family="'JetBrains Mono', ui-monospace, monospace" font-size="9.5" fill="#dddddd" letter-spacing="1.7">REC ●</text>

            <g filter="url(#dvShadowLens)">
              <circle cx="150" cy="144" r="96" fill="url(#dvLensA)" stroke="#000" stroke-width="1" />
              <circle cx="150" cy="144" r="84" fill="url(#dvLensB)" />
              <circle cx="150" cy="144" r="66" fill="url(#dvLensM)" />
              <circle cx="150" cy="144" r="42" fill="url(#dvLensF)" />
              <circle cx="150" cy="144" r="29" fill="url(#dvAp)" />
              <g stroke="rgba(255,255,255,0.08)" stroke-width="1.5" stroke-linecap="round">
                <line x1="150" y1="144" x2="165" y2="144" />
                <line x1="150" y1="144" x2="165" y2="144" transform="rotate(60 150 144)" />
                <line x1="150" y1="144" x2="165" y2="144" transform="rotate(120 150 144)" />
                <line x1="150" y1="144" x2="165" y2="144" transform="rotate(180 150 144)" />
                <line x1="150" y1="144" x2="165" y2="144" transform="rotate(240 150 144)" />
                <line x1="150" y1="144" x2="165" y2="144" transform="rotate(300 150 144)" />
              </g>
            </g>
          </svg>

          <span class="caption mono">hade · clamp adapter v.2026</span>
        </div>
      </div>
    </div>

    <div class="scroll-cue">
      <span class="mono">scroll</span>
      <span class="line"></span>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100dvh;
  padding: clamp(7rem, 14vh, 9rem) 0 clamp(3rem, 8vh, 5rem);
  overflow: hidden;
  isolation: isolate;
}

/* ==== TEXTURES (HERO ONLY) ==== */

/* Skewed grid */
.grid-tex {
  position: absolute;
  inset: -20% -10% -10% -10%;
  z-index: -3;
  background-image:
    linear-gradient(to right, rgba(14, 14, 15, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(14, 14, 15, 0.07) 1px, transparent 1px);
  background-size: 64px 64px;
  transform: skewY(-8deg) skewX(-2deg);
  transform-origin: 50% 30%;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 40%, #000 35%, transparent 80%);
          mask-image: radial-gradient(ellipse 90% 70% at 50% 40%, #000 35%, transparent 80%);
}

/* Halftone — left lower corner */
.halftone {
  position: absolute;
  left: -10%;
  bottom: -20%;
  width: 65%;
  height: 80%;
  z-index: -2;
  background-image: radial-gradient(circle, rgba(14, 14, 15, 0.55) 1px, transparent 1.6px);
  background-size: 12px 12px;
  -webkit-mask-image: radial-gradient(ellipse 60% 60% at 30% 70%, #000 0%, transparent 70%);
          mask-image: radial-gradient(ellipse 60% 60% at 30% 70%, #000 0%, transparent 70%);
  opacity: 0.35;
  transform: rotate(-12deg);
}

.vignette {
  position: absolute;
  inset: 0;
  z-index: -1;
  background: radial-gradient(ellipse 80% 60% at 50% 0%, transparent 40%, rgba(14, 14, 15, 0.06) 100%);
  pointer-events: none;
}

.grain {
  position: fixed;
  inset: 0;
  z-index: 50;
  pointer-events: none;
  opacity: 0.05;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.7 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

/* ==== LAYOUT ==== */

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  align-items: center;
  gap: clamp(2rem, 5vw, 4rem);
  position: relative;
  z-index: 1;
}

@media (max-width: 900px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}

.eyebrow {
  margin-bottom: 1.75rem;
}

.headline {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2.2rem, 6.2vw, 5rem);
  line-height: 0.94;
  letter-spacing: -0.045em;
  margin: 0 0 1.5rem;
  color: var(--c-ink);
}

.headline .line {
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.4ch;
}

.headline .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  letter-spacing: -0.05em;
  color: var(--c-iron);
}

.word-wrap {
  display: inline-flex;
  overflow: hidden;
  padding: 0 0.04em 0.1em;
  margin: 0 0 -0.05em;
}

.word-wrap > span[data-word] {
  display: inline-block;
  will-change: transform, opacity;
}

.lede {
  max-width: 46ch;
  font-size: clamp(1rem, 1.15vw, 1.125rem);
  line-height: 1.55;
  color: var(--fg-muted);
  margin: 0 0 2rem;
}

.actions {
  display: flex;
  gap: 0.65rem;
  align-items: stretch;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.btn-primary.wa-cta {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.7rem 0.7rem 0.7rem 0.85rem;
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  color: #fff;
  border-radius: 999px;
  font-size: 14.5px;
  letter-spacing: -0.01em;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 14px 36px -14px rgba(18, 140, 74, 0.55);
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.55s var(--ease-out), box-shadow 0.55s var(--ease-out);
}

.btn-primary.wa-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.22) 50%, transparent 70%);
  transform: translateX(-110%);
  transition: transform 1.1s var(--ease-out);
  pointer-events: none;
  z-index: 1;
}

.btn-primary.wa-cta:hover {
  transform: translateY(-2px);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 22px 48px -16px rgba(18, 140, 74, 0.65);
}

.btn-primary.wa-cta:hover::before {
  transform: translateX(110%);
}

.btn-primary.wa-cta:active { transform: scale(0.98); }

.wa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
}

.wa-icon svg { width: 19px; height: 19px; }

.wa-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
  gap: 0.18rem;
  position: relative;
  z-index: 2;
}

.wa-line {
  font-weight: 500;
  font-size: 14.5px;
}

.wa-sub {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.wa-cta .btn-icon {
  position: relative;
  z-index: 2;
  margin-left: 0.15rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 0.85rem 0.85rem 1.4rem;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 999px;
  font-size: 14.5px;
  letter-spacing: -0.01em;
  transition: all 0.55s var(--ease-out);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px -16px rgba(14, 14, 15, 0.55);
}

.btn-primary:active { transform: scale(0.98); }

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  transition: all 0.55s var(--ease-out);
}

.btn-primary:hover .btn-icon {
  background: rgba(255, 255, 255, 0.24);
  transform: translate(2px, -2px) scale(1.06);
}

.btn-icon svg { width: 13px; height: 13px; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.25rem;
  border-radius: 999px;
  border: 1px solid var(--hairline-strong);
  font-size: 14.5px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(8px);
  transition: all 0.55s var(--ease-out);
}

.btn-ghost:hover {
  background: rgba(255, 255, 255, 0.8);
  border-color: var(--c-ink);
  transform: translateY(-1px);
}

.btn-ghost .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-ink);
}

/* Secondary Shopee row — kept understated on purpose */
.alt-row {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 2.25rem;
  flex-wrap: wrap;
}

.alt-label {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

.btn-shopee {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.4rem 0.85rem 0.4rem 0.45rem;
  border-radius: 999px;
  background: rgba(238, 77, 45, 0.06);
  border: 1px solid rgba(238, 77, 45, 0.28);
  color: #c43d20;
  font-size: 12px;
  letter-spacing: -0.005em;
  transition: background 0.4s var(--ease-out), border-color 0.4s var(--ease-out), color 0.4s var(--ease-out);
}

.btn-shopee:hover {
  background: rgba(238, 77, 45, 0.1);
  border-color: rgba(238, 77, 45, 0.45);
  color: #b3361b;
}

.shopee-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: #ee4d2d;
  color: #fff;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 11px;
  line-height: 1;
}

/* meta line */
.meta-line {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid var(--hairline-strong);
  padding-top: 1.25rem;
  margin: 0;
  max-width: 540px;
}

.meta-line > div {
  padding-right: 1rem;
  border-right: 1px solid var(--hairline);
}

.meta-line > div:last-child { border-right: 0; }

.meta-line dt {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: var(--fg-subtle);
  margin-bottom: 0.4rem;
}

.meta-line dd {
  margin: 0;
  font-size: 14px;
  color: var(--c-ink);
  font-weight: 500;
}

/* ==== DEVICE / PHONE + LENS ==== */

.right {
  display: flex;
  justify-content: center;
  position: relative;
}

.device {
  position: relative;
  width: min(440px, 100%);
  aspect-ratio: 3 / 4;
  display: flex;
  align-items: center;
  justify-content: center;
}

.device-shell {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.6), rgba(245, 245, 243, 0.4));
  border: 1px solid var(--hairline-strong);
  border-radius: 36px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.8),
    0 30px 60px -28px rgba(14, 14, 15, 0.35);
  backdrop-filter: blur(14px);
}

.device-core {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--bg-soft), #fff);
  border: 1px solid var(--hairline);
  border-radius: 28px;
  overflow: hidden;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -40px 60px -40px rgba(14, 14, 15, 0.18);
}

/* Lens stacked on top */
.lens-stack {
  position: absolute;
  top: 12%;
  left: 50%;
  transform: translateX(-50%);
  width: 64%;
  aspect-ratio: 1;
  z-index: 3;
}

.lens {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #2a292c, #0e0e0f 70%);
  border: 1px solid #000;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.18),
    0 28px 50px -22px rgba(14, 14, 15, 0.65);
}

.lens-back {
  inset: 6%;
  background: radial-gradient(circle at 35% 30%, #1a1a1c, #050506 70%);
}

.lens-mid {
  inset: 16%;
  background: radial-gradient(circle at 30% 25%, #2c2b2e, #08080a 75%);
}

.lens-front {
  inset: 28%;
  background: radial-gradient(circle at 28% 22%, #4d4c50, #0a0a0c 75%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.aperture {
  position: relative;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(circle, #050506 30%, #1c1b1e 70%);
}

.aperture span {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50%;
  height: 1.5px;
  background: rgba(255, 255, 255, 0.08);
  transform-origin: left center;
}

.aperture span:nth-child(1) { transform: translate(0, -50%) rotate(0deg); }
.aperture span:nth-child(2) { transform: translate(0, -50%) rotate(60deg); }
.aperture span:nth-child(3) { transform: translate(0, -50%) rotate(120deg); }
.aperture span:nth-child(4) { transform: translate(0, -50%) rotate(180deg); }
.aperture span:nth-child(5) { transform: translate(0, -50%) rotate(240deg); }
.aperture span:nth-child(6) { transform: translate(0, -50%) rotate(300deg); }

/* Phone frame behind lens lower */
.phone-frame {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  aspect-ratio: 9 / 13;
  background: var(--c-ink);
  border-radius: 24px;
  padding: 6px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.1),
    0 22px 50px -24px rgba(14, 14, 15, 0.6);
  z-index: 2;
}

.phone-screen {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 18px;
  background:
    linear-gradient(180deg, #1a1a1c, #0a0a0c 70%, #1c1b1e);
  overflow: hidden;
}

.reticle {
  position: absolute;
  inset: 16%;
  border: 1px dashed rgba(255, 255, 255, 0.12);
}

.reticle-h, .reticle-v {
  position: absolute;
  background: rgba(255, 255, 255, 0.18);
}

.reticle-h {
  top: 50%;
  left: 0; right: 0;
  height: 1px;
}

.reticle-v {
  left: 50%;
  top: 0; bottom: 0;
  width: 1px;
}

.reticle-c {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 14px; height: 14px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  border-radius: 50%;
}

.meta-tag {
  position: absolute;
  bottom: 8px;
  left: 8px;
  font-size: 9.5px;
  color: rgba(255, 255, 255, 0.65);
  letter-spacing: 0.1em;
}

.meta-rec {
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 9.5px;
  color: #ddd;
  letter-spacing: 0.18em;
}

.caption {
  position: absolute;
  bottom: -1.75rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  white-space: nowrap;
}

/* scroll cue */
.scroll-cue {
  position: absolute;
  bottom: 1.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  color: var(--fg-subtle);
  font-size: 10px;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  z-index: 1;
}

.scroll-cue .line {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, var(--c-graphite), transparent);
  animation: cue 2.4s var(--ease-out) infinite;
  transform-origin: top;
}

@keyframes cue {
  0% { transform: scaleY(0); opacity: 0; }
  40% { transform: scaleY(1); opacity: 1; }
  100% { transform: scaleY(1) translateY(36px); opacity: 0; }
}

@media (max-width: 640px) {
  .hero {
    min-height: auto;
    padding: clamp(5.5rem, 12vh, 7rem) 0 2.5rem;
  }

  .hero-grid {
    gap: 2rem;
  }

  .eyebrow {
    margin-bottom: 1rem;
  }

  .headline {
    font-size: 1.85rem;
    line-height: 0.98;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
  }

  .lede {
    font-size: 13px;
    line-height: 1.5;
    margin-bottom: 1.5rem;
  }

  .actions {
    gap: 0.5rem;
    margin-bottom: 0.85rem;
  }

  .btn-primary.wa-cta {
    width: 100%;
    justify-content: flex-start;
    padding: 0.55rem 0.6rem 0.55rem 0.6rem;
    gap: 0.6rem;
  }

  .wa-icon {
    width: 32px;
    height: 32px;
  }

  .wa-icon svg { width: 16px; height: 16px; }

  .wa-line { font-size: 13px; }
  .wa-sub { font-size: 9.5px; letter-spacing: 0.14em; }

  .wa-cta .btn-icon {
    margin-left: auto;
  }

  .alt-row {
    margin-bottom: 1.5rem;
    gap: 0.5rem;
  }

  .alt-label {
    font-size: 9.5px;
    letter-spacing: 0.16em;
  }

  .btn-shopee {
    font-size: 11px;
    padding: 0.32rem 0.7rem 0.32rem 0.35rem;
  }

  .shopee-mark {
    width: 16px;
    height: 16px;
    font-size: 10px;
  }

  .btn-primary,
  .btn-ghost {
    font-size: 12.5px;
    padding: 0.7rem 1.05rem;
  }

  .btn-primary:not(.wa-cta) {
    padding-left: 1.15rem;
    padding-right: 0.7rem;
  }

  .btn-icon {
    width: 26px;
    height: 26px;
  }

  .btn-icon svg {
    width: 11px;
    height: 11px;
  }

  .meta-line {
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem 0;
    padding-top: 1rem;
  }

  .meta-line > div {
    padding-right: 0.75rem;
  }

  .meta-line > div:nth-child(2) {
    border-right: 0;
  }

  .meta-line > div:nth-child(3) {
    grid-column: 1 / -1;
    padding-top: 0.75rem;
    border-top: 1px solid var(--hairline);
    border-right: 0;
  }

  .meta-line dt {
    font-size: 10px;
    letter-spacing: 0.14em;
    margin-bottom: 0.25rem;
  }

  .meta-line dd {
    font-size: 12.5px;
  }

  .device {
    width: min(280px, 80%);
  }

  .device-shell {
    border-radius: 26px;
    padding: 7px;
  }

  .device-core {
    border-radius: 20px;
  }

  .caption {
    font-size: 9.5px;
    letter-spacing: 0.14em;
    bottom: -1.4rem;
  }

  .scroll-cue {
    display: none;
  }
}

@media (max-width: 380px) {
  .headline {
    font-size: 1.95rem;
  }
}
</style>
