# hade-web

Marketing site for **Hade Creative** — adapter clamp, direc sensor, bracket tele, dan grip Bluetooth untuk pasang lensa DSLR / mirrorless ke smartphone. Brand asal Sukabumi, aktif sejak ~2017.

Live: <https://hade-web.vercel.app>

## Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite 6** + **vite-ssg** (static site generation, pre-render semua route)
- **Vue Router 4**
- **@unhead/vue** (per-route meta, canonical, OG)
- **GSAP** (hero reveal, scroll-triggered motion)
- **Lenis** (smooth scroll, desktop-only)
- **TypeScript**

Pre-rendered routes (lihat `vite.config.ts`):

- `/`
- `/products`
- `/products/:slug` — di-expand per item dari `src/data/products.ts`

## Struktur

```
src/
  components/      # HeroSection, ProductCard, IntroScreen, dll.
  views/           # HomeView, ProductsView, ProductDetailView, NotFoundView
  data/products.ts # source of truth katalog (slug → SSG routes)
  router/          # vue-router config
  composables/
  styles/
public/            # robots.txt, sitemap.xml, og-default.jpg, favicon
scripts/
  build-sitemap.ts # generate sitemap.xml dari products
docs/
  about-hade.md    # brand brief & katalog detail
```

## Scripts

```bash
npm install
npm run dev           # vite dev server (port 5173)
npm run build         # build:sitemap + vue-tsc + vite-ssg build
npm run build:sitemap # regenerate public/sitemap.xml
npm run preview       # preview build hasil SSG
npm run type-check    # vue-tsc --noEmit
```

`npm run build` urutannya: generate sitemap → type-check → SSG build ke `dist/`.

## Deploy

Hosted di **Vercel** (`vercel.json`). Push ke `main` → deploy otomatis.

Output `dist/` adalah static HTML, bisa juga di-host di hosting statis apa pun (Netlify, Cloudflare Pages, GitHub Pages).

## Performance & SEO

- SSG penuh — setiap route punya HTML standalone untuk crawler & first paint
- Manual chunk split: `gsap`, `lenis`, `vue-router`, `vue`, `unhead` (lihat `vite.config.ts`)
- Mobile skip Lenis / IntroScreen / custom scrollbar / blur effect untuk hemat bundle
- Font preload: Geist 500 + Fraunces 300 (woff2) untuk hindari FOUT di hero
- `@unhead/vue` set canonical, OG, Twitter card per-route
- `public/sitemap.xml` digenerate dari katalog produk
- Google Search Console verification via meta tag

## Konten

Brand brief, katalog lengkap, harga, dan kompatibilitas lensa ada di [`docs/about-hade.md`](docs/about-hade.md).

## Lisensi

Proprietary — © Hade Creative Production.
