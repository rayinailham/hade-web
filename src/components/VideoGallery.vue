<script setup lang="ts">
import { ref } from 'vue'

type Video = {
  id: string
  title: string
  meta: string
  views: string
  date: string
}

const videos: Video[] = [
  {
    id: 'x6oWdRX9-0E',
    title: 'Gambar Lensa HP bening dengan rigging hade creative',
    meta: 'Bracket Rigging · Phonegraphy',
    views: '19.185',
    date: '16 Okt 2022',
  },
  {
    id: '0XyxW63AFoQ',
    title: 'Kamera HP ala DSLR dengan Clamp Plus dan Grip',
    meta: 'Clamp Plus · Grip',
    views: '34.303',
    date: '29 Jul 2021',
  },
  {
    id: 'AdHZz3mDqTU',
    title: 'Adapter Pro untuk memasangkan lensa DSLR di HP',
    meta: 'Adapter Pro · Full Glass',
    views: '77.985',
    date: '8 Mei 2021',
  },
  {
    id: 'Cej0ZCRjWJ8',
    title: 'Ini HP apa DSLR? — hade lensa PRO Adapter',
    meta: 'Lens PRO Adapter · Tele',
    views: '497.109',
    date: '6 Apr 2019',
  },
  {
    id: 'QFzif4rlOas',
    title: 'Lensa PRO Adapter — hade official',
    meta: 'PRO Adapter · Original',
    views: '527.569',
    date: '26 Mar 2019',
  },
]

const playing = ref<Set<string>>(new Set())

function play(id: string) {
  playing.value.add(id)
  playing.value = new Set(playing.value)
}

function thumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
}

function embedSrc(v: Video) {
  return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1`
}
</script>

<template>
  <section id="videos" class="videos">
    <div class="container">
      <header class="head">
        <span class="eyebrow" data-reveal><span class="mono">video</span></span>
        <h2 data-reveal>
          <span>Lihat hasilnya</span>
          <span class="italic">dari kamera HP.</span>
        </h2>
        <p data-reveal>
          Arsip dari hade Creative Channel — uji lapangan adapter, rigging, dan
          clamp di tangan pengguna sejak 2019.
        </p>
      </header>

      <div class="grid">
        <article
          v-for="(v, i) in videos"
          :key="v.id"
          class="card"
          data-reveal
          :data-reveal-delay="i * 0.05"
        >
          <div class="player" :class="{ 'is-playing': playing.has(v.id) }">
            <iframe
              v-if="playing.has(v.id)"
              class="frame"
              :src="embedSrc(v)"
              :title="v.title"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
            />
            <button
              v-else
              class="facade"
              type="button"
              :aria-label="`Putar: ${v.title}`"
              @click="play(v.id)"
            >
              <img
                :src="thumb(v.id)"
                :alt="v.title"
                loading="lazy"
                decoding="async"
              />
              <span class="overlay" aria-hidden="true"></span>
              <span class="play" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M8 5.5v13l11-6.5L8 5.5z" fill="currentColor" />
                </svg>
              </span>
            </button>
          </div>
          <div class="card-meta">
            <span class="num mono">0{{ i + 1 }}</span>
            <h3>{{ v.title }}</h3>
            <div class="row mono">
              <span>{{ v.views }} views</span>
              <span aria-hidden="true">·</span>
              <span>{{ v.date }}</span>
            </div>
            <span class="topic">{{ v.meta }}</span>
          </div>
        </article>
      </div>

      <p class="footnote mono" data-reveal>
        <span>Arsip lengkap di kanal YouTube</span>
        <a
          href="https://www.youtube.com/@hadeCreativeChannel"
          target="_blank"
          rel="noreferrer"
        >hade Creative Channel ↗</a>
      </p>
    </div>
  </section>
</template>

<style scoped>
.videos {
  padding: clamp(5rem, 10vh, 7rem) 0;
  background: var(--bg);
  border-top: 1px solid var(--hairline);
}

.head {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  max-width: 720px;
}

.head h2 {
  margin: 0;
  font-family: var(--font-sans);
  font-weight: 500;
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  line-height: 1.05;
  letter-spacing: -0.035em;
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
  font-size: 14.5px;
  line-height: 1.55;
  color: var(--fg-muted);
  max-width: 54ch;
}

/* ===== Grid ===== */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.75rem 1.25rem;
}

.card {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.player {
  position: relative;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: var(--c-ink);
  border: 1px solid var(--hairline-strong);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.4) inset,
    0 8px 24px -16px rgba(14, 14, 15, 0.25);
  isolation: isolate;
}

.frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

.facade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  cursor: pointer;
  background: var(--c-iron);
  overflow: hidden;
}

.facade img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.4) contrast(1.05) brightness(0.92);
  transition: transform 1s var(--ease-out), filter 0.5s var(--ease-out);
}

.facade:hover img {
  transform: scale(1.04);
  filter: grayscale(0.2) contrast(1.08) brightness(0.96);
}

.overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(120% 80% at 50% 60%, transparent 30%, rgba(14, 14, 15, 0.4) 100%),
    linear-gradient(180deg, rgba(14, 14, 15, 0.05) 0%, rgba(14, 14, 15, 0.3) 100%);
  pointer-events: none;
  transition: opacity 0.5s var(--ease-out);
}

.facade:hover .overlay {
  opacity: 0.75;
}

.play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 46px;
  height: 46px;
  border-radius: 999px;
  background: rgba(245, 245, 243, 0.92);
  color: var(--c-ink);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow:
    0 1px 0 rgba(255, 255, 255, 0.8) inset,
    0 10px 24px -10px rgba(14, 14, 15, 0.5);
  transition:
    transform 0.5s var(--ease-spring),
    background 0.4s var(--ease-out);
}

.play svg {
  width: 16px;
  height: 16px;
  margin-left: 2px;
}

.facade:hover .play {
  transform: translate(-50%, -50%) scale(1.08);
  background: #ffffff;
}

.facade:active .play {
  transform: translate(-50%, -50%) scale(0.96);
}

/* ===== Meta ===== */
.card-meta {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.num {
  font-size: 10.5px;
  letter-spacing: 0.2em;
  color: var(--fg-subtle);
}

.card-meta h3 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: -0.018em;
  line-height: 1.3;
  color: var(--c-ink);
}

.row {
  display: flex;
  gap: 0.45rem;
  font-size: 11px;
  letter-spacing: 0.04em;
  color: var(--fg-muted);
}

.topic {
  font-size: 12px;
  color: var(--fg-subtle);
  letter-spacing: -0.005em;
}

/* ===== Footnote ===== */
.footnote {
  margin: 3rem 0 0;
  padding-top: 1.25rem;
  border-top: 1px solid var(--hairline);
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-subtle);
  flex-wrap: wrap;
}

.footnote a {
  color: var(--c-ink);
  border-bottom: 1px solid var(--hairline-strong);
  padding-bottom: 0.15rem;
  transition: border-color 0.4s var(--ease-out);
}

.footnote a:hover {
  border-color: var(--c-ink);
}

@media (max-width: 960px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem 1.25rem;
  }
}

@media (max-width: 640px) {
  .videos {
    padding: clamp(3rem, 7vh, 4.5rem) 0;
  }

  .head {
    margin-bottom: 2rem;
    gap: 0.75rem;
  }

  .head h2 {
    font-size: 1.4rem;
    line-height: 1.1;
  }

  .head p {
    font-size: 12.5px;
    line-height: 1.5;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem 0.75rem;
  }

  .card {
    gap: 0.55rem;
  }

  .player {
    border-radius: 9px;
  }

  .play {
    width: 36px;
    height: 36px;
  }

  .play svg {
    width: 13px;
    height: 13px;
  }

  .num {
    font-size: 9.5px;
    letter-spacing: 0.18em;
  }

  .card-meta {
    gap: 0.3rem;
  }

  .card-meta h3 {
    font-size: 0.78rem;
    line-height: 1.25;
    letter-spacing: -0.012em;
  }

  .row {
    font-size: 10px;
    gap: 0.3rem;
  }

  .topic {
    font-size: 10.5px;
  }

  .footnote {
    margin-top: 2rem;
    padding-top: 1rem;
    font-size: 10px;
    letter-spacing: 0.14em;
    gap: 0.5rem;
  }
}

@media (max-width: 380px) {
  .head h2 {
    font-size: 1.25rem;
  }

  .card-meta h3 {
    font-size: 0.72rem;
  }
}
</style>
