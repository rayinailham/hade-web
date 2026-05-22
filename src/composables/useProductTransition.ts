import type { Router, RouteLocationRaw } from 'vue-router'
import { viewNavigate } from './useViewTransition'

/**
 * Builds a deterministic view-transition-name for a product image so the
 * catalog card and the detail hero can morph into each other.
 */
export function productVTName(slug: string): string {
  return `vt-product-${slug}`
}

/**
 * Intercepts a card click, tags the image with a unique view-transition-name,
 * then performs the routed navigation inside a startViewTransition() call.
 */
export function navigateToProduct(
  router: Router,
  slug: string,
  to: RouteLocationRaw,
  imageEl?: HTMLElement | null,
): Promise<void> {
  if (imageEl) {
    // Inline style is intentional — we want this to win over any class rule
    // and to be trivially cleared when the card unmounts.
    imageEl.style.viewTransitionName = productVTName(slug)
  }
  return viewNavigate(router, to)
}
