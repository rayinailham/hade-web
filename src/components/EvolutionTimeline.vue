<script setup lang="ts">
const eras = [
  { year: '2017', title: 'Lensa PRO Adapter', body: 'Adapter DSLR pertama. Lahir dari rasa penasaran — bisakah lensa Canon dipasang di Note 4?' },
  { year: '2019', title: 'Clamp Plus & Tele Rigging', body: 'Clamp Plus generasi awal. Solusi pertama untuk lensa tele yang sering melorot di smartphone.' },
  { year: '2021', title: 'Adapter Multi 420–800', body: 'Eksperimen dengan tele jauh dan housing actioncam selfie. Periode eksplorasi paling produktif.' },
  { year: '2023', title: 'Adapter Mirrorless', body: 'Era Sony E-Mount dan MFT. Membuka pintu ke lensa-lensa cinematic 7Artisans dan Meike.' },
  { year: '2026', title: 'Direc Sensor & Rigging 2026', body: 'Generasi sekarang. Sensor HP terhubung langsung ke lensa — gambar tidak terbalik, lebih bersih.' },
]
</script>

<template>
  <section id="evolution" class="evo">
    <div class="container">
      <header class="head">
        <span class="eyebrow"><span class="mono">9 tahun</span></span>
        <h2 data-reveal>
          <span>Sembilan tahun</span>
          <span class="italic">memurnikan</span>
          <span class="italic">satu ide.</span>
        </h2>
      </header>

      <ol class="timeline">
        <li
          v-for="(e, i) in eras"
          :key="e.year"
          class="era"
          :class="{ flip: i % 2 === 1 }"
          data-reveal
          :data-reveal-delay="i * 0.06"
        >
          <div class="era-line" aria-hidden="true">
            <span class="dot"></span>
          </div>
          <div class="era-card">
            <span class="year mono">{{ e.year }}</span>
            <h3>{{ e.title }}</h3>
            <p>{{ e.body }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.evo {
  padding: clamp(6rem, 12vh, 9rem) 0;
  background: var(--bg-soft);
  border-top: 1px solid var(--hairline);
}

.head {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 4.5rem;
  max-width: 760px;
}

.head h2 {
  margin: 0;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2rem, 4.6vw, 3.4rem);
  line-height: 1;
  letter-spacing: -0.04em;
  color: var(--c-ink);
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.4ch;
}

.head h2 .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
}

.timeline {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: var(--hairline-strong);
  transform: translateX(-0.5px);
}

.era {
  position: relative;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.era-line {
  position: relative;
  width: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--bg-soft);
  border: 1px solid var(--c-ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dot::after {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--c-ink);
}

.era-card {
  grid-column: 3;
  padding: 1.5rem 1.75rem;
  background: #ffffff;
  border: 1px solid var(--hairline);
  border-radius: 18px;
  box-shadow: 0 14px 30px -22px rgba(14, 14, 15, 0.18);
  transition: transform 0.6s var(--ease-out), box-shadow 0.6s var(--ease-out);
}

.era:hover .era-card {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -24px rgba(14, 14, 15, 0.28);
}

.era.flip .era-card {
  grid-column: 1;
  text-align: right;
}

.year {
  display: inline-block;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  margin-bottom: 0.6rem;
}

.era-card h3 {
  margin: 0 0 0.4rem;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 1.05;
  letter-spacing: -0.025em;
  color: var(--c-ink);
}

.era-card p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--fg-muted);
}

@media (max-width: 760px) {
  .timeline::before { left: 14px; }
  .era {
    grid-template-columns: 28px 1fr;
    gap: 0.75rem;
  }
  .era-line { width: 28px; }
  .era-card,
  .era.flip .era-card {
    grid-column: 2;
    text-align: left;
  }
}
</style>
