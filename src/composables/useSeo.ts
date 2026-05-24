// Centralized SEO constants + helpers for hade creative.
// SITE_URL can be overridden at build time via VITE_SITE_URL env var.

const ENV_SITE_URL =
  typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL
    ? String(import.meta.env.VITE_SITE_URL).replace(/\/+$/, '')
    : ''

export const SITE_URL = ENV_SITE_URL || 'https://hade-web.vercel.app'
export const SITE_NAME = 'Hade Creative'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-default.jpg`

/** Absolute URL helper. */
export function abs(path: string): string {
  if (!path) return SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Parse a price string like "Rp 895.000 – 1.060.000" into { low, high, currency }.
 *  Returns numbers in IDR as integers. Returns { low: 0, high: 0 } when not parseable. */
export function parsePriceRange(price: string): {
  low: number
  high: number
  currency: 'IDR'
  valid: boolean
} {
  const cleaned = price.replace(/[^\d–\-—]/g, '')
  const parts = cleaned.split(/[–\-—]/).map((p) => Number.parseInt(p, 10) || 0)
  const low = parts[0] || 0
  const high = parts[1] || low
  return { low, high, currency: 'IDR', valid: low > 0 }
}

/** Number of price tiers in a range string. "Rp 895.000 – 1.060.000" -> 2. */
export function priceVariantCount(price: string): number {
  const { low, high, valid } = parsePriceRange(price)
  if (!valid) return 1
  return high > low ? 2 : 1
}

/** Default priceValidUntil: ~1 year from build time. */
export function priceValidUntil(): string {
  const d = new Date()
  d.setFullYear(d.getFullYear() + 1)
  return d.toISOString().slice(0, 10)
}

/** Parse "12 terjual" -> 12. Returns 0 when not parseable. */
export function parseSold(sold: string): number {
  const m = sold.match(/(\d[\d.,]*)/)
  if (!m) return 0
  return Number.parseInt(m[1].replace(/[.,]/g, ''), 10) || 0
}
