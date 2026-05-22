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
  /** override the default "order < jam 14:00 → kirim hari sama" footer.
   *  use this for pre-order products. */
  shipNote?: string
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
    shipNote: 'pre-order 3 hari + QC 2 hari sebelum dikirim (Sukabumi)',
    bullets: [
      'Plug & play, tanpa bongkar lensa HP',
      'Full layar tanpa vignette, distorsi tepi aman',
      'Minim chromatic aberration (bayangan warna)',
    ],
    description:
      'Clamp Adapter DSLR 2026 menjepit body HP lalu mengunci lensa DSLR Canon EF atau Nikon F di depan kamera utama. Tidak perlu bongkar HP, tidak perlu lem, tidak perlu casing khusus. Cocok dipakai untuk video sinematik, portrait bokeh, hingga liputan event saat kamu cuma bawa HP. Catatan: tampilan di layar HP akan terlihat terbalik karena sifat optik lensa DSLR — gunakan aplikasi pemutar gambar (rekomendasi APK ada di gambar katalog) agar tampilan kembali normal. Status pre-order 3 hari + 2 hari QC sebelum dikirim.',
    specs: [
      { label: 'Mount', value: 'Canon EF · Nikon F' },
      { label: 'Material', value: 'Aluminium + PETG' },
      { label: 'Kompatibilitas', value: 'iPhone 11 – 16 Pro Max, Samsung S/Note, Xiaomi, Oppo, Vivo' },
      { label: 'Varian kelengkapan', value: 'Clamp Adapter saja · atau Clamp Adapter + Grip Bluetooth' },
      { label: 'Status pesanan', value: 'Pre-order 3 hari + QC 2 hari' },
      { label: 'Catatan tampilan', value: 'Layar terbalik (sifat optik) — solusi via APK pemutar gambar' },
      { label: 'Tripod mount', value: '1/4" universal' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Clamp Adapter (mount Canon EF atau Nikon F sesuai pilihan)',
      'Tutup depan & belakang lensa',
      'Grip Bluetooth Shooter V4.1 (hanya pada varian "Dengan Grip")',
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
    shipNote: 'pre-order 3 hari + QC 2 hari sebelum dikirim (Sukabumi)',
    bullets: [
      'Cocok 7Artisans, Meike, Samyang',
      'Support lensa DSLR via adapter mount Canon/Nikon',
      'Universal — semua merk HP',
    ],
    description:
      'Versi mirrorless dari Clamp Adapter. Lebih ringan dan ringkas, dirancang untuk lensa Sony E-Mount dan Micro Four Thirds, plus lensa DSLR Canon/Nikon via adapter sambungan mounting. Cocok buat creator yang sudah punya 7Artisans, Meike, Samyang dan ingin pakai di HP. Catatan: tampilan di layar HP akan terlihat terbalik karena sifat optik lensa — gunakan aplikasi pemutar gambar (rekomendasi APK ada di gambar katalog) agar tampilan kembali normal. Status pre-order 3 hari + 2 hari QC sebelum dikirim.',
    specs: [
      { label: 'Mount', value: 'Sony E · Micro Four Thirds (M4/3)' },
      { label: 'Material', value: 'Aluminium + PETG' },
      { label: 'Kompatibilitas lensa', value: '7Artisans, Meike, Samyang + lensa DSLR Canon/Nikon via adapter' },
      { label: 'Kompatibilitas HP', value: 'Universal — semua HP layar 5.5"–7"' },
      { label: 'Varian kelengkapan', value: 'Clamp Adapter saja · atau Clamp Adapter + Grip Bluetooth' },
      { label: 'Status pesanan', value: 'Pre-order 3 hari + QC 2 hari' },
      { label: 'Catatan tampilan', value: 'Layar terbalik (sifat optik) — solusi via APK pemutar gambar' },
      { label: 'Tripod mount', value: '1/4" universal' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Clamp Adapter (mount Sony E atau M4/3 sesuai pilihan)',
      'Tutup depan & belakang lensa',
      'Grip Bluetooth Shooter V4.1 (hanya pada varian "Dengan Grip")',
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
      'Gambar tidak terbalik (pakai app kamera bawaan)',
      'Sensor langsung ke lensa, minim chromatic aberration',
      'Khusus Nikon: aperture control diafragma',
    ],
    description:
      'Direc Sensor untuk lensa Canon dan Nikon. Sensor HP duduk langsung di belakang lensa DSLR — tidak ada elemen optik tambahan, sehingga hasil paling bersih, tajam, dan tidak terbalik (bisa pakai aplikasi kamera bawaan HP). Dilengkapi pengaturan FFD (Flange Focal Distance) untuk mencari titik fokus paling presisi. Khusus varian Nikon, dilengkapi aperture control untuk mengatur bukaan diafragma. PENTING: pemasangan mengharuskan lensa utama HP dicopot — wajib dikerjakan oleh tukang service HP berpengalaman, lensa yang dicopot disimpan baik-baik untuk pemakaian masa depan. Pelajari dulu sebelum beli (cek tutorial YouTube). Membeli berarti mengerti.',
    specs: [
      { label: 'Mount', value: 'Canon EF · Nikon F' },
      { label: 'FFD adjustment', value: 'Ya (rotary collar)' },
      { label: 'Aperture control', value: 'Khusus varian Nikon (pengatur bukaan diafragma)' },
      { label: 'Material', value: 'Aluminium + PETG' },
      { label: 'Aksesori', value: 'Hotshoe cold + collar tripod 1/4"' },
      { label: 'Varian kelengkapan', value: 'Clamp saja · atau Clamp + Grip Bluetooth' },
      { label: 'Pemasangan', value: 'Wajib copot lensa utama HP (oleh tukang service)' },
      { label: 'Kompatibilitas', value: 'iPhone & Android (mounting via clamp)' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Direc Sensor DSLR (mount Canon atau Nikon sesuai pilihan)',
      'Hotshoe cold (dudukan mic/lampu)',
      'Collar tripod 1/4"',
      'Aperture control ring (khusus varian Nikon)',
      'Grip Bluetooth Shooter (hanya pada varian "Clamp dan Grip")',
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
      'Gambar tidak terbalik (pakai app kamera bawaan)',
      'Sensor langsung ke lensa, minim chromatic aberration',
      'Pilih body Filamen (ringan) atau Aluminium (kokoh)',
    ],
    description:
      'Direc Sensor untuk lensa Sony E-mount. Tersedia versi filamen high-density yang ringan dan versi aluminium yang lebih kokoh. Sensor HP duduk langsung di belakang lensa — hasil bersih, tajam, tidak terbalik (bisa pakai app kamera bawaan), full layar tanpa distorsi. Pilihan favorit creator yang sudah punya 7Artisans 35mm/55mm dan ingin hasil paling tajam tanpa elemen optik tambahan. PENTING: pemasangan mengharuskan lensa utama HP dicopot — wajib dikerjakan oleh tukang service HP berpengalaman, lensa yang dicopot disimpan baik-baik. Pelajari dulu sebelum beli (cek tutorial YouTube). Membeli berarti mengerti.',
    specs: [
      { label: 'Mount', value: 'Sony E' },
      { label: 'FFD adjustment', value: 'Ya (rotary collar)' },
      { label: 'Material', value: 'Aluminium + PETG (filamen high-density)' },
      { label: 'Aksesori', value: 'Hotshoe cold + collar tripod 1/4"' },
      { label: 'Varian body', value: 'Filamen (ringan) · atau Aluminium (kokoh)' },
      { label: 'Varian kelengkapan', value: 'Clamp saja · atau Clamp + Grip Bluetooth' },
      { label: 'Pemasangan', value: 'Wajib copot lensa utama HP (oleh tukang service)' },
      { label: 'Kompatibilitas', value: 'iPhone & Android (universal)' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Direc Sensor Sony E (Filamen atau Aluminium sesuai pilihan)',
      'Hotshoe cold (dudukan mic/lampu)',
      'Collar tripod 1/4"',
      'Grip Bluetooth Shooter (hanya pada varian "Clamp dan Grip")',
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
      'Gambar tidak terbalik (pakai app kamera bawaan)',
      'Hasil full layar tanpa distorsi, minim chromatic aberration',
      'Pilih body Filamen (ringan) atau Aluminium (kokoh)',
    ],
    description:
      'Versi MFT dari Direc Sensor. Memanfaatkan flange focal distance pendek MFT untuk dapat hasil full di layar HP, tanpa distorsi tepi, gambar tidak terbalik (bisa pakai app kamera bawaan). Tersedia versi filamen high-density yang ringan dan versi aluminium yang lebih kokoh. Ideal untuk lensa Olympus, Panasonic, dan banyak lensa CCTV/cinema MFT. PENTING: pemasangan mengharuskan lensa utama HP dicopot — wajib dikerjakan oleh tukang service HP berpengalaman, lensa yang dicopot disimpan baik-baik. Pelajari dulu sebelum beli (cek tutorial YouTube). Membeli berarti mengerti.',
    specs: [
      { label: 'Mount', value: 'Micro Four Thirds (MFT)' },
      { label: 'FFD adjustment', value: 'Ya (rotary collar)' },
      { label: 'Material', value: 'Aluminium + PETG (filamen high-density)' },
      { label: 'Aksesori', value: 'Hotshoe cold + collar tripod 1/4"' },
      { label: 'Varian body', value: 'Filamen (ringan) · atau Aluminium (kokoh)' },
      { label: 'Varian kelengkapan', value: 'Clamp saja · atau Clamp + Grip Bluetooth' },
      { label: 'Pemasangan', value: 'Wajib copot lensa utama HP (oleh tukang service)' },
      { label: 'Kompatibilitas', value: 'iPhone & Android (universal)' },
      { label: 'Garansi', value: '1 bulan ganti baru' },
    ],
    inBox: [
      'Body Direc Sensor MFT (Filamen atau Aluminium sesuai pilihan)',
      'Hotshoe cold (dudukan mic/lampu)',
      'Collar tripod 1/4"',
      'Grip Bluetooth Shooter (hanya pada varian "Clamp dan Grip")',
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
      'Solusi lensa tele HP yang melorot atau slip',
      'Mudah focus manual — HP & lensa terkunci rapat',
      'Posisi HP geser naik-turun-kanan-kiri (adjustable)',
    ],
    description:
      'Rigging system untuk lensa tele HP 18x, 22x, 28x, 36x, sampai 60x. Mengunci HP dan lensa tele rapat dalam satu rig solid — solusi pasti untuk lensa tele yang melorot atau slip, sekaligus memudahkan focusing manual pada lensa tele panjang. Posisi HP bisa digeser naik-turun-kanan-kiri untuk menyesuaikan letak kamera dan tonjolan lensa. Cocok untuk lensa Apexel, TaffSPORT, Pickogen, Soha, Rockware, sampai lensbong rakitan. Dilengkapi L-bracket tripod mount 1/4" untuk orientasi portrait atau landscape. Cocok untuk fotografi jarak jauh, foto konser, hingga makro.',
    specs: [
      { label: 'Kompatibilitas lensa', value: 'Apexel (18/22/28/36/60x), TaffSPORT, Pickogen, Soha, Rockware, lensbong rakitan' },
      { label: 'Material', value: 'Filament solid + plat aluminium pada bagian pengikat' },
      { label: 'Tripod mount', value: '1/4" universal (semua tripod)' },
      { label: 'Orientasi', value: 'Portrait & landscape (L-bracket)' },
      { label: 'Penyesuaian HP', value: 'Geser naik-turun, kanan-kiri (untuk posisi kamera & tonjolan lensa)' },
      { label: 'Varian kelengkapan', value: 'Clamp Universal · Rig + Clamp · Rig + Clamp + Grip' },
      { label: 'Kompatibilitas HP', value: 'Universal — semua merk & tipe (bentuk standar)' },
      { label: 'Warna', value: 'Black matte professional' },
      { label: 'Garansi', value: 'Tanpa garansi' },
    ],
    inBox: [
      'Body bracket rigging',
      'L-bracket portrait/landscape',
      'Clamp universal HP',
      'Rig (varian Rig+Clamp atau Rig+Clamp+Grip)',
      'Grip Bluetooth (hanya varian Rig+Clamp+Grip)',
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
      'Genggam HP nyaman & praktis saat shooting',
      'Bluetooth V4.1 remote shutter terintegrasi',
      'Order < jam 14:00 → kirim hari yang sama',
    ],
    description:
      'Hade Grip Kamera HP — alat bantu untuk menggenggam HP saat menggunakan kameranya, terasa nyaman dan praktis seperti pegang kamera DSLR. Selain memberi kenyamanan, grip ini juga memberi tampilan dan kemudahan kontrol kamera HP via remote shutter Bluetooth V4.1 — kamu bisa memotret atau start-stop video tanpa menyentuh layar.',
    specs: [
      { label: 'Bluetooth', value: 'V4.1 remote shutter' },
      { label: 'Kompatibilitas', value: 'iOS & Android — semua app kamera default' },
      { label: 'Kategori', value: 'Phone grip' },
      { label: 'Garansi', value: 'Tanpa garansi' },
    ],
    inBox: [
      'Phone grip',
      'Remote shutter Bluetooth V4.1',
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
