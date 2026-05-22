import Lenis from 'lenis'
import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

let lenisInstance: Lenis | null = null

export function getLenis(): Lenis | null {
  return lenisInstance
}

export function useLenis() {
  let raf = 0

  onMounted(() => {
    lenisInstance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.4,
      lerp: 0.09,
    })

    lenisInstance.on('scroll', ScrollTrigger.update)

    // Expose for non-Vue callers (e.g. nav anchor scroll)
    ;(window as unknown as { lenis?: Lenis }).lenis = lenisInstance

    const tick = (time: number) => {
      lenisInstance?.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Refresh after fonts/layout ready
    setTimeout(() => ScrollTrigger.refresh(), 200)

    // Re-refresh on font + window load + image load — production cold-start
    // doesn't have fonts/images cached, so the initial 200ms refresh sees
    // stale layout heights. Without this, scroll-triggered reveals stay at
    // opacity 0 because their start positions were computed before fonts
    // and lazy images settled.
    const refresh = () => ScrollTrigger.refresh()

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(refresh).catch(() => {})
    }

    if (document.readyState === 'complete') {
      refresh()
    } else {
      window.addEventListener('load', refresh, { once: true })
    }

    // Refresh once more after every image finishes (covers lazy-loaded
    // product cards). Throttled via rAF so multiple loads in same frame
    // collapse into one refresh.
    let imgRefreshScheduled = false
    const onImgLoad = () => {
      if (imgRefreshScheduled) return
      imgRefreshScheduled = true
      requestAnimationFrame(() => {
        imgRefreshScheduled = false
        ScrollTrigger.refresh()
      })
    }
    document.querySelectorAll('img').forEach((img) => {
      if (!(img as HTMLImageElement).complete) {
        img.addEventListener('load', onImgLoad, { once: true })
        img.addEventListener('error', onImgLoad, { once: true })
      }
    })

    onBeforeUnmount(() => {
      cancelAnimationFrame(raf)
      gsap.ticker.remove(tick)
      window.removeEventListener('load', refresh)
      lenisInstance?.destroy()
      lenisInstance = null
      delete (window as unknown as { lenis?: Lenis }).lenis
    })
  })

  return { getLenis }
}
