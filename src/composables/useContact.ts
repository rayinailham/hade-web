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
