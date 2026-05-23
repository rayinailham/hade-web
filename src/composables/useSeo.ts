// Centralized SEO constants + helpers for hade creative.
// Update SITE_URL when custom domain is wired.

export const SITE_URL = 'https://hade-web.vercel.app'
export const SITE_NAME = 'Hade Creative'
export const DEFAULT_OG_IMAGE = `${SITE_URL}/hade-logo.jpg`

/** Absolute URL helper. */
export function abs(path: string): string {
  if (!path) return SITE_URL
  if (path.startsWith('http://') || path.startsWith('https://')) return path
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Parse a price string like "Rp 895.000 – 1.060.000" into { low, high, currency }.
 *  Returns numbers in IDR as integers. */
export function parsePriceRange(price: string): {
  low: number
  high: number
  currency: 'IDR'
} {
  const cleaned = price.replace(/[^\d–\-—]/g, '')
  const parts = cleaned.split(/[–\-—]/).map((p) => Number.parseInt(p, 10) || 0)
  const low = parts[0] || 0
  const high = parts[1] || low
  return { low, high, currency: 'IDR' }
}

/** Parse "12 terjual" -> 12. Returns 0 when not parseable. */
export function parseSold(sold: string): number {
  const m = sold.match(/(\d[\d.,]*)/)
  if (!m) return 0
  return Number.parseInt(m[1].replace(/[.,]/g, ''), 10) || 0
}
