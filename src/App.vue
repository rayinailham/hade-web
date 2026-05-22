<script setup lang="ts">
import { useLenis } from './composables/useLenis'
import { useReveal } from './composables/useReveal'

import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import ManifestoSection from './components/ManifestoSection.vue'
import ProductsScroller from './components/ProductsScroller.vue'
import VideoGallery from './components/VideoGallery.vue'
import CompatibilityGrid from './components/CompatibilityGrid.vue'
import ProofMarquee from './components/ProofMarquee.vue'
import FinalCta from './components/FinalCta.vue'
import SiteFooter from './components/SiteFooter.vue'

useLenis()
useReveal()
</script>

<template>
  <SiteNav />
  <main>
    <HeroSection />
    <ManifestoSection />
    <ProductsScroller />
    <CompatibilityGrid />
    <VideoGallery />
    <ProofMarquee />
    <FinalCta />
  </main>
  <SiteFooter />
</template>

<style scoped>
.cta-placeholder {
  position: relative;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-ink);
  color: rgba(245, 245, 243, 0.4);
  border-top: 1px solid rgba(245, 245, 243, 0.08);
  padding: clamp(3rem, 8vh, 5rem) 0;
}

.cta-placeholder-mono {
  margin: 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}
</style>
