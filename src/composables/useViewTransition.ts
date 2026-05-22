import type { Router, RouteLocationRaw } from 'vue-router'
import { nextTick } from 'vue'

/**
 * Detects support for the View Transitions API.
 */
export function supportsViewTransitions(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document
}

/**
 * Tracks whether the most recent navigation used a real view transition.
 * Detail / catalog views read this flag in onMounted to skip GSAP entrance
 * animations that would conflict with the shared-element morph.
 */
let _lastNavWasVT = false
export function lastNavWasViewTransition(): boolean {
  return _lastNavWasVT
}

interface ViewTransition {
  finished: Promise<void>
  ready: Promise<void>
  updateCallbackDone: Promise<void>
  skipTransition: () => void
}

type StartViewTransition = (cb: () => void | Promise<void>) => ViewTransition

interface LenisLike {
  scrollTo: (target: number, options?: { immediate?: boolean; duration?: number }) => void
}

function getLenis(): LenisLike | null {
  return (window as unknown as { lenis?: LenisLike }).lenis ?? null
}

/**
 * Snap to top synchronously. Used inside the view-transition callback so
 * the browser's "new" snapshot is captured at scroll-y 0, and the morph
 * naturally appears as if the page itself slid up alongside the image.
 */
function snapScrollToTop() {
  const lenis = getLenis()
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, duration: 0 })
  }
  // Fallback / safety net — Lenis hijacks the document scroll but the
  // browser still tracks window.scrollY for the snapshot.
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}

/**
 * Wraps a router push in a View Transition. Falls back to plain push when
 * the API is unavailable, so the existing Vue <transition> wrapper handles
 * the swap with GSAP.
 *
 * IMPORTANT: We snap to scroll-top INSIDE the transition callback so the
 * browser captures the new page snapshot at y=0. That makes the shared
 * product image and the surrounding layout morph in lockstep — the user
 * perceives a single coherent slide-up rather than an image flying alone
 * over a stationary viewport.
 */
export async function viewNavigate(
  router: Router,
  to: RouteLocationRaw,
): Promise<void> {
  if (!supportsViewTransitions()) {
    _lastNavWasVT = false
    await router.push(to)
    snapScrollToTop()
    return
  }

  _lastNavWasVT = true
  const start = (document as unknown as { startViewTransition: StartViewTransition })
    .startViewTransition
  const transition = start.call(document, async () => {
    await router.push(to)
    await nextTick()
    snapScrollToTop()
    // Second tick so the new layout settles at scroll-y 0 before the
    // browser snapshots it.
    await nextTick()
  })

  transition.finished.finally(() => {
    _lastNavWasVT = false
  })
}

