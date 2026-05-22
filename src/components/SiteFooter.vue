<script setup lang="ts">
import { waLink, WA_DISPLAY, DISCOUNT_PERCENT, SHOPEE_STORE } from '../composables/useContact'
const year = new Date().getFullYear()
const waUrl = waLink()
</script>

<template>
  <footer class="foot">
    <div class="container">
      <div class="grid">
        <div class="brand">
          <div class="brand-row">
            <img src="/hade-logo.jpg" alt="hade creative" />
            <span class="brand-text">
              <strong>hade</strong>
              <em>creative</em>
            </span>
          </div>
          <p>
            Adapter lensa DSLR & mirrorless ke smartphone. Dirakit di Kab.
            Sukabumi sejak 2017.
          </p>
        </div>

        <div class="col">
          <h4 class="mono">Pesan langsung</h4>
          <a class="wa-link" :href="waUrl" target="_blank" rel="noreferrer">
            <span class="wa-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.05 4.91A10 10 0 0 0 12 2a10 10 0 0 0-8.66 14.97L2 22l5.18-1.36A10 10 0 0 0 12 22a10 10 0 0 0 7.05-17.09zM12 20.13a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.07.81.82-3-.2-.31A8.13 8.13 0 1 1 12 20.13zm4.46-6.09c-.24-.12-1.45-.72-1.67-.8s-.39-.12-.55.12-.63.79-.78.95-.29.18-.53.06a6.66 6.66 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.36-1.7c-.14-.24 0-.37.1-.49s.24-.29.36-.43a1.74 1.74 0 0 0 .24-.4.45.45 0 0 0 0-.43c-.06-.12-.55-1.32-.75-1.81s-.4-.4-.55-.41h-.47a.91.91 0 0 0-.66.31 2.74 2.74 0 0 0-.86 2 4.78 4.78 0 0 0 1 2.55 11 11 0 0 0 4.21 3.71c.59.25 1.05.4 1.41.51a3.4 3.4 0 0 0 1.55.1 2.55 2.55 0 0 0 1.66-1.18 2.06 2.06 0 0 0 .15-1.18c-.06-.1-.21-.16-.45-.28z"/>
              </svg>
            </span>
            <span class="wa-stack">
              <span>WhatsApp {{ WA_DISPLAY }}</span>
              <span class="wa-perk mono">−{{ DISCOUNT_PERCENT }}% &middot; gratis ongkir</span>
            </span>
          </a>
          <a :href="SHOPEE_STORE" target="_blank" rel="noreferrer">Lihat di Shopee</a>
          <a href="#products">Katalog</a>
          <a href="#compatibility">Kompatibilitas</a>
        </div>

        <div class="col">
          <h4 class="mono">Konten</h4>
          <a href="https://www.youtube.com/channel/UCyL2_W6d7BYtlf6pP2sHrvQ" target="_blank" rel="noreferrer">YouTube channel</a>
          <a href="#manifesto">Filosofi</a>
        </div>

        <div class="col">
          <h4 class="mono">Bantuan</h4>
          <span class="meta">Chat WA respon hitungan menit</span>
          <span class="meta">Pre-order 3 hari kerja</span>
          <span class="meta">Garansi 1 bulan</span>
        </div>
      </div>

      <div class="bottom">
        <span class="mono">© {{ year }} hade creative — Kab. Sukabumi, Jawa Barat</span>
        <span class="mono dim">Dibuat dengan presisi optik &amp; sedikit kepala dingin.</span>
      </div>
    </div>

    <div class="megatype" aria-hidden="true">hade</div>
  </footer>
</template>

<style scoped>
.foot {
  position: relative;
  padding: clamp(4rem, 8vh, 6rem) 0 0;
  background: var(--c-ink);
  color: var(--c-paper);
  overflow: hidden;
}

.grid {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 2.5rem;
  padding-bottom: 3.5rem;
  border-bottom: 1px solid rgba(245, 245, 243, 0.1);
}

.brand-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1.25rem;
}

.brand img {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  object-fit: cover;
  border: 1px solid rgba(245, 245, 243, 0.16);
  filter: grayscale(1) contrast(1.1) brightness(1.1);
}

.brand-text {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  font-size: 16px;
  letter-spacing: -0.02em;
}

.brand-text strong { color: var(--c-paper); font-weight: 600; }
.brand-text em {
  font-family: var(--font-display);
  font-style: italic;
  color: rgba(245, 245, 243, 0.55);
  font-size: 14.5px;
}

.brand p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: rgba(245, 245, 243, 0.55);
  max-width: 36ch;
}

.col {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.col h4 {
  margin: 0 0 0.4rem;
  font-size: 10.5px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.4);
  font-weight: 500;
}

.col a, .col .meta {
  font-size: 13.5px;
  color: var(--c-paper);
  transition: color 0.4s var(--ease-out);
}

.col a:hover { color: #fff; text-decoration: underline; text-underline-offset: 4px; }

.col .meta { color: rgba(245, 245, 243, 0.55); }

.col .wa-link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.95rem 0.55rem 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 999px;
  background: linear-gradient(140deg, #1faa55 0%, #128c4a 60%, #0d6e3a 100%);
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fff;
  text-decoration: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.25),
    0 12px 28px -16px rgba(18, 140, 74, 0.55);
  transition: transform 0.4s var(--ease-out), box-shadow 0.4s var(--ease-out);
}

.col .wa-link:hover {
  transform: translateY(-1px);
  background: linear-gradient(140deg, #25c862 0%, #1faa55 60%, #128c4a 100%);
  color: #fff;
  text-decoration: none;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 16px 34px -16px rgba(18, 140, 74, 0.7);
}

.wa-mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
  color: #fff;
}

.wa-mark svg { width: 14px; height: 14px; }

.wa-stack {
  display: flex;
  flex-direction: column;
  gap: 0.18rem;
  line-height: 1.2;
}

.wa-perk {
  font-size: 9.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: rgba(203, 243, 220, 0.75);
}

.bottom {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.75rem 0;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(245, 245, 243, 0.4);
  position: relative;
  z-index: 2;
}

.bottom .dim { color: rgba(245, 245, 243, 0.3); }

.megatype {
  position: absolute;
  bottom: -0.18em;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  font-size: clamp(8rem, 24vw, 22rem);
  line-height: 0.85;
  color: transparent;
  -webkit-text-stroke: 1px rgba(245, 245, 243, 0.08);
  letter-spacing: -0.05em;
  pointer-events: none;
  white-space: nowrap;
  z-index: 0;
}

@media (max-width: 880px) {
  .grid { grid-template-columns: 1fr 1fr; gap: 2rem; }
  .brand { grid-column: 1 / -1; }
}

@media (max-width: 540px) {
  .grid { grid-template-columns: 1fr; }
  .megatype { font-size: 28vw; }
}

@media (max-width: 640px) {
  .foot {
    padding: clamp(2.5rem, 6vh, 4rem) 0 0;
  }

  .grid {
    gap: 1.5rem;
    padding-bottom: 2.25rem;
  }

  .brand-row {
    margin-bottom: 0.85rem;
    gap: 0.5rem;
  }

  .brand img {
    width: 30px;
    height: 30px;
    border-radius: 8px;
  }

  .brand-text {
    font-size: 14px;
    gap: 0.25rem;
  }

  .brand-text em {
    font-size: 12.5px;
  }

  .brand p {
    font-size: 12px;
    line-height: 1.5;
  }

  .col {
    gap: 0.5rem;
  }

  .col h4 {
    font-size: 9.5px;
    letter-spacing: 0.2em;
    margin-bottom: 0.25rem;
  }

  .col a, .col .meta {
    font-size: 12px;
  }

  .bottom {
    padding: 1.25rem 0;
    font-size: 9.5px;
    letter-spacing: 0.12em;
    gap: 0.4rem;
  }
}
</style>
