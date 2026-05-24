<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useReveal } from '../composables/useReveal'
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from '../composables/useSeo'
import HeroSection from '../components/HeroSection.vue'
import ManifestoSection from '../components/ManifestoSection.vue'
import ProductsScroller from '../components/ProductsScroller.vue'
import VideoGallery from '../components/VideoGallery.vue'
import CompatibilityGrid from '../components/CompatibilityGrid.vue'
import ProofMarquee from '../components/ProofMarquee.vue'
import FinalCta from '../components/FinalCta.vue'

// Scoped to .home-view so it runs after the lazy-loaded landing children
// mount. App-level useReveal still handles the static SiteFooter.
useReveal('.home-view')

const title = `Adapter Lensa DSLR & Mirrorless ke HP — ${SITE_NAME}`
const description =
  'Adapter clamp, direc sensor, bracket tele, dan grip Bluetooth. Pasang lensa DSLR/mirrorless ke HP. Diskon 10% via WA + gratis ongkir. Sukabumi sejak 2017.'

// VideoObject entries — must mirror the list in components/VideoGallery.vue.
// Date strings are derived from the human-readable dates in the gallery.
type VideoEntry = {
  id: string
  title: string
  description: string
  uploadDate: string // ISO 8601
}

const videoEntries: VideoEntry[] = [
  {
    id: 'x6oWdRX9-0E',
    title: 'Gambar Lensa HP bening dengan rigging hade creative',
    description:
      'Demo bracket rigging Hade untuk phonegraphy — hasil tajam tanpa lensa melorot.',
    uploadDate: '2022-10-16',
  },
  {
    id: '0XyxW63AFoQ',
    title: 'Kamera HP ala DSLR dengan Clamp Plus dan Grip',
    description:
      'Clamp Plus + Grip Bluetooth — set-up portable yang terasa seperti DSLR di tangan.',
    uploadDate: '2021-07-29',
  },
  {
    id: 'AdHZz3mDqTU',
    title: 'Adapter Pro untuk memasangkan lensa DSLR di HP',
    description:
      'Adapter Pro Full Glass Hade — pasang lensa DSLR di HP tanpa bongkar lensa utama.',
    uploadDate: '2021-05-08',
  },
  {
    id: 'Cej0ZCRjWJ8',
    title: 'Ini HP apa DSLR? — hade lensa PRO Adapter',
    description:
      'Tes lensa tele dengan PRO Adapter Hade. Hasil HP susah dibedakan dari kamera DSLR.',
    uploadDate: '2019-04-06',
  },
  {
    id: 'QFzif4rlOas',
    title: 'Lensa PRO Adapter — hade official',
    description:
      'Pengenalan resmi Lensa PRO Adapter Hade Creative — original sejak 2017.',
    uploadDate: '2019-03-26',
  },
]

const videoObjectGraph = videoEntries.map((v) => ({
  '@type': 'VideoObject',
  name: v.title,
  description: v.description,
  thumbnailUrl: [
    `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`,
    `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
  ],
  uploadDate: v.uploadDate,
  contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
  embedUrl: `https://www.youtube-nocookie.com/embed/${v.id}`,
  publisher: {
    '@type': 'Organization',
    name: 'Hade Creative Production',
    logo: {
      '@type': 'ImageObject',
      url: DEFAULT_OG_IMAGE,
    },
  },
}))

useHead({
  title,
  meta: [
    { name: 'description', content: description },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: SITE_URL + '/' },
    { property: 'og:image', content: DEFAULT_OG_IMAGE },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
  ],
  link: [{ rel: 'canonical', href: SITE_URL + '/' }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Hade Creative Production',
            alternateName: 'Hade Creative',
            url: SITE_URL,
            logo: DEFAULT_OG_IMAGE,
            foundingDate: '2017',
            areaServed: 'ID',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kab. Sukabumi',
              addressRegion: 'Jawa Barat',
              addressCountry: 'ID',
            },
            sameAs: [
              'https://shopee.co.id/hadecreative',
              'https://www.youtube.com/channel/UCyL2_W6d7BYtlf6pP2sHrvQ',
              'https://www.tiktok.com/@hadecreative',
              'https://www.instagram.com/hadecreative',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'sales',
              telephone: '+62-852-8183-9911',
              areaServed: 'ID',
              availableLanguage: ['id', 'en'],
            },
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: SITE_NAME,
            inLanguage: 'id-ID',
            publisher: { '@id': `${SITE_URL}/#organization` },
          },
          ...videoObjectGraph,
        ],
      }),
    },
  ],
})
</script>

<template>
  <main class="home-view">
    <HeroSection />
    <ManifestoSection />
    <ProductsScroller />
    <CompatibilityGrid />
    <VideoGallery />
    <ProofMarquee />
    <FinalCta />
  </main>
</template>

<style scoped>
.home-view {
  display: block;
}
</style>
