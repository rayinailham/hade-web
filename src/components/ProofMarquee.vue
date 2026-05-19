<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'

const root = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const stats = [
  { value: '527K', label: 'Views video terpopuler' },
  { value: '4.78', label: 'Rating rata-rata produk' },
  { value: '230+', label: 'Unit terjual lifetime' },
  { value: '97%', label: 'Chat performance Shopee' },
  { value: '1.5K+', label: 'Pengikut toko Shopee' },
  { value: '60+', label: 'Video edukasi' },
  { value: '9 yr', label: 'Berdiri sejak 2017' },
  { value: '466', label: 'Favorit produk terlaris' },
]

const reviews = [
  {
    quote: 'Serasa DSLR. Untuk penjual topp markotop — ramah dan bener-bener menghargai pembeli. Full bintang pokoknyaaa.',
    who: 'bangkitardiikurniawan',
    role: 'Dengan Grip · Canon',
  },
  {
    quote: 'Awalnya ragu. Tapi setelah barang datang, baru sadar klo ternyata worth banget. Trims seller, semoga berkah selalu.',
    who: 'riohatake051',
    role: 'Universal · Lensa Tele',
  },
  {
    quote: 'Kokoh, HP jadi sensasi DSLR. Recommended banget!!',
    who: 'jromangkusuardana',
    role: 'Rig dan Clamp',
  },
  {
    quote: 'Adminnya joss, dibantu sampai selesai. Fungsi normal, keamanan aman, tombol power gak sampai ketekan.',
    who: 'aditiyaryuuzaki',
    role: 'Clamp · Mirrorless',
  },
  {
    quote: 'Produk sangat bermanfaat untuk menyatukan smartphone dan telezoom, meminimalisir getaran untuk hasil foto/video yang baik.',
    who: 'anindaratu',
    role: 'Rig dan Clamp',
  },
  {
    quote: 'Mantap ini, barang recommended banget. Sukses selalu ya.',
    who: 'henylusiani84',
    role: 'Clamp Universal',
  },
  {
    quote: 'Barang sesuai deskripsi, bahan kokoh. Seller ramah dan amanah.',
    who: 'msusetyo',
    role: 'Rig dan Clamp',
  },
  {
    quote: 'Buat lensa tele ala-ala — emang stabil sih. Worth it.',
    who: 'ayuhanna22',
    role: 'Rig dan Clamp',
  },
]

onMounted(() => {
  if (!root.value) return
  ctx = gsap.context(() => {
    // Seamless infinite marquee
    // Track contains 2 copies of the row.
    // Direction -1: animate xPercent  0  -> -50  (content scrolls left)
    // Direction +1: animate xPercent -50 -> 0    (content scrolls right)
    // At the loop point both states look identical because content is duplicated.
    const tracks = root.value!.querySelectorAll<HTMLElement>('.marquee-track')
    tracks.forEach((track, i) => {
      const reverse = i % 2 !== 0
      gsap.set(track, { xPercent: reverse ? -50 : 0 })
      gsap.to(track, {
        xPercent: reverse ? 0 : -50,
        duration: 42,
        ease: 'none',
        repeat: -1,
      })
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="proof">
    <div class="container">
      <header class="head">
        <span class="eyebrow"><span class="mono">bukti</span></span>
        <h2 data-reveal>
          <span>Angka tidak</span>
          <span class="italic">berbohong.</span>
        </h2>
      </header>
    </div>

    <!-- Stats marquee row 1 -->
    <div class="marquee">
      <div class="marquee-track">
        <div v-for="i in 2" :key="`s-${i}`" class="marquee-row">
          <div v-for="s in stats" :key="`${i}-${s.label}`" class="stat">
            <span class="stat-value mono">{{ s.value }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Reviews marquee row 2 (reverse) -->
    <div class="marquee marquee-reviews">
      <div class="marquee-track">
        <div v-for="i in 2" :key="`r-${i}`" class="marquee-row">
          <article v-for="r in reviews" :key="`${i}-${r.who}`" class="review">
            <p class="quote">&ldquo;{{ r.quote }}&rdquo;</p>
            <footer>
              <span class="who">{{ r.who }}</span>
              <span class="role mono">{{ r.role }}</span>
            </footer>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.proof {
  padding: clamp(6rem, 12vh, 9rem) 0 clamp(4rem, 8vh, 6rem);
  background: var(--bg);
  border-top: 1px solid var(--hairline);
  overflow: hidden;
}

.head {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-bottom: 3.5rem;
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
  flex-wrap: wrap;
  gap: 0 0.4ch;
}

.head h2 .italic {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 300;
  color: var(--c-iron);
}

.marquee {
  position: relative;
  overflow: hidden;
  margin-bottom: 1.5rem;
}

.marquee::before, .marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12vw;
  z-index: 2;
  pointer-events: none;
}

.marquee::before {
  left: 0;
  background: linear-gradient(to right, var(--bg), transparent);
}

.marquee::after {
  right: 0;
  background: linear-gradient(to left, var(--bg), transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  will-change: transform;
}

.marquee-row {
  display: flex;
  gap: 1rem;
  padding-right: 1rem;
}

.stat {
  display: inline-flex;
  align-items: baseline;
  gap: 0.85rem;
  padding: 1.1rem 1.6rem;
  border: 1px solid var(--hairline-strong);
  border-radius: 999px;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(6px);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--c-ink);
}

.stat-label {
  font-size: 12.5px;
  color: var(--fg-muted);
  letter-spacing: -0.005em;
}

/* reviews */
.marquee-reviews .marquee-row {
  gap: 1.25rem;
  padding-right: 1.25rem;
}

.review {
  flex: 0 0 360px;
  padding: 1.5rem 1.6rem;
  background: #fff;
  border: 1px solid var(--hairline);
  border-radius: 18px;
  box-shadow: 0 14px 30px -22px rgba(14, 14, 15, 0.18);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.quote {
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.35;
  letter-spacing: -0.015em;
  color: var(--c-ink);
  margin: 0;
}

.review footer {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-top: 1px solid var(--hairline);
  padding-top: 0.85rem;
}

.who {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--c-ink);
}

.role {
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--fg-subtle);
}

@media (max-width: 640px) {
  .proof {
    padding: clamp(3.5rem, 8vh, 5rem) 0 clamp(2.5rem, 5vh, 3.5rem);
  }

  .head {
    margin-bottom: 2rem;
    gap: 0.85rem;
  }

  .head h2 {
    font-size: 1.55rem;
    line-height: 1.05;
  }

  .marquee::before, .marquee::after {
    width: 8vw;
  }

  .marquee-row {
    gap: 0.65rem;
    padding-right: 0.65rem;
  }

  .stat {
    padding: 0.7rem 1rem;
    gap: 0.55rem;
  }

  .stat-value {
    font-size: 1.05rem;
  }

  .stat-label {
    font-size: 10.5px;
  }

  .marquee-reviews .marquee-row {
    gap: 0.85rem;
    padding-right: 0.85rem;
  }

  .review {
    flex: 0 0 260px;
    padding: 1.1rem 1.15rem;
    border-radius: 14px;
    gap: 0.75rem;
  }

  .quote {
    font-size: 0.92rem;
    line-height: 1.35;
  }

  .review footer {
    padding-top: 0.65rem;
    gap: 0.15rem;
  }

  .who {
    font-size: 12px;
  }

  .role {
    font-size: 9.5px;
    letter-spacing: 0.13em;
  }
}
</style>
