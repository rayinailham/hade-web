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
 * Open Shopee product link. On Android, tries to launch the Shopee app
 * directly without leaving the hade page or spawning an extra tab.
 *
 * Strategy:
 * - Android: set `location.href` to an `intent://` URL targeting the Shopee
 *   package. Chrome hands it to the app — current tab is NOT navigated.
 *   If the app isn't installed, a 1.5s timer opens shopee.co.id in a new
 *   tab as a fallback. We watch `visibilitychange`: if the page is
 *   backgrounded the app launched, so we skip the fallback.
 * - iOS / desktop: rely on the default `target="_blank"` anchor (universal
 *   links route iOS users into the app automatically when installed).
 *
 * Usage in template:
 *   <a :href="url" target="_blank" @click="openShopeeProduct(url, $event)">
 */
export function openShopeeProduct(webUrl: string, e?: Event): void {
  if (typeof window === 'undefined' || !webUrl) return

  const ua = navigator.userAgent || ''
  const isAndroid = /android/i.test(ua)
  if (!isAndroid) return

  let parsed: URL
  try {
    parsed = new URL(webUrl)
  } catch {
    return
  }

  e?.preventDefault()

  // No `S.browser_fallback_url` — we don't want Chrome to auto-navigate the
  // current tab if the app is missing. We control the fallback ourselves.
  const path = `${parsed.host}${parsed.pathname}${parsed.search}`
  const intentUrl =
    `intent://${path}` +
    `#Intent;scheme=https;package=com.shopee.id;end`

  let fallbackFired = false
  const fallbackTimer = window.setTimeout(() => {
    fallbackFired = true
    window.open(webUrl, '_blank', 'noopener,noreferrer')
  }, 1500)

  const onVisibility = () => {
    // App took over → page is hidden. Cancel the fallback so we don't open
    // an extra tab when the user comes back.
    if (document.visibilityState === 'hidden' && !fallbackFired) {
      window.clearTimeout(fallbackTimer)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }
  document.addEventListener('visibilitychange', onVisibility)

  // Fire the intent in the current tab. If the app is installed Chrome
  // routes it to Shopee without changing this page; if not, our timeout
  // opens the web URL in a new tab.
  window.location.href = intentUrl
}
