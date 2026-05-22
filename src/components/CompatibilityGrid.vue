<script setup lang="ts">
const rows = [
  { lens: 'Canon DSLR', mount: 'EF / EF-S', products: 'Clamp Adapter · Direc Sensor', tag: 'Most-asked', icon: 'C' },
  { lens: 'Nikon DSLR', mount: 'F-Mount', products: 'Clamp Adapter · Direc Sensor', tag: 'With aperture control', icon: 'N' },
  { lens: 'Sony Mirrorless', mount: 'E-Mount', products: 'Clamp Adapter · Direc Sensor', tag: 'Compact pairing', icon: 'S' },
  { lens: 'Micro Four Thirds', mount: 'MFT', products: 'Clamp Adapter · Direc Sensor', tag: 'Cinematic', icon: 'M' },
  { lens: 'Tele 18× — 60×', mount: 'Universal', products: 'Bracket Rigging', tag: 'Anti-slip', icon: 'T' },
]
</script>

<template>
  <section id="compatibility" class="compat">
    <div class="container">
      <header class="head">
        <span class="eyebrow" data-reveal><span class="mono">kompatibilitas</span></span>
        <h2 data-reveal>
          <span>Lensa kamu</span>
          <span class="italic">sudah cocok.</span>
        </h2>
        <p data-reveal>
          Dari Canon EF tahun 90-an sampai Sony E-Mount terbaru. Adapter
          hade dirancang untuk menjembatani warisan optik dengan smartphone
          masa kini.
        </p>
      </header>

      <div class="table">
        <div class="row row-head mono">
          <span>Lensa</span>
          <span>Mount</span>
          <span>Produk hade</span>
          <span class="end">Catatan</span>
        </div>
        <div
          v-for="(r, i) in rows"
          :key="r.lens"
          class="row"
          data-reveal
          :data-reveal-delay="i * 0.05"
        >
          <span class="cell-lens">
            <span class="badge mono">{{ r.icon }}</span>
            <span>{{ r.lens }}</span>
          </span>
          <span class="mono mount">{{ r.mount }}</span>
          <span class="prod">{{ r.products }}</span>
          <span class="end tag mono">{{ r.tag }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.compat {
  padding: clamp(6rem, 12vh, 9rem) 0;
  background: var(--bg);
}

.head {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 4rem;
  max-width: 760px;
}

.head h2 {
  margin: 0;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--c-ink);
  display: flex;
  flex-direction: column;
}

.head h2 .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
}

.head p {
  margin: 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--fg-muted);
  max-width: 54ch;
}

.table {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--hairline-strong);
}

.row {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1.6fr 1fr;
  gap: 1.5rem;
  padding: 1.4rem 0.5rem;
  align-items: center;
  border-bottom: 1px solid var(--hairline);
  transition: background 0.5s var(--ease-out), padding 0.5s var(--ease-out);
}

.row:not(.row-head):hover {
  background: linear-gradient(180deg, transparent, rgba(14, 14, 15, 0.02));
  padding-left: 1rem;
}

.row-head {
  font-size: 10.5px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  padding: 1rem 0.5rem;
}

.cell-lens {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--c-ink);
}

.badge {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: var(--c-ink);
  color: var(--c-paper);
  font-size: 13px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mount {
  font-size: 12.5px;
  color: var(--fg-muted);
  letter-spacing: 0.04em;
}

.prod {
  font-size: 14px;
  color: var(--fg-muted);
}

.end {
  text-align: right;
}

.tag {
  font-size: 10.5px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 0.3rem 0.65rem;
  border: 1px solid var(--hairline-strong);
  border-radius: 999px;
  display: inline-block;
}

@media (max-width: 760px) {
  .table {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
    border-top: 0;
  }

  .row-head { display: none; }

  .row {
    grid-template-columns: 1fr;
    gap: 0.45rem;
    padding: 1rem 1rem;
    border: 1px solid var(--hairline);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.5);
    align-items: flex-start;
  }

  .row:not(.row-head):hover {
    background: rgba(255, 255, 255, 0.8);
    padding-left: 1rem;
  }

  .end { text-align: left; }
  .tag { align-self: flex-start; }
}

@media (max-width: 640px) {
  .compat {
    padding: clamp(3.5rem, 8vh, 5rem) 0;
  }

  .head {
    margin-bottom: 2rem;
    gap: 0.85rem;
  }

  .head h2 {
    font-size: 1.55rem;
    line-height: 1.05;
  }

  .head p {
    font-size: 12.5px;
    line-height: 1.5;
  }

  .table {
    gap: 0.55rem;
  }

  .row {
    padding: 0.85rem 0.85rem;
    gap: 0.4rem;
    border-radius: 12px;
  }

  .cell-lens {
    font-size: 12.5px;
    gap: 0.5rem;
    letter-spacing: -0.015em;
  }

  .badge {
    width: 22px;
    height: 22px;
    font-size: 10px;
  }

  .mount {
    font-size: 10px;
    letter-spacing: 0.04em;
  }

  .prod {
    font-size: 11px;
    line-height: 1.35;
  }

  .tag {
    font-size: 9px;
    letter-spacing: 0.12em;
    padding: 0.2rem 0.45rem;
  }
}
</style>
