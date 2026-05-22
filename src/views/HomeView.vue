<script setup lang="ts">
import { useReveal } from '../composables/useReveal'
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
