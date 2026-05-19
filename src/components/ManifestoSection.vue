<script setup lang="ts">
const principles = [
  {
    n: '01',
    title: 'Optik yang sudah teruji',
    body: 'Lensa DSLR dan mirrorless dirancang oleh insinyur untuk menangkap cahaya dengan presisi. Kami tidak mereinventasi optik — kami menjembatani.',
  },
  {
    n: '02',
    title: 'Selalu di sakumu',
    body: 'Smartphone adalah kamera yang selalu kamu bawa. Adapter hade membuat lensa serius bisa dipasang dalam hitungan detik.',
  },
  {
    n: '03',
    title: 'Buatan tangan, di Sukabumi',
    body: 'Dirakit dari aluminium dan PETG di workshop kami. Setiap unit melewati QC dua hari sebelum dikirim.',
  },
]
</script>

<template>
  <section id="manifesto" class="manifesto">
    <div class="container">
      <header class="head">
        <span class="eyebrow">
          <span class="mono">filosofi</span>
        </span>
        <h2 class="title" data-reveal data-reveal-stagger="0.08" data-reveal-children=".tword">
          <span class="tword">Bukan kamera</span>
          <span class="tword italic">baru.</span>
          <span class="tword">Kamera yang</span>
          <span class="tword italic">sudah hidup</span>
          <span class="tword italic">di tanganmu —</span>
          <span class="tword">dengan mata</span>
          <span class="tword italic">yang lebih tajam.</span>
        </h2>
      </header>

      <div class="grid">
        <article
          v-for="(p, i) in principles"
          :key="p.n"
          class="card"
          :class="{ 'is-shifted': i === 1 }"
          data-reveal
        >
          <div class="card-shell">
            <div class="card-core">
              <span class="num mono">{{ p.n }}</span>
              <h3>{{ p.title }}</h3>
              <p>{{ p.body }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.manifesto {
  position: relative;
  padding: clamp(6rem, 12vh, 10rem) 0;
  background: var(--bg);
}

.head {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 5rem;
  max-width: 880px;
}

.title {
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(2rem, 4.6vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
  margin: 0;
  color: var(--c-ink);
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.45ch;
}

.title .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
  letter-spacing: -0.045em;
}

.tword { display: inline-block; }

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1.25rem;
}

.card {
  grid-column: span 4;
}

.card.is-shifted {
  transform: translateY(2.75rem);
}

.card-shell {
  position: relative;
  padding: 6px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2));
  border: 1px solid var(--hairline);
  border-radius: 28px;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.7),
    0 14px 36px -22px rgba(14, 14, 15, 0.18);
  height: 100%;
}

.card-core {
  position: relative;
  height: 100%;
  padding: 2.25rem 2rem 2.5rem;
  background: #ffffff;
  border-radius: calc(28px - 7px);
  border: 1px solid var(--hairline);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.6s var(--ease-out);
}

.card:hover .card-core {
  transform: translateY(-3px);
}

.num {
  font-size: 11px;
  letter-spacing: 0.22em;
  color: var(--fg-subtle);
  text-transform: uppercase;
}

.card h3 {
  margin: 0;
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 1.05;
  letter-spacing: -0.02em;
  color: var(--c-ink);
  max-width: 14ch;
}

.card p {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--fg-muted);
  max-width: 38ch;
}

@media (max-width: 900px) {
  .card { grid-column: span 12; }
  .card.is-shifted { transform: none; }
}
</style>
