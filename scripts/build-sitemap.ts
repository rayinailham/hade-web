// Build-time sitemap generator. Run with `npm run build:sitemap`.
// Reads product slugs from src/data/products.ts and writes public/sitemap.xml
// with lastmod (current date) + image:image entries.

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const SITE_URL = (process.env.VITE_SITE_URL || 'https://hade-web.vercel.app').replace(/\/+$/, '')

interface SitemapProduct {
  slug: string
  name: string
  mount: string
  image: string
}

// Lightweight scrape of products.ts — avoids running TS at build time. We
// just need slug + first image + name + mount per product.
function loadProducts(): SitemapProduct[] {
  const src = readFileSync(resolve(ROOT, 'src/data/products.ts'), 'utf8')
  const out: SitemapProduct[] = []

  // Match each `{ slug: '...', ... images: IMG('folder', [...]) }` block.
  const blockRe = /\{\s*slug:\s*'([^']+)'[\s\S]*?images:\s*IMG\(\s*'([^']+)'\s*,\s*\[\s*'([^']+)'/g
  const nameRe = /\{\s*slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?mount:\s*'([^']+)'/g

  const meta = new Map<string, { name: string; mount: string }>()
  let nm: RegExpExecArray | null
  while ((nm = nameRe.exec(src)) !== null) {
    meta.set(nm[1], { name: nm[2], mount: nm[3] })
  }

  let m: RegExpExecArray | null
  while ((m = blockRe.exec(src)) !== null) {
    const [, slug, folder, file] = m
    const info = meta.get(slug) ?? { name: slug, mount: '' }
    out.push({
      slug,
      name: info.name,
      mount: info.mount,
      image: `/${encodeURI(folder)}/${encodeURI(file)}`,
    })
  }
  return out
}

function xmlEscape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function buildSitemap(products: SitemapProduct[]): string {
  const today = new Date().toISOString().slice(0, 10)

  const staticUrls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    { loc: `${SITE_URL}/products`, priority: '0.9' },
  ]

  const lines: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
  ]

  for (const u of staticUrls) {
    lines.push('  <url>')
    lines.push(`    <loc>${u.loc}</loc>`)
    lines.push(`    <lastmod>${today}</lastmod>`)
    lines.push(`    <priority>${u.priority}</priority>`)
    lines.push('  </url>')
  }

  for (const p of products) {
    const url = `${SITE_URL}/products/${p.slug}`
    const imgUrl = `${SITE_URL}${p.image}`
    const title = xmlEscape(`${p.name} — ${p.mount}`)
    lines.push('  <url>')
    lines.push(`    <loc>${url}</loc>`)
    lines.push(`    <lastmod>${today}</lastmod>`)
    lines.push('    <priority>0.8</priority>')
    lines.push('    <image:image>')
    lines.push(`      <image:loc>${imgUrl}</image:loc>`)
    lines.push(`      <image:title>${title}</image:title>`)
    lines.push('    </image:image>')
    lines.push('  </url>')
  }

  lines.push('</urlset>', '')
  return lines.join('\n')
}

function main() {
  const products = loadProducts()
  if (!products.length) {
    console.error('[build-sitemap] no products parsed from src/data/products.ts')
    process.exit(1)
  }
  const xml = buildSitemap(products)
  const out = resolve(ROOT, 'public/sitemap.xml')
  writeFileSync(out, xml, 'utf8')
  console.log(`[build-sitemap] wrote ${products.length + 2} URLs to ${out}`)
}

main()
