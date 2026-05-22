// Shared product catalog. Single source of truth for landing carousel,
// /products catalog page and /products/:slug detail page.

export type ProductFamily = 'Clamp' | 'Direc Sensor' | 'Bracket' | 'Grip'

export interface ProductSpec {
  label: string
  value: string
}

export interface Product {
  /** stable URL slug */
  slug: string
  /** ordinal index for editorial display ("01" .. "07") */
  index: string
  family: ProductFamily
  name: string
  /** short headline used inside cards */
  tagline: string
  /** lens / mount label */
  mount: string
  price: string
  rating: string
  sold: string
  best?: boolean
  /** 3 short bullet points used on landing carousel */
  bullets: string[]
  /** longer paragraph used on detail page */
  description: string
  /** structured spec rows for the detail page */
  specs: ProductSpec[]
  /** what is in the box */
  inBox: string[]
  /** Shopee permalink */
  link: string
  /** image folder + filenames in /public */
  images: string[]
}

const IMG = (folder: string, files: string[]): string[] =>
  files.map((f) => `/${encodeURI(folder)}/${encodeURI(f)}`)

export const products: Product[] = [
  {
    slug: 'clamp-adapter-dslr-2026',
    index: '01',
    family: 'Clamp',
    name: 'Clamp Adapter DSLR 2026',
    tagline: 'Adapter clamp untuk lensa DSLR Canon EF & Nikon F.',
    mount: 'Canon EF · Nikon F',
    price: 'Rp 895.000 – 1.060.000',
    rating: '4.7',
    sold: '12 terjual',
    bullets: [
      'Plug & play, tanpa bongkar lensa HP',
      'Hasil full layar tanpa vignette',
      'Paket sudah termasuk Grip Bluetooth V4.1',
    ],
    description:
      'Clamp Adapter DSLR 2026 menjepit body HP lalu mengunci lensa DSLR Canon EF atau Nikon F di depan kamera utama. Tidak perlu bongkar HP, tidak perlu lem, tidak perlu casing khusus. Cocok dipakai untuk video sinematik, portrait bokeh, hingga liputan event saat kamu cuma bawa HP.',
    specs: [
      { label: 'Mount', value: 'Canon EF · Nikon F' },
      { label: 'Material', value: 'Aluminium CNC + clamp karet' },
      { label: 'Kompatibilitas', value: 'iPhone 11 – 16 Pro Max, Samsung S/Note, Xiaomi, Oppo, Vivo' },
      { label: 'Berat', value: '± 320 g' },
      { label: 'Tripod mount', value: '1/4" universal' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Clamp Adapter DSLR',
      'Mount ring Canon EF / Nikon F (sesuai pilihan)',
      'Grip Bluetooth Shooter V4.1',
      'Pouch + buku panduan',
    ],
    link: 'https://shopee.co.id/Hade-Clamp-Adapter-Lensa-DSLR-Canon-Nikon-to-Handphone-versi-2026-Hade-Creative-Production-i.43595306.26620033169?extraParams=%7B%22display_model_id%22%3A177014270531%2C%22model_selection_logic%22%3A3%7D',
    images: IMG(
      'Hade Clamp Adapter Lensa DSLR CanonNikon to Handphone versi 2026 Hade Creative Production',
      [
        'id-11134207-822wp-mmz0luinyy2q9d.webp',
        'id-11134207-822wi-mmz0luidxy4id0.webp',
        'id-11134207-822wi-mmz0luiprk759f.webp',
        'id-11134207-822wk-mmz0luiafj0le8.webp',
        'id-11134207-822wk-mmz0luio0cn683.webp',
        'id-11134207-822wn-mmz0luipvrwhe4.webp',
      ],
    ),
  },
  {
    slug: 'clamp-adapter-mirrorless-2026',
    index: '02',
    family: 'Clamp',
    name: 'Clamp Adapter Mirrorless 2026',
    tagline: 'Versi ringan untuk pengguna lensa mirrorless.',
    mount: 'Sony E-Mount · MFT',
    price: 'Rp 598.000 – 760.000',
    rating: '4.7',
    sold: '50 terjual',
    bullets: [
      'Cocok 7Artisans, Meike, Samyang',
      'Mendukung lensa DSLR via adapter',
      'Universal – semua merk HP',
    ],
    description:
      'Versi mirrorless dari Clamp Adapter. Lebih ringan dan ringkas, dirancang untuk lensa Sony E-Mount, Micro Four Thirds, plus lensa DSLR via adapter ring. Cocok buat creator yang sudah punya 7Artisans, Meike, Samyang dan ingin pakai di HP.',
    specs: [
      { label: 'Mount', value: 'Sony E · Micro Four Thirds' },
      { label: 'Material', value: 'Aluminium CNC + clamp karet' },
      { label: 'Kompatibilitas', value: 'Universal — semua HP layar 5.5"–7"' },
      { label: 'Berat', value: '± 240 g' },
      { label: 'Tripod mount', value: '1/4" universal' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Clamp Adapter Mirrorless',
      'Mount ring sesuai pilihan',
      'Pouch + buku panduan',
    ],
    link: 'https://shopee.co.id/Hade-Clamp-Adapter-Lensa-Mirrorless-to-Handphone-versi-2026-Hade-Creative-Production-i.43595306.10357387631?extraParams=%7B%22display_model_id%22%3A139370555716%2C%22model_selection_logic%22%3A3%7D',
    images: IMG(
      'Hade Clamp Adapter Lensa Mirrorless to Handphone versi 2026 Hade Creative Production',
      [
        'id-11134207-822wh-mnk7uwzxzm6g5e.webp',
        'id-11134207-822wh-mnk7ux03khdte7.webp',
        'id-11134207-822wj-mnk7ux03swsj04.webp',
        'id-11134207-822wl-mnk7ux03lvy96b.webp',
      ],
    ),
  },
  {
    slug: 'direc-sensor-dslr-ffd',
    index: '03',
    family: 'Direc Sensor',
    name: 'Direc Sensor DSLR – FFD',
    tagline: 'Sensor langsung ke lensa, tanpa kaca optik tambahan.',
    mount: 'Canon · Nikon',
    price: 'Rp 325.000 – 495.000',
    rating: '4.5',
    sold: '16 terjual',
    bullets: [
      'Gambar tidak terbalik',
      'FFD setting untuk fokus presisi',
      'Hotshoe + collar tripod',
    ],
    description:
      'Direc Sensor untuk lensa Canon dan Nikon. Sensor HP duduk langsung di belakang lensa DSLR — tidak ada elemen optik tambahan, sehingga hasil paling bersih dan tajam. Dilengkapi pengaturan FFD (Flange Focal Distance) untuk mencari titik fokus paling presisi.',
    specs: [
      { label: 'Mount', value: 'Canon EF · Nikon F' },
      { label: 'FFD adjustment', value: 'Ya (rotary collar)' },
      { label: 'Material', value: 'Aluminium CNC + filamen high-density' },
      { label: 'Aksesori', value: 'Hotshoe cold + collar tripod 1/4"' },
      { label: 'Kompatibilitas', value: 'iPhone & Android (mounting via clamp)' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Direc Sensor DSLR',
      'Mount ring Canon / Nikon',
      'Collar tripod 1/4"',
      'Buku panduan FFD',
    ],
    link: 'https://shopee.co.id/Hade-Clamp-Adaptor-Direc-Sensor-DSLR-Canon-Nikon-to-Handphone-dilengkapi-dengan-pengaturan-jarak-Sensor-ke-Mounting-(FFD-Seting)-Hade-Creative-Production-i.43595306.42407425312?extraParams=%7B%22display_model_id%22%3A340106906839%2C%22model_selection_logic%22%3A3%7D',
    images: IMG(
      'Hade Clamp Adaptor Direc Sensor DSLR CanonNikon to Handphone dilengkapi dengan pengaturan jarak Sensor ke Mounting (FFD Seting)',
      [
        'id-11134207-8224s-mgqtgz8z0zrd7f.webp',
        'id-11134207-8224s-mhhjxy4opa8029.webp',
        'id-11134207-8224t-mgqtgz8z3sw960.webp',
        'id-11134207-82250-mgqtgz8z2ebte4.webp',
        'id-11134207-82251-mgqtgz8yvdhl56.webp',
      ],
    ),
  },
  {
    slug: 'direc-sensor-sony-emount',
    index: '04',
    family: 'Direc Sensor',
    name: 'Direc Sensor Sony E-mount',
    tagline: 'Direct sensor untuk sistem Sony E.',
    mount: 'Sony E',
    price: 'Rp 185.000 – 450.000',
    rating: '4.9',
    sold: '22 terjual',
    bullets: [
      'Sensor langsung ke lensa',
      'Minim chromatic aberration',
      'Filamen atau aluminium',
    ],
    description:
      'Direc Sensor untuk lensa Sony E-mount. Tersedia versi filamen high-density yang ringan dan versi aluminium CNC yang lebih kokoh. Pilihan favorit creator yang sudah punya 7Artisans 35mm/55mm dan ingin hasil paling tajam tanpa elemen optik tambahan.',
    specs: [
      { label: 'Mount', value: 'Sony E' },
      { label: 'FFD adjustment', value: 'Ya (rotary collar)' },
      { label: 'Material', value: 'Filamen high-density / aluminium CNC' },
      { label: 'Aksesori', value: 'Hotshoe cold + collar tripod 1/4"' },
      { label: 'Berat', value: '± 140 g (filamen) / ± 220 g (aluminium)' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Direc Sensor Sony E',
      'Collar tripod 1/4"',
      'Buku panduan FFD',
    ],
    link: 'https://shopee.co.id/Hade-Clamp-Adaptor-Direc-Sensor-Lensa-Sony-E-mount-to-Handphone-dilengkapi-dengan-pengaturan-jarak-Sensor-ke-Mounting-(FFD-Seting)-Hade-Creative-Production-i.43595306.55800543344?extraParams=%7B%22display_model_id%22%3A118769876586%2C%22model_selection_logic%22%3A3%7D',
    images: IMG(
      'Hade Clamp Adaptor Direc Sensor Lensa Sony E-mount to Handphone dilengkapi dengan pengaturan jarak Sensor ke Mounting (FFD Seting)',
      [
        'id-11134207-82250-mggly2zgkwzz44.webp',
        'id-11134207-8224t-mggly2zgjifj39.webp',
        'id-11134207-8224x-mggly30l766n8c.webp',
        'id-11134207-8224x-mghulx5pnjm4c0.webp',
        'id-11134207-82251-mggly2zr1d6yb8.webp',
      ],
    ),
  },
  {
    slug: 'direc-sensor-mft',
    index: '05',
    family: 'Direc Sensor',
    name: 'Direc Sensor MFT',
    tagline: 'Direct sensor untuk Micro Four Thirds.',
    mount: 'Micro Four Thirds',
    price: 'Rp 185.000 – 450.000',
    rating: '5.0',
    sold: '1 terjual',
    bullets: [
      'Hasil full layar tanpa distorsi',
      'Fleksibel semua tipe HP',
      'FFD setting',
    ],
    description:
      'Versi MFT dari Direc Sensor. Memanfaatkan flange focal distance pendek MFT untuk dapat hasil full-frame di sensor HP, tanpa distorsi tepi. Ideal untuk lensa Olympus, Panasonic, dan banyak lensa CCTV/cinema MFT.',
    specs: [
      { label: 'Mount', value: 'Micro Four Thirds (MFT)' },
      { label: 'FFD adjustment', value: 'Ya (rotary collar)' },
      { label: 'Material', value: 'Filamen high-density / aluminium CNC' },
      { label: 'Aksesori', value: 'Hotshoe cold + collar tripod 1/4"' },
      { label: 'Berat', value: '± 130 g (filamen) / ± 210 g (aluminium)' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Direc Sensor MFT',
      'Collar tripod 1/4"',
      'Buku panduan FFD',
    ],
    link: 'https://shopee.co.id/Hade-Clamp-Adaptor-Direc-Sensor-Lensa-MFT-to-Handphone-dilengkapi-dengan-pengaturan-jarak-Sensor-ke-Mounting-(FFD-Seting)-Hade-Creative-Production-i.43595306.57806541850?extraParams=%7B%22display_model_id%22%3A244172744797%2C%22model_selection_logic%22%3A3%7D',
    images: IMG(
      'Hade Clamp Adaptor Direc Sensor Lensa MFT to Handphone dilengkapi dengan pengaturan jarak Sensor ke Mounting (FFD Seting)',
      [
        'id-11134207-822wi-mmaiuhd7hw5f0a@resize_w900_nl.webp',
        'id-11134207-822wk-mmaiuhd7ghkzbc.webp',
        'id-11134207-822wl-mma0sn4heiv98d.webp',
        'id-11134207-822wq-mmaiuhd7japv73.webp',
        'id-11134207-822ws-mmaiuhd124g1a7.webp',
      ],
    ),
  },
  {
    slug: 'bracket-rigging-system-2026',
    index: '06',
    family: 'Bracket',
    name: 'Bracket Rigging System 2026',
    tagline: 'Solusi pasti untuk lensa tele HP yang melorot.',
    mount: 'Universal Tele 18x – 60x',
    price: 'Rp 180.000 – 545.000',
    rating: '4.8',
    sold: '107 terjual',
    best: true,
    bullets: [
      'Solusi lensa tele yang melorot',
      'Mounting tripod 1/4 inch',
      'L-bracket portrait & landscape',
    ],
    description:
      'Rigging system untuk lensa tele HP 18x, 22x, 36x, sampai 60x. Mengunci lensa tele agar tidak miring atau melorot saat dipasang ke HP. Cocok untuk lensa Apexel, TaffSPORT, Pickogen, Soha dan banyak merk universal lainnya. Tersedia mounting tripod 1/4" dan opsi L-bracket portrait/landscape.',
    specs: [
      { label: 'Kompatibilitas lensa', value: 'Tele 18x – 60x universal (Apexel, TaffSPORT, Pickogen, Soha)' },
      { label: 'Material', value: 'Aluminium CNC' },
      { label: 'Tripod mount', value: '1/4" universal' },
      { label: 'Orientasi', value: 'Portrait & landscape (L-bracket)' },
      { label: 'Berat', value: '± 280 g' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body bracket rigging',
      'L-bracket portrait/landscape',
      'Baut tripod 1/4"',
      'Buku panduan',
    ],
    link: 'https://shopee.co.id/Hade-Bracket-Lensa-Tele-Handphone-(18X-22X-36X-60X)-Rigging-System-2026-Cocok-untuk-Apexel-TaffSPORT-Pickogen-Soha-DLL.-Hade-Creative-Production-i.43595306.21362770833?extraParams=%7B%22display_model_id%22%3A29771564472%2C%22model_selection_logic%22%3A3%7D',
    images: IMG(
      'Hade Bracket Lensa Tele Handphone (18X, 22X, 36X & 60X) Rigging System 2026 Cocok untuk Apexel, TaffSPORT, Pickogen, Soha DLL',
      [
        'id-11134207-822wl-mma0sn4ge03z68.webp',
        'id-11134207-822wh-mnhndq6a8glg3a.webp',
        'id-11134207-822wi-mnhndq6a721048.webp',
        'id-11134207-822wn-mma0sn4h1vr9fa.webp',
        'id-11134207-822wo-mma0sn4h3abp80.webp',
      ],
    ),
  },
  {
    slug: 'phone-grip-bluetooth-shooter',
    index: '07',
    family: 'Grip',
    name: 'Phone Grip + Bluetooth Shooter',
    tagline: 'Grip ergonomis dengan remote shutter Bluetooth V4.1.',
    mount: 'Universal',
    price: 'Rp 180.000',
    rating: '4.9',
    sold: '25 terjual',
    bullets: [
      'Bluetooth V4.1 remote shutter',
      'Ergonomis seperti DSLR',
      'Order < jam 14:00 kirim hari yang sama',
    ],
    description:
      'Phone grip dengan remote shutter Bluetooth terintegrasi. Pegangan ergonomis ala DSLR membuat tangan tidak cepat lelah saat shooting lama, dan tombol shutter di grip memungkinkan kamu memotret/start-stop video tanpa menyentuh layar.',
    specs: [
      { label: 'Bluetooth', value: 'V4.1, jangkauan ± 10 m' },
      { label: 'Baterai', value: 'Coin cell, tahan ± 6 bulan pemakaian normal' },
      { label: 'Material', value: 'Polycarbonate + grip karet tekstur' },
      { label: 'Kompatibilitas', value: 'iOS & Android — semua app kamera default' },
      { label: 'Berat', value: '± 95 g' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Phone grip',
      'Remote shutter Bluetooth',
      'Baterai coin cell',
      'Buku panduan pairing',
    ],
    link: 'https://shopee.co.id/Hade-Phone-Grip-hade-dengan-Bluetooth-Shooter-Hade-Creative-Production-i.43595306.20921822019?extraParams=%7B%22display_model_id%22%3A185568023369%2C%22model_selection_logic%22%3A3%7D',
    images: IMG(
      'Hade Phone Grip hade dengan Bluetooth Shooter Hade Creative Production',
      [
        'id-11134207-8224q-mhij3ck9z5l139.webp',
        'id-11134207-8224q-mhij3ckjkpaa5a.webp',
        'id-11134207-8224r-mhij3ckjhw5c94.webp',
        'id-11134207-8224t-mhij3ckzynt2cd.webp',
        'id-11134207-8224y-mhij3ckj2fwg5f.webp',
      ],
    ),
  },
]

export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
