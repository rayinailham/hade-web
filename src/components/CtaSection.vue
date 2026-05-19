<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const cta = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)
let raf = 0
let target = { x: 0, y: 0 }

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
            <span>hari ini juga.</span>
          </h2>

          <p class="lede">
            Order sebelum jam 14:00 dikirim hari yang sama. Garansi produsen
            1 bulan untuk semua adapter. Bantuan teknis langsung dari tim
            hade lewat chat Shopee.
          </p>

          <div class="actions">
            <a
              ref="cta"
              class="btn-primary magnetic"
              :style="{ transform: `translate(${x}px, ${y}px)` }"
              href="https://s.shopee.co.id/4AwuG0d1or"
              target="_blank"
              rel="noreferrer"
            >
              <span>Belanja di Shopee</span>
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
</style>
