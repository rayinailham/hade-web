<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoUrl from '../../docs/hade-logo.jpg'
import { waLink, SHOPEE_STORE, WA_DISPLAY, DISCOUNT_PERCENT } from '../composables/useContact'
import { getLenis } from '../composables/useLenis'

const sectionRef = ref<HTMLElement | null>(null)
const cta = ref<HTMLElement | null>(null)
const logo = ref<HTMLElement | null>(null)
const card = ref<HTMLElement | null>(null)

const waUrl = waLink(
  'Halo Hade, saya mau cek penawaran adapter lensa via WhatsApp (discount 10% + gratis ongkir). Boleh dibantu rekomendasinya?',
)

let setCtaX: ((v: number) => void) | null = null
let setCtaY: ((v: number) => void) | null = null
let setLogoX: ((v: number) => void) | null = null
let setLogoY: ((v: number) => void) | null = null

function magneticFor(
  el: HTMLElement | null,
  e: MouseEvent,
  radius: number,
  strengthMax: number,
) {
  if (!el) return { x: 0, y: 0 }
  const r = el.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.hypot(dx, dy) || 1
  if (dist < radius) {
    const k = (1 - dist / radius) * strengthMax
    return { x: (dx / dist) * k, y: (dy / dist) * k }
  }
  return { x: 0, y: 0 }
}

function onMove(e: MouseEvent) {
  const c = magneticFor(cta.value, e, 220, 12)
  setCtaX?.(c.x)
  setCtaY?.(c.y)

  const l = magneticFor(logo.value, e, 170, 6)
  setLogoX?.(l.x)
  setLogoY?.(l.y)

  // spotlight follow on action card
  const k = card.value
  if (k) {
    const r = k.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    if (x > -10 && x < 110 && y > -10 && y < 110) {
      k.style.setProperty('--mx', `${x}%`)
      k.style.setProperty('--my', `${y}%`)
    }
  }
}

onMounted(() => {
  setCtaX = gsap.quickTo(cta.value, 'x', { duration: 0.55, ease: 'power3.out' })
  setCtaY = gsap.quickTo(cta.value, 'y', { duration: 0.55, ease: 'power3.out' })
  setLogoX = gsap.quickTo(logo.value, 'x', { duration: 0.7, ease: 'power3.out' })
  setLogoY = gsap.quickTo(logo.value, 'y', { duration: 0.7, ease: 'power3.out' })
  window.addEventListener('mousemove', onMove)

  // ============================================
  // Scroll snap — pull top of CTA section to top
  // of viewport when user lingers near it.
  // Disabled if user prefers reduced motion.
  // ============================================
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let snapTimer: number | null = null
  let lastSnapAt = 0
  const SNAP_RANGE = 320
  const SETTLE_MS = 140
  const COOLDOWN_MS = 1200

  const cancelTimer = () => {
    if (snapTimer !== null) {
      window.clearTimeout(snapTimer)
      snapTimer = null
    }
  }

  const armSnap = () => {
    cancelTimer()
    snapTimer = window.setTimeout(() => {
      const el = sectionRef.value
      if (!el) return
      const top = el.getBoundingClientRect().top
      const dist = Math.abs(top)
      const now = performance.now()
      if (dist <= SNAP_RANGE && dist > 1 && now - lastSnapAt > COOLDOWN_MS) {
        lastSnapAt = now
        const lenis = getLenis()
        if (lenis) {
          lenis.scrollTo(el, { duration: 1.05, lock: true, easing: (t) => 1 - Math.pow(1 - t, 3) })
        } else {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }, SETTLE_MS)
  }

  const onWheel = () => armSnap()
  const onTouch = () => armSnap()

  if (!reduced) {
    window.addEventListener('wheel', onWheel, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
  }

  ScrollTrigger.refresh()

  onBeforeUnmount(() => {
    if (!reduced) {
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchmove', onTouch)
    }
    cancelTimer()
  })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
})
</script>

<template>
  <section ref="sectionRef" class="cta-section">
    <!-- ambient layers -->
    <div class="hairline-grid" aria-hidden="true"></div>
    <div class="glow glow-a" aria-hidden="true"></div>
    <div class="glow glow-b" aria-hidden="true"></div>
    <div class="noise" aria-hidden="true"></div>

    <div class="container">
      <div class="cta-stage" data-reveal>
        <!-- LEFT — editorial copy column -->
        <div class="copy-col">
          <div class="copy-head">
            <a
              ref="logo"
              class="logo-magnet"
              :href="waUrl"
              target="_blank"
              rel="noreferrer"
              aria-label="Pesan via WhatsApp Hade"
            >
              <img
                class="logo-img"
                :src="logoUrl"
                alt="Hade"
                width="120"
                height="120"
                draggable="false"
              />
              <span class="logo-ring" aria-hidden="true"></span>
            </a>
            <span class="eyebrow inverse">
              <span class="mono">mulai sekarang</span>
            </span>
          </div>

          <h2 class="title">
            <span class="line">Pasangkan lensa</span>
            <span class="line italic">favoritmu&nbsp;—</span>
            <span class="line">hemat <span class="num mono">{{ DISCOUNT_PERCENT }}%</span>.</span>
          </h2>

          <p class="lede">
            Order langsung via WhatsApp ke admin Hade. Dapatkan
            <strong>diskon {{ DISCOUNT_PERCENT }}% dari harga Shopee</strong>
            plus <strong>gratis ongkir</strong> ke seluruh Indonesia. Tetap aman, dikirim langsung
            dari Sukabumi.
          </p>

          <ul class="benefits">
            <li><span class="b-tick" aria-hidden="true"></span>QC 2 hari sebelum kirim</li>
            <li><span class="b-tick" aria-hidden="true"></span>Gratis ongkir nasional</li>
            <li><span class="b-tick" aria-hidden="true"></span>Universal — semua HP</li>
          </ul>
        </div>

        <!-- RIGHT — action card (double-bezel) -->
        <aside ref="card" class="action-card">
          <div class="action-shell">
            <div class="action-core">
              <header class="action-head">
                <span class="hp mono">{{ WA_DISPLAY }}</span>
                <span class="status">
                  <span class="status-dot" aria-hidden="true"></span>
                  <span class="mono">online</span>
                </span>
              </header>

              <a
                ref="cta"
                class="wa-cta"
                :href="waUrl"
                target="_blank"
                rel="noreferrer"
              >
                <span class="wa-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
                  </svg>
                </span>
                <span class="wa-copy">
                  <span class="wa-line">Pesan via WhatsApp</span>
                  <span class="wa-sub mono">discount {{ DISCOUNT_PERCENT }}% &middot; gratis ongkir</span>
                </span>
                <span class="btn-icon" aria-hidden="true">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </span>
              </a>

              <div class="divider" aria-hidden="true"></div>

              <a
                class="shopee-link"
                :href="SHOPEE_STORE"
                target="_blank"
                rel="noreferrer"
              >
                <span class="shopee-mark" aria-hidden="true">S</span>
                <span class="shopee-copy">
                  <span class="shopee-eyebrow mono">harga publik</span>
                  <span class="shopee-text">Lihat di Shopee&nbsp;<span class="arrow">→</span></span>
                </span>
              </a>
            </div>
          </div>

          <span class="card-spotlight" aria-hidden="true"></span>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ============================================
   INVERSE SECTION — dark canvas, editorial split
   ============================================ */
.cta-section {
  position: relative;
  min-height: 100dvh;
  padding: clamp(4rem, 9vh, 7rem) 0 clamp(3.5rem, 7vh, 5.5rem);
  background: var(--c-ink);
  color: var(--c-paper);
  border-top: 1px solid rgba(245, 245, 243, 0.08);
  overflow: hidden;
  isolation: isolate;
  display: flex;
  align-items: center;
}

/* skewed grid — same family as hero, opposite tilt */
.hairline-grid {
  position: absolute;
  inset: -20% -10% -10% -10%;
  background-image:
    linear-gradient(to right, rgba(245, 245, 243, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(245, 245, 243, 0.05) 1px, transparent 1px);
  background-size: 72px 72px;
  transform: skewY(8deg) skewX(2deg);
  transform-origin: 50% 70%;
  -webkit-mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, #000 35%, transparent 80%);
          mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, #000 35%, transparent 80%);
  opacity: 0.95;
  pointer-events: none;
  z-index: 0;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.5;
  will-change: transform;
}

.glow-a {
  top: -12%;
  left: -10%;
  width: 56vw;
  height: 56vw;
  max-width: 720px;
  max-height: 720px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.16), transparent 65%);
  animation: drift-a 22s var(--ease-out) infinite alternate;
}

.glow-b {
  bottom: -22%;
  right: -14%;
  width: 62vw;
  height: 62vw;
  max-width: 800px;
  max-height: 800px;
  background: radial-gradient(circle, rgba(37, 200, 98, 0.16), transparent 65%);
  animation: drift-b 26s var(--ease-out) infinite alternate;
}

@keyframes drift-a {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(4%, 6%, 0) scale(1.08); }
}

@keyframes drift-b {
  0%   { transform: translate3d(0, 0, 0) scale(1); }
  100% { transform: translate3d(-5%, -4%, 0) scale(1.1); }
}

.noise {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  opacity: 0.05;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}

/* ============================================
   STAGE — editorial split (60 / 40)
   ============================================ */
.cta-stage {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: center;
  width: 100%;
}

/* ============================================
   COPY COLUMN — left
   ============================================ */
.copy-col {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.copy-head {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  margin-bottom: 1.6rem;
}

.logo-magnet {
  position: relative;
  display: inline-flex;
  width: 56px;
  height: 56px;
  cursor: pointer;
  will-change: transform;
}

.logo-img {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  user-select: none;
  -webkit-user-drag: none;
  box-shadow:
    0 14px 38px -18px rgba(0, 0, 0, 0.7),
    0 3px 10px -4px rgba(0, 0, 0, 0.5);
  transition: transform 0.6s var(--ease-out), box-shadow 0.6s var(--ease-out);
}

.logo-magnet:hover .logo-img {
  transform: scale(1.04);
  box-shadow:
    0 22px 60px -22px rgba(245, 245, 243, 0.18),
    0 4px 14px -6px rgba(0, 0, 0, 0.5);
}

.logo-ring {
  position: absolute;
  inset: -8px;
  border-radius: 16px;
  border: 1px solid rgba(245, 245, 243, 0.14);
  opacity: 0;
  transform: scale(0.94);
  transition: opacity 0.6s var(--ease-out), transform 0.6s var(--ease-out);
  pointer-events: none;
}

.logo-magnet:hover .logo-ring {
  opacity: 1;
  transform: scale(1);
}

.eyebrow.inverse {
  background: rgba(245, 245, 243, 0.05);
  border: 1px solid rgba(245, 245, 243, 0.14);
  color: rgba(245, 245, 243, 0.78);
  backdrop-filter: blur(6px);
}

.eyebrow.inverse::before {
  background: var(--c-paper);
}

.title {
  margin: 0 0 1.4rem;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2.2rem, 5.6vw, 4.8rem);
  line-height: 0.94;
  letter-spacing: -0.05em;
  color: var(--c-paper);
  display: flex;
  flex-direction: column;
  text-wrap: balance;
}

.title .line {
  display: block;
}

.title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: rgba(245, 245, 243, 0.7);
  letter-spacing: -0.055em;
  padding-left: 0.18em;
}

.title .num {
  font-feature-settings: 'tnum';
  letter-spacing: -0.02em;
  font-weight: 500;
  color: var(--c-paper);
}

.lede {
  max-width: 48ch;
  font-size: 15px;
  line-height: 1.6;
  color: rgba(245, 245, 243, 0.62);
  margin: 0 0 1.6rem;
}

.lede strong {
  color: rgba(245, 245, 243, 0.95);
  font-weight: 500;
}

.benefits {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  font-size: 13.5px;
  color: rgba(245, 245, 243, 0.78);
  letter-spacing: -0.005em;
}

.benefits li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.b-tick {
  position: relative;
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: rgba(37, 200, 98, 0.14);
  border: 1px solid rgba(37, 200, 98, 0.45);
}

.b-tick::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 5px;
  width: 4px;
  height: 6px;
  border-right: 1.5px solid rgba(140, 240, 180, 0.95);
  border-bottom: 1.5px solid rgba(140, 240, 180, 0.95);
  transform: rotate(40deg);
}

/* ============================================
   ACTION CARD — right column, double-bezel
   ============================================ */
.action-card {
  position: relative;
  width: 100%;
  isolation: isolate;
}

/* outer shell — machined hardware tray */
.action-shell {
  position: relative;
  padding: 6px;
  border-radius: 28px;
  background:
    linear-gradient(180deg, rgba(245, 245, 243, 0.06), rgba(245, 245, 243, 0.02));
  border: 1px solid rgba(245, 245, 243, 0.08);
  box-shadow:
    0 30px 80px -30px rgba(0, 0, 0, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

/* inner core — content surface */
.action-core {
  position: relative;
  padding: 1.4rem 1.4rem 1.3rem;
  border-radius: calc(28px - 6px);
  background:
    radial-gradient(120% 80% at 0% 0%, rgba(255, 255, 255, 0.04), transparent 55%),
    rgba(20, 20, 22, 0.7);
  border: 1px solid rgba(245, 245, 243, 0.05);
  backdrop-filter: blur(20px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  overflow: hidden;
}

.action-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgba(245, 245, 243, 0.06);
}

.hp {
  font-size: 12.5px;
  letter-spacing: 0;
  color: rgba(245, 245, 243, 0.85);
  font-feature-settings: 'tnum';
}

.status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(140, 240, 180, 0.85);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(64, 220, 130);
  box-shadow: 0 0 0 0 rgba(64, 220, 130, 0.6);
  animation: status-pulse 2.2s var(--ease-out) infinite;
}

@keyframes status-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(64, 220, 130, 0.55);
    opacity: 1;
  }
  60% {
    box-shadow: 0 0 0 6px rgba(64, 220, 130, 0);
    opacity: 0.55;
  }
}

/* WA primary CTA — full-width, embedded inside card */
.wa-cta {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.7rem 0.7rem 0.75rem;
  border-radius: 999px;
  background: linear-gradient(140deg, #25c862 0%, #15a04f 55%, #0d6e3a 100%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.32),
    0 18px 50px -16px rgba(20, 160, 80, 0.55);
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.55s var(--ease-out), box-shadow 0.55s var(--ease-out);
  will-change: transform;
}

.wa-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.28) 50%, transparent 70%);
  transform: translateX(-110%);
  transition: transform 1.2s var(--ease-out);
  pointer-events: none;
  z-index: 1;
}

.wa-cta:hover {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.36),
    0 24px 60px -18px rgba(20, 160, 80, 0.78);
}

.wa-cta:hover::before {
  transform: translateX(110%);
}

.wa-cta:active {
  transform: scale(0.985) translateY(1px);
}

.wa-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  flex-shrink: 0;
}

.wa-icon svg { width: 19px; height: 19px; }

.wa-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1;
  gap: 0.22rem;
  position: relative;
  z-index: 2;
  flex: 1;
}

.wa-line {
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.015em;
}

.wa-sub {
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.btn-icon {
  position: relative;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  flex-shrink: 0;
  transition: background 0.5s var(--ease-out), transform 0.5s var(--ease-out);
}

.wa-cta:hover .btn-icon {
  background: rgba(255, 255, 255, 0.32);
  transform: translate(2px, -2px);
}

.btn-icon svg { width: 13px; height: 13px; }

/* divider line */
.divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(245, 245, 243, 0.1), transparent);
  margin: 1rem 0 0.85rem;
}

/* shopee — quiet text link, not pill */
.shopee-link {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.35rem 0.2rem;
  color: rgba(245, 245, 243, 0.62);
  transition: color 0.4s var(--ease-out);
}

.shopee-link:hover {
  color: rgba(245, 245, 243, 0.95);
}

.shopee-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: #ee4d2d;
  color: #fff;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 12.5px;
  line-height: 1;
  flex-shrink: 0;
}

.shopee-copy {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  line-height: 1.2;
}

.shopee-eyebrow {
  font-size: 9.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.4);
}

.shopee-text {
  font-size: 13px;
  letter-spacing: -0.005em;
}

.shopee-text .arrow {
  display: inline-block;
  transition: transform 0.5s var(--ease-out);
}

.shopee-link:hover .shopee-text .arrow {
  transform: translateX(3px);
}

/* spotlight border under cursor */
.card-spotlight {
  position: absolute;
  inset: -1px;
  border-radius: 28px;
  pointer-events: none;
  background:
    radial-gradient(220px 220px at var(--mx, 50%) var(--my, 50%),
      rgba(140, 240, 180, 0.18),
      transparent 60%);
  opacity: 0;
  transition: opacity 0.6s var(--ease-out);
  z-index: 3;
  mix-blend-mode: screen;
}

.action-card:hover .card-spotlight {
  opacity: 1;
}

/* ============================================
   RESPONSIVE — collapse split below md
   ============================================ */
@media (max-width: 960px) {
  .cta-stage {
    grid-template-columns: 1fr;
    gap: 2.25rem;
  }

  .copy-col {
    align-items: flex-start;
  }

  .action-card {
    max-width: 520px;
  }
}

@media (max-width: 640px) {
  .cta-section {
    padding: clamp(3.5rem, 8vh, 5rem) 0 clamp(3rem, 7vh, 4.5rem);
  }

  .copy-head {
    gap: 0.75rem;
    margin-bottom: 1.25rem;
  }

  .logo-magnet {
    width: 48px;
    height: 48px;
  }

  .title {
    font-size: clamp(2.1rem, 9vw, 2.8rem);
    line-height: 0.96;
    letter-spacing: -0.04em;
    margin-bottom: 1.1rem;
  }

  .lede {
    font-size: 14px;
    line-height: 1.6;
    margin-bottom: 1.4rem;
  }

  .benefits {
    font-size: 13px;
    gap: 0.5rem;
  }

  .action-shell {
    padding: 5px;
    border-radius: 22px;
  }

  .action-core {
    padding: 1.1rem 1.1rem 1rem;
    border-radius: calc(22px - 5px);
  }

  .action-head {
    margin-bottom: 0.85rem;
    padding-bottom: 0.75rem;
  }

  .hp { font-size: 12px; }
  .status { font-size: 9.5px; }

  .wa-cta {
    padding: 0.55rem 0.55rem 0.55rem 0.6rem;
    gap: 0.6rem;
  }

  .wa-icon {
    width: 34px;
    height: 34px;
  }

  .wa-icon svg { width: 17px; height: 17px; }

  .wa-line { font-size: 13.5px; }
  .wa-sub { font-size: 9.5px; letter-spacing: 0.16em; }

  .btn-icon {
    width: 28px;
    height: 28px;
  }

  .card-spotlight {
    display: none;
  }
}
</style>
