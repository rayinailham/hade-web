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

/**
 * Wraps a router push in a View Transition. Falls back to plain push when
 * the API is unavailable, so the existing Vue <transition> wrapper handles
 * the swap with GSAP.
 */
export async function viewNavigate(
  router: Router,
  to: RouteLocationRaw,
): Promise<void> {
  if (!supportsViewTransitions()) {
    _lastNavWasVT = false
    await router.push(to)
    return
  }

  _lastNavWasVT = true
  const start = (document as unknown as { startViewTransition: StartViewTransition })
    .startViewTransition
  const transition = start.call(document, async () => {
    await router.push(to)
    await nextTick()
  })

  // Reset the flag once the browser has finished animating, so subsequent
  // route changes (e.g. via browser back) re-evaluate cleanly.
  transition.finished.finally(() => {
    _lastNavWasVT = false
  })
}
