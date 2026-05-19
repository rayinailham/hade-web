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
import CtaSection from './components/CtaSection.vue'
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
    <CtaSection />
  </main>
  <SiteFooter />
</template>
