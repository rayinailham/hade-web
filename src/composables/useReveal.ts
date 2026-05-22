import { onMounted, onBeforeUnmount } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Auto-reveal any element marked with [data-reveal] inside a root.
 * Uses transform/opacity/filter only (GPU-safe).
 */
export function useReveal(rootSelector: string = 'body') {
  let triggers: ScrollTrigger[] = []
  let ctx: gsap.Context | null = null

  onMounted(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll<HTMLElement>(`${rootSelector} [data-reveal]`).forEach((el) => {
        el.style.opacity = '1'
        el.style.transform = 'none'
        el.style.filter = 'none'
      })
      return
    }

    ctx = gsap.context(() => {
      const els = gsap.utils.toArray<HTMLElement>(`${rootSelector} [data-reveal]`)
      els.forEach((el, i) => {
        const delay = parseFloat(el.dataset.revealDelay ?? '0')
        const stagger = el.dataset.revealStagger
        const childSel = el.dataset.revealChildren
        const target: HTMLElement | HTMLElement[] = childSel
          ? gsap.utils.toArray<HTMLElement>(el.querySelectorAll(childSel))
          : el

        // When animating children, the parent must be immediately visible
        if (childSel) {
          el.style.opacity = '1'
          el.style.transform = 'none'
          el.style.filter = 'none'
        }

        const tl = gsap.fromTo(
          target,
          { y: 36, opacity: 0, filter: 'blur(10px)' },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            ease: 'power3.out',
            delay,
            stagger: stagger ? parseFloat(stagger) : 0,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          },
        )
        const st = (tl.scrollTrigger as ScrollTrigger | undefined)
        if (st) triggers.push(st)
        // suppress unused i
        void i
      })
    })

    // Schedule refreshes AFTER triggers are created. Production cold-start
    // can shift layout (font swap, lazy images) after onMounted runs, leaving
    // trigger positions stale. We refresh on:
    //   1. next paint (immediate post-mount layout)
    //   2. fonts ready (font swap settled)
    //   3. window load (all sync resources)
    //   4. delayed timer (covers anything else)
    requestAnimationFrame(() => ScrollTrigger.refresh())

    if ('fonts' in document) {
      document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {})
    }

    if (document.readyState === 'complete') {
      ScrollTrigger.refresh()
    } else {
      window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })
    }

    setTimeout(() => ScrollTrigger.refresh(), 800)
  })

  onBeforeUnmount(() => {
    triggers.forEach((t) => t.kill())
    triggers = []
    ctx?.revert()
  })
}
