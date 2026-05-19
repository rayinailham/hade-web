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

    const tick = (time: number) => {
      lenisInstance?.raf(time * 1000)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Refresh after fonts/layout ready
    setTimeout(() => ScrollTrigger.refresh(), 200)

    onBeforeUnmount(() => {
      cancelAnimationFrame(raf)
      gsap.ticker.remove(tick)
      lenisInstance?.destroy()
      lenisInstance = null
    })
  })

  return { getLenis }
}
