<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  waLink,
  WA_DISPLAY,
  DISCOUNT_PERCENT,
  SHOPEE_STORE,
} from '../composables/useContact'

gsap.registerPlugin(ScrollTrigger)

const root = ref<HTMLElement | null>(null)
const primaryBtn = ref<HTMLElement | null>(null)
const primaryInner = ref<HTMLElement | null>(null)
const waUrl = computed(() => waLink())

let ctx: gsap.Context | null = null

const perks = [
  { k: 'wa', label: `diskon ${DISCOUNT_PERCENT}% via wa` },
  { k: 'shp', label: 'gratis ongkir se-indonesia' },
  { k: 'qc', label: 'dirakit ulang sebelum dikirim' },
  { k: 'gar', label: 'garansi 1 bulan' },
]

const head1 = ['HP', 'biasa,']
const head2 = ['Hasil', 'rasa', 'DSLR.']

onMounted(() => {
  if (!root.value) return

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  ctx = gsap.context(() => {
    if (!reduce) {
      const words = root.value!.querySelectorAll<HTMLElement>('.scrub-word')
      gsap.fromTo(
        words,
        { opacity: 0.12, filter: 'blur(8px)', y: 24 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          ease: 'none',
          stagger: 0.08,
          scrollTrigger: {
            trigger: root.value,
            start: 'top 78%',
            end: 'top 30%',
            scrub: 0.6,
          },
        },
      )

      const perkEls = root.value!.querySelectorAll<HTMLElement>('.perk')
      gsap.fromTo(
        perkEls,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: root.value, start: 'top 70%' },
        },
      )

      // magnetic primary CTA
      if (primaryBtn.value && primaryInner.value) {
        const btn = primaryBtn.value
        const xTo = gsap.quickTo(btn, 'x', { duration: 0.55, ease: 'power3.out' })
        const yTo = gsap.quickTo(btn, 'y', { duration: 0.55, ease: 'power3.out' })
        const ixTo = gsap.quickTo(primaryInner.value, 'x', {
          duration: 0.55,
          ease: 'power3.out',
        })
        const iyTo = gsap.quickTo(primaryInner.value, 'y', {
          duration: 0.55,
          ease: 'power3.out',
        })
        const onMove = (e: MouseEvent) => {
          const r = btn.getBoundingClientRect()
          const cx = r.left + r.width / 2
          const cy = r.top + r.height / 2
          const dx = (e.clientX - cx) * 0.22
          const dy = (e.clientY - cy) * 0.32
          xTo(dx)
          yTo(dy)
          ixTo(dx * 1.5)
          iyTo(dy * 1.5)
        }
        const onLeave = () => {
          xTo(0); yTo(0); ixTo(0); iyTo(0)
        }
        btn.addEventListener('mousemove', onMove)
        btn.addEventListener('mouseleave', onLeave)
        ;(btn as HTMLElement & { __cleanup?: () => void }).__cleanup = () => {
          btn.removeEventListener('mousemove', onMove)
          btn.removeEventListener('mouseleave', onLeave)
        }
      }
    }
  }, root.value)
})

onBeforeUnmount(() => {
  if (primaryBtn.value) {
    const c = (primaryBtn.value as HTMLElement & { __cleanup?: () => void }).__cleanup
    if (c) c()
  }
  ctx?.revert()
})
</script>

<template>
  <section ref="root" class="cta" aria-label="Final call to action">
    <div class="container cta-grid">
      <div class="left">
        <div class="eyebrow eyebrow-dark">
          <span class="mono">online · balas chat hitungan menit</span>
        </div>

        <h2 class="head">
          <span class="line">
            <span v-for="(w, i) in head1" :key="`h1-${i}`" class="scrub-word grotesk">{{ w }}<span class="sp">&nbsp;</span></span>
          </span>
          <span class="line">
            <span v-for="(w, i) in head2" :key="`h2-${i}`" class="scrub-word display italic">{{ w }}<span class="sp">&nbsp;</span></span>
          </span>
        </h2>

        <p class="kicker">
          Pasang ke HP-mu, jepret seperti pakai lensa tele.
          Pesan via WhatsApp untuk diskon {{ DISCOUNT_PERCENT }}% plus gratis ongkir,
          atau ambil di Shopee kalau lebih nyaman.
        </p>

        <div class="ctas">
          <a
            ref="primaryBtn"
            class="btn primary"
            :href="waUrl"
            target="_blank"
            rel="noreferrer"
          >
            <span class="wa-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
              </svg>
            </span>
            <span class="btn-label">Pesan via WhatsApp</span>
            <span ref="primaryInner" class="btn-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 13L13 3M6.5 3H13v6.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>

          <a class="btn ghost" :href="SHOPEE_STORE" target="_blank" rel="noreferrer">
            <span class="btn-label">Lihat di Shopee</span>
            <span class="btn-arrow ghost-arrow" aria-hidden="true">
              <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 13L13 3M6.5 3H13v6.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </a>
        </div>

        <ul class="perks" aria-label="Penawaran">
          <li v-for="p in perks" :key="p.k" class="perk mono">{{ p.label }}</li>
        </ul>
      </div>

      <aside class="side" aria-hidden="true">
        <div class="side-card">
          <header class="side-head">
            <span class="dot" aria-hidden="true"></span>
            <span class="mono side-title">live · whatsapp</span>
          </header>
          <p class="side-handle">{{ WA_DISPLAY }}</p>
          <p class="side-msg">
            “Halo Hade, saya tertarik dengan produk adapter lensa.
            Boleh dibantu pesan via WhatsApp?”
          </p>
          <div class="side-meta mono">
            est. 2017 · Kab. Sukabumi · 230+ unit terkirim
          </div>
        </div>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.cta {
  position: relative;
  background: var(--c-ink);
  color: var(--c-paper);
  padding: clamp(6rem, 14vh, 10rem) 0 clamp(7rem, 16vh, 12rem);
  border-top: 1px solid rgba(245, 245, 243, 0.06);
  overflow: hidden;
  isolation: isolate;
}

/* halftone dot field — fades from edges into center */
.cta::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: radial-gradient(
    circle at center,
    rgba(245, 245, 243, 0.16) 0.6px,
    transparent 1.4px
  );
  background-size: 14px 14px;
  background-position: 0 0;
  opacity: 0.55;
  -webkit-mask-image: radial-gradient(
    ellipse 70% 60% at 50% 55%,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 55%,
    #000 95%
  );
          mask-image: radial-gradient(
    ellipse 70% 60% at 50% 55%,
    transparent 0%,
    rgba(0, 0, 0, 0.35) 55%,
    #000 95%
  );
  mix-blend-mode: screen;
}

/* film grain — fixed-size SVG turbulence, tiled */
.cta::after {
  content: '';
  position: absolute;
  inset: -1px;
  z-index: 1;
  pointer-events: none;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.6 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/></svg>");
  background-size: 220px 220px;
  opacity: 0.07;
  mix-blend-mode: overlay;
}

@media (prefers-reduced-motion: no-preference) {
  .cta::after {
    animation: grainShift 7s steps(6) infinite;
  }
}

@keyframes grainShift {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(-6%, 4%); }
  40%  { transform: translate(4%, -3%); }
  60%  { transform: translate(-3%, -5%); }
  80%  { transform: translate(5%, 3%); }
  100% { transform: translate(0, 0); }
}

.cta-grid {
  display: grid;
  grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
  gap: clamp(2rem, 5vw, 5rem);
  align-items: end;
  position: relative;
  z-index: 2;
}

.left { max-width: 720px; }

.eyebrow-dark {
  background: rgba(245, 245, 243, 0.04);
  border-color: rgba(245, 245, 243, 0.14);
  color: rgba(245, 245, 243, 0.72);
  margin-bottom: 2rem;
}
.eyebrow-dark::before { background: #25c862; box-shadow: 0 0 0 4px rgba(37, 200, 98, 0.18); }

.head {
  margin: 0 0 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.05em;
  font-size: clamp(2.6rem, 7.4vw, 6rem);
  line-height: 0.94;
  letter-spacing: -0.045em;
  color: var(--c-paper);
}
.head .line { display: flex; flex-wrap: wrap; }
.head .grotesk { font-weight: 500; }
.head .display { font-family: var(--font-display); font-weight: 300; font-style: italic; color: rgba(245, 245, 243, 0.68); letter-spacing: -0.04em; }
.scrub-word { display: inline-block; will-change: transform, opacity, filter; }
.scrub-word .sp { display: inline-block; }

.kicker {
  margin: 0 0 2.25rem;
  font-size: clamp(0.95rem, 1.2vw, 1.05rem);
  line-height: 1.55;
  color: rgba(245, 245, 243, 0.62);
  max-width: 52ch;
}

.ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-bottom: 2.4rem;
}

.btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.85rem 0.95rem 0.85rem 1.35rem;
  border-radius: 999px;
  font-size: 14.5px;
  letter-spacing: -0.005em;
  text-decoration: none;
  transition: background 0.6s var(--ease-out), color 0.5s var(--ease-out),
    border-color 0.6s var(--ease-out), transform 0.5s var(--ease-out);
  will-change: transform;
}

.btn .dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #25c862;
  box-shadow: 0 0 0 4px rgba(37, 200, 98, 0.22);
  flex-shrink: 0;
  animation: pulse 2.4s var(--ease-out) infinite;
}

.btn-arrow {
  display: inline-flex; align-items: center; justify-content: center;
  width: 30px; height: 30px;
  border-radius: 999px;
  flex-shrink: 0;
  will-change: transform;
}

.btn.primary {
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  color: #fff;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 0.7rem 0.7rem 0.7rem 0.55rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 18px 40px -16px rgba(18, 140, 74, 0.55);
}
.btn.primary .wa-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
  color: #fff;
}
.btn.primary .wa-mark svg { width: 16px; height: 16px; }
.btn.primary .btn-arrow { background: rgba(255, 255, 255, 0.16); color: #fff; }
.btn.primary:hover {
  background: linear-gradient(140deg, #25c862 0%, #1faa55 60%, #128c4a 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 22px 48px -16px rgba(18, 140, 74, 0.65);
}
.btn.primary:active { transform: scale(0.985); }

.btn.ghost {
  color: var(--c-paper);
  border: 1px solid rgba(245, 245, 243, 0.18);
  padding-left: 1.25rem;
}
.btn.ghost:hover { border-color: rgba(245, 245, 243, 0.4); }
.btn.ghost .ghost-arrow { background: rgba(245, 245, 243, 0.06); color: var(--c-paper); }
.btn.ghost:hover .ghost-arrow { background: rgba(245, 245, 243, 0.14); }

.perks {
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-wrap: wrap; gap: 0.5rem;
}
.perk {
  display: inline-flex; align-items: center;
  padding: 0.4rem 0.7rem;
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.55);
  border: 1px solid rgba(245, 245, 243, 0.12);
  border-radius: 999px;
  white-space: nowrap;
  background: rgba(245, 245, 243, 0.03);
}

/* side panel */
.side {
  display: flex; justify-content: flex-end; align-items: end;
  padding-bottom: 0.4rem;
}
.side-card {
  width: 100%; max-width: 380px;
  padding: 1.4rem 1.4rem 1.25rem;
  background: rgba(245, 245, 243, 0.03);
  border: 1px solid rgba(245, 245, 243, 0.1);
  border-radius: 22px;
  backdrop-filter: blur(8px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
  display: flex; flex-direction: column; gap: 0.85rem;
}
.side-head { display: flex; align-items: center; gap: 0.6rem; }
.side-head .dot { width: 8px; height: 8px; border-radius: 50%; background: #25c862; box-shadow: 0 0 0 4px rgba(37, 200, 98, 0.2); animation: pulse 2.4s var(--ease-out) infinite; }
.side-title { font-size: 10.5px; letter-spacing: 0.22em; text-transform: uppercase; color: rgba(245, 245, 243, 0.5); }
.side-handle { margin: 0; font-size: 14px; font-weight: 500; color: rgba(245, 245, 243, 0.92); }
.side-msg {
  margin: 0;
  font-family: var(--font-display); font-style: italic; font-weight: 400;
  font-size: 1.02rem; line-height: 1.4; letter-spacing: -0.012em;
  color: rgba(245, 245, 243, 0.78);
}
.side-meta {
  font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase;
  color: rgba(245, 245, 243, 0.4);
  border-top: 1px solid rgba(245, 245, 243, 0.08);
  padding-top: 0.85rem;
}

.megatype {
  position: absolute;
  bottom: -0.25em;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(9rem, 28vw, 26rem);
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 245, 243, 0.06);
  letter-spacing: -0.05em;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
}

@media (max-width: 960px) {
  .cta-grid { grid-template-columns: 1fr; gap: 2.5rem; }
  .side { justify-content: flex-start; }
  .side-card { max-width: 100%; }
}

@media (max-width: 640px) {
  .cta {
    padding: clamp(4rem, 9vh, 6rem) 0 clamp(5rem, 12vh, 8rem);
  }
  .head {
    font-size: clamp(2.2rem, 11vw, 3.4rem);
    line-height: 0.98;
    margin-bottom: 1.1rem;
  }
  .eyebrow-dark { margin-bottom: 1.4rem; }
  .kicker { margin-bottom: 1.6rem; font-size: 0.92rem; }
  .ctas { gap: 0.6rem; margin-bottom: 1.6rem; }
  .btn { font-size: 13.5px; padding: 0.75rem 0.85rem 0.75rem 1.2rem; }
  .btn-arrow { width: 26px; height: 26px; }
  .perk { font-size: 9.5px; padding: 0.32rem 0.6rem; letter-spacing: 0.13em; }
  .side-card { padding: 1.1rem 1.1rem 1rem; border-radius: 16px; }
  .side-msg { font-size: 0.92rem; }
  .megatype { font-size: 32vw; }
}
</style>
