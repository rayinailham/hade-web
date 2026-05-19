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
            <span class="wa-dot" aria-hidden="true"></span>
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
  align-items: flex-start;
  gap: 0.55rem;
  padding: 0.6rem 0.85rem;
  margin-bottom: 0.25rem;
  border-radius: 14px;
  background: rgba(31, 170, 85, 0.12);
  border: 1px solid rgba(37, 200, 98, 0.35);
  color: #cbf3dc;
  text-decoration: none;
  transition: background 0.4s var(--ease-out), border-color 0.4s var(--ease-out);
}

.col .wa-link:hover {
  background: rgba(31, 170, 85, 0.2);
  border-color: rgba(37, 200, 98, 0.55);
  color: #e3fbed;
  text-decoration: none;
}

.wa-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #25c862;
  margin-top: 0.55rem;
  box-shadow: 0 0 0 4px rgba(37, 200, 98, 0.18);
  flex-shrink: 0;
}

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
