<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { waLink, SHOPEE_STORE, DISCOUNT_PERCENT } from '../composables/useContact'

const cta = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)
let raf = 0
let target = { x: 0, y: 0 }

const waUrl = waLink(
  'Halo Hade, saya mau cek penawaran adapter lensa via WhatsApp (discount 10% + gratis ongkir). Boleh dibantu rekomendasinya?',
)

function onMove(e: MouseEvent) {
  if (!cta.value) return
  const r = cta.value.getBoundingClientRect()
  const cx = r.left + r.width / 2
  const cy = r.top + r.height / 2
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.hypot(dx, dy)
  const radius = 220
  if (dist < radius) {
    const strength = (1 - dist / radius) * 12
    target = { x: (dx / dist) * strength, y: (dy / dist) * strength }
  } else {
    target = { x: 0, y: 0 }
  }
}

function loop() {
  x.value += (target.x - x.value) * 0.12
  y.value += (target.y - y.value) * 0.12
  raf = requestAnimationFrame(loop)
}

onMounted(() => {
  window.addEventListener('mousemove', onMove)
  raf = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
  cancelAnimationFrame(raf)
})
</script>

<template>
  <section class="cta-section">
    <!-- subtle texture, much lighter than hero -->
    <div class="hairline-grid" aria-hidden="true"></div>

    <div class="container">
      <div class="card-shell" data-reveal>
        <div class="card-core">
          <span class="eyebrow"><span class="mono">mulai sekarang</span></span>

          <h2 class="title">
            <span>Pasangkan lensa</span>
            <span class="italic">favoritmu —</span>
            <span>hemat {{ DISCOUNT_PERCENT }}%.</span>
          </h2>

          <p class="lede">
            Order langsung via WhatsApp ke admin Hade dan dapat diskon
            <strong>{{ DISCOUNT_PERCENT }}% dari harga Shopee</strong>
            plus <strong>gratis ongkir</strong> ke seluruh Indonesia.
            Tetap aman, langsung dari Sukabumi.
          </p>

          <div class="actions">
            <a
              ref="cta"
              class="btn-primary magnetic wa-cta"
              :style="{ transform: `translate(${x}px, ${y}px)` }"
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
              <span class="btn-icon">
                <svg viewBox="0 0 16 16" fill="none">
                  <path d="M5 11l6-6M6 5h5v5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </span>
            </a>

            <a
              class="btn-ghost"
              href="https://www.youtube.com/channel/UCyL2_W6d7BYtlf6pP2sHrvQ"
              target="_blank"
              rel="noreferrer"
            >
              Tonton tutorial
            </a>
          </div>

          <div class="alt-row">
            <span class="alt-label mono">harga publik</span>
            <a class="btn-shopee" :href="SHOPEE_STORE" target="_blank" rel="noreferrer">
              <span class="shopee-mark" aria-hidden="true">S</span>
              <span>Lihat di Shopee</span>
            </a>
          </div>

          <div class="meta">
            <span class="mono">QC 2 hari sebelum kirim</span>
            <span class="dot-sep" aria-hidden="true">·</span>
            <span class="mono">Pengiriman dari Sukabumi</span>
            <span class="dot-sep" aria-hidden="true">·</span>
            <span class="mono">Universal — semua HP</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta-section {
  position: relative;
  padding: clamp(5rem, 10vh, 8rem) 0;
  background: var(--bg-soft);
  border-top: 1px solid var(--hairline);
  overflow: hidden;
}

.hairline-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, var(--hairline) 1px, transparent 1px);
  background-size: 96px 100%;
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, transparent 80%);
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, transparent 80%);
  opacity: 0.5;
  pointer-events: none;
}

.card-shell {
  position: relative;
  padding: 8px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3));
  border: 1px solid var(--hairline-strong);
  border-radius: 38px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 30px 80px -32px rgba(14, 14, 15, 0.3);
}

.card-core {
  position: relative;
  background: var(--c-ink);
  color: var(--c-paper);
  border-radius: 30px;
  padding: clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4.5rem);
  overflow: hidden;
}

.card-core::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 80% 0%, rgba(255, 255, 255, 0.08), transparent 60%);
  pointer-events: none;
}

.card-core .eyebrow {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
  color: rgba(245, 245, 243, 0.7);
  margin-bottom: 1.75rem;
}

.card-core .eyebrow::before {
  background: var(--c-paper);
}

.title {
  margin: 0 0 1.5rem;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2.2rem, 5.5vw, 4.4rem);
  line-height: 0.95;
  letter-spacing: -0.045em;
  color: var(--c-paper);
  display: flex;
  flex-direction: column;
}

.title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: rgba(245, 245, 243, 0.7);
  letter-spacing: -0.05em;
}

.lede {
  max-width: 50ch;
  font-size: 15.5px;
  line-height: 1.6;
  color: rgba(245, 245, 243, 0.65);
  margin: 0 0 2.5rem;
}

.actions {
  display: flex;
  gap: 0.6rem;
  flex-wrap: wrap;
  margin-bottom: 2.5rem;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.95rem 0.95rem 0.95rem 1.6rem;
  background: var(--c-paper);
  color: var(--c-ink);
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: -0.015em;
  transition: transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out), background 0.5s var(--ease-out);
  will-change: transform;
}

.btn-primary:hover {
  background: #fff;
  box-shadow: 0 18px 40px -16px rgba(0, 0, 0, 0.5);
}

/* WA primary CTA — green, distinct, prominent */
.btn-primary.wa-cta {
  position: relative;
  padding: 0.7rem 0.7rem 0.7rem 0.85rem;
  gap: 0.7rem;
  background: linear-gradient(140deg, #25c862 0%, #15a04f 55%, #0d6e3a 100%);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 18px 50px -16px rgba(20, 160, 80, 0.65);
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.55s var(--ease-out), box-shadow 0.55s var(--ease-out);
}

.btn-primary.wa-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.28) 50%, transparent 70%);
  transform: translateX(-110%);
  transition: transform 1.2s var(--ease-out);
  pointer-events: none;
  z-index: 1;
}

.btn-primary.wa-cta:hover {
  background: linear-gradient(140deg, #25c862 0%, #15a04f 55%, #0d6e3a 100%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.35),
    0 24px 60px -18px rgba(20, 160, 80, 0.8);
}

.btn-primary.wa-cta:hover::before {
  transform: translateX(110%);
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
  gap: 0.18rem;
  position: relative;
  z-index: 2;
}

.wa-line {
  font-weight: 500;
  font-size: 15px;
}

.wa-sub {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
}

.wa-cta .btn-icon {
  position: relative;
  z-index: 2;
  margin-left: 0.15rem;
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
}

.wa-cta:hover .btn-icon {
  background: rgba(255, 255, 255, 0.28);
}

.btn-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: rgba(14, 14, 15, 0.08);
  transition: all 0.5s var(--ease-out);
}

.btn-primary:hover .btn-icon {
  background: var(--c-ink);
  color: var(--c-paper);
  transform: translate(2px, -2px) scale(1.06);
}

.btn-icon svg { width: 13px; height: 13px; }

.btn-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.95rem 1.5rem;
  border-radius: 999px;
  border: 1px solid rgba(245, 245, 243, 0.18);
  font-size: 15px;
  color: var(--c-paper);
  transition: all 0.5s var(--ease-out);
}

.btn-ghost:hover {
  background: rgba(245, 245, 243, 0.08);
  border-color: rgba(245, 245, 243, 0.4);
}

/* Secondary Shopee row inside dark card */
.alt-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.alt-label {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.45);
}

.btn-shopee {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.9rem 0.4rem 0.45rem;
  border-radius: 999px;
  background: rgba(238, 77, 45, 0.1);
  border: 1px solid rgba(238, 77, 45, 0.4);
  color: #ff7a5c;
  font-size: 12.5px;
  letter-spacing: -0.005em;
  transition: background 0.4s var(--ease-out), border-color 0.4s var(--ease-out), color 0.4s var(--ease-out);
}

.btn-shopee:hover {
  background: rgba(238, 77, 45, 0.18);
  border-color: rgba(238, 77, 45, 0.6);
  color: #ff8c70;
}

.shopee-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: #ee4d2d;
  color: #fff;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 700;
  font-size: 11.5px;
  line-height: 1;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.85rem;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.5);
  border-top: 1px solid rgba(245, 245, 243, 0.12);
  padding-top: 1.5rem;
}

.dot-sep {
  color: rgba(245, 245, 243, 0.3);
}

@media (max-width: 640px) {
  .cta-section {
    padding: clamp(3rem, 7vh, 4.5rem) 0;
  }

  .card-shell {
    border-radius: 24px;
    padding: 5px;
  }

  .card-core {
    border-radius: 20px;
    padding: 1.75rem 1.5rem 1.75rem;
  }

  .card-core .eyebrow {
    margin-bottom: 1.25rem;
  }

  .title {
    font-size: 1.7rem;
    line-height: 1.05;
    letter-spacing: -0.035em;
    margin-bottom: 1rem;
  }

  .lede {
    font-size: 12.5px;
    line-height: 1.55;
    margin-bottom: 1.75rem;
  }

  .actions {
    gap: 0.45rem;
    margin-bottom: 1rem;
  }

  .btn-primary.wa-cta {
    width: 100%;
    justify-content: flex-start;
    padding: 0.55rem 0.6rem 0.55rem 0.55rem;
    gap: 0.6rem;
  }

  .wa-icon {
    width: 32px;
    height: 32px;
  }

  .wa-icon svg { width: 16px; height: 16px; }

  .wa-line { font-size: 13.5px; }
  .wa-sub { font-size: 9.5px; letter-spacing: 0.14em; }

  .wa-cta .btn-icon { margin-left: auto; }

  .alt-row {
    margin-bottom: 1.5rem;
    gap: 0.55rem;
  }

  .alt-label { font-size: 9.5px; letter-spacing: 0.16em; }

  .btn-shopee {
    font-size: 11.5px;
    padding: 0.32rem 0.75rem 0.32rem 0.4rem;
  }

  .shopee-mark {
    width: 18px;
    height: 18px;
    font-size: 10.5px;
  }

  .btn-primary,
  .btn-ghost {
    font-size: 12.5px;
    padding: 0.7rem 1.1rem;
  }

  .btn-primary:not(.wa-cta) {
    padding-left: 1.2rem;
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

  .meta {
    font-size: 9.5px;
    letter-spacing: 0.14em;
    gap: 0.4rem 0.65rem;
    padding-top: 1.1rem;
  }
}
</style>
