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

const title = `${SITE_NAME} — Adapter Lensa DSLR & Mirrorless ke HP | Sukabumi sejak 2017`
const description =
  'Hade Creative bikin adapter clamp, direc sensor, bracket rigging, dan grip Bluetooth untuk pasang lensa DSLR/mirrorless ke smartphone. Hasil setara DSLR dari HP yang sudah kamu punya. Diskon 10% via WhatsApp + gratis ongkir. Dirakit di Kab. Sukabumi sejak 2017.'

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
