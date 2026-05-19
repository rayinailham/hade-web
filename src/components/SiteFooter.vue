<script setup lang="ts">
const year = new Date().getFullYear()
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
          <h4 class="mono">Belanja</h4>
          <a href="https://s.shopee.co.id/4AwuG0d1or" target="_blank" rel="noreferrer">Toko Shopee</a>
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
          <span class="meta">Chat 97% &middot; respon hitungan jam</span>
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
</style>
