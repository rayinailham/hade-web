// Contact info & link helpers for hade creative
// Penjualan utama: WhatsApp langsung (discount 10% + gratis ongkir)
// Shopee tetap tersedia sebagai opsi alternatif.

export const WA_NUMBER = '6285281839911'
export const WA_DISPLAY = '+62 852-8183-9911'
export const SHOPEE_STORE = 'https://s.shopee.co.id/4AwuG0d1or'
export const DISCOUNT_PERCENT = 10

const DEFAULT_MESSAGE =
  'Halo Hade, saya tertarik dengan produk adapter lensa. Boleh dibantu pesan via WhatsApp (discount 10% + gratis ongkir)?'

/**
 * Bangun URL wa.me dengan pesan opsional.
 * @param message - teks bebas atau nama produk
 */
export function waLink(message?: string): string {
  const text = message?.trim() || DEFAULT_MESSAGE
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`
}

/**
 * URL WhatsApp khusus untuk satu produk.
 * Menyertakan nama produk + harga supaya admin Hade langsung tahu konteks.
 */
export function waProductLink(productName: string, price?: string): string {
  const lines = [
    `Halo Hade, saya mau pesan: ${productName}`,
    price ? `Harga di Shopee: ${price}` : '',
    'Saya ambil penawaran via WA (discount 10% + gratis ongkir).',
    'Mohon info ketersediaan & total akhirnya. Terima kasih.',
  ].filter(Boolean)
  return waLink(lines.join('\n'))
}

/**
 * Open Shopee product link. Tries to open the native Shopee app on mobile
 * without leaving the current tab.
 *
 * - Android: opens a new tab with an `intent://` URL — Chrome launches the
 *   Shopee app if installed, otherwise auto-falls back to the regular web URL
 *   inside that same new tab via `S.browser_fallback_url`.
 * - iOS: lets the default `target="_blank"` anchor open in a new tab. iOS
 *   universal links route `https://shopee.co.id/...` straight to the Shopee
 *   app when installed, otherwise the new tab simply shows the web page.
 * - Desktop: lets the default anchor open in a new tab.
 *
 * Usage in template:
 *   <a :href="url" target="_blank" @click="openShopeeProduct(url, $event)">
 */
export function openShopeeProduct(webUrl: string, e?: Event): void {
  if (typeof window === 'undefined' || !webUrl) return

  const ua = navigator.userAgent || ''
  const isAndroid = /android/i.test(ua)

  // Only Android needs custom handling — iOS + desktop ride on `target="_blank"`
  // and (on iOS) universal links.
  if (!isAndroid) return

  // Use HTTPS scheme + package targeting. Shopee app registers as default
  // handler for shopee.co.id app-links and routes the URL to the correct
  // product page. Custom shopeeid:// schemes often dump users on the home
  // screen because the path format keeps changing.
  let parsed: URL
  try {
    parsed = new URL(webUrl)
  } catch {
    return
  }

  e?.preventDefault()
  const path = `${parsed.host}${parsed.pathname}${parsed.search}`
  const intentUrl =
    `intent://${path}` +
    `#Intent;scheme=https;package=com.shopee.id;` +
    `S.browser_fallback_url=${encodeURIComponent(webUrl)};end`

  const opened = window.open(intentUrl, '_blank', 'noopener,noreferrer')
  if (!opened) {
    // Popup blocked — fall back to plain web URL in a new tab. If even that
    // fails (rare), navigate the current tab as a last resort.
    const fallback = window.open(webUrl, '_blank', 'noopener,noreferrer')
    if (!fallback) window.location.href = webUrl
  }
}
