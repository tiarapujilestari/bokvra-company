# Bokvra Coffee & Resto — Company Profile Website

Website company profile untuk **Bokvra Coffee & Resto**, dibangun dengan React + Vite +
**TypeScript** dan Tailwind CSS.

## Menjalankan Proyek

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

Untuk build produksi:

```bash
npm run build
npm run preview
```

## Halaman yang Tersedia

| Rute           | Halaman                                                              |
| -------------- | -------------------------------------------------------------------- |
| `/`            | Beranda — hero dengan efek mouse-tracking, overview, menu, testimoni |
| `/about`       | Tentang Kami — sejarah, milestone, budaya kerja                      |
| `/services`    | Menu & Layanan — daftar produk dengan filter kategori dan harga      |
| `/teams`       | Tim — data anggota tim diambil langsung dari `randomuser.me`         |
| `/blog`        | Daftar Blog — grid tulisan dengan filter tag                         |
| `/blog/:id`    | Detail satu tulisan blog                                             |
| `/blog/create` | Tulis blog baru (**hanya untuk pengguna yang sudah masuk**)          |
| `/login`       | Masuk / daftar akun                                                  |

Untuk mencoba fitur "Tulis Blog" tanpa mendaftar akun baru:
Atau klik "Daftar di sini" pada halaman login untuk membuat akun baru.

## Autentikasi & Penyimpanan Blog

Agar proyek ini bisa langsung jalan begitu di-`npm install`, tanpa perlu API key atau setup
backend apa pun, autentikasi dan penyimpanan blog saat ini berjalan di atas `localStorage`
browser (lihat `src/context/AuthContext.tsx` dan `src/context/BlogContext.tsx`).

Kedua context ini sengaja ditulis dengan interface yang sederhana (`login`, `register`, `logout`,
`addPost`, `getPost`) sehingga mudah diganti ke backend sungguhan seperti **Backendless** — cukup
ganti isi fungsi di dalam kedua file tersebut dengan pemanggilan REST API / SDK Backendless,
tanpa perlu mengubah halaman-halaman yang memakainya.

## Struktur Proyek

```
src/
├── assets/images/     # Foto produk & bangunan Bokvra
├── components/        # Navbar, Footer, kartu produk/testimoni, efek hero, dll.
├── context/            # AuthContext & BlogContext
├── data/               # Data menu, testimoni, dan seed blog
├── pages/              # Satu file per halaman/rute
├── types/               # Tipe TypeScript bersama
├── App.tsx
├── main.tsx
└── index.css
```

## Desain

- **Font:** Fraunces (display) + Plus Jakarta Sans (body/UI)
- **Palet:** espresso coklat tua, karamel, hijau matcha, krem hangat — diambil langsung dari
  warna minuman dan interior Bokvra
- **Signature interaction:** efek "uap kopi" yang mengikuti kursor di hero halaman Beranda
  (`src/components/SteamCursor.tsx`)
- Animasi scroll-reveal dan hover halus menggunakan Framer Motion, dengan
  `prefers-reduced-motion` dihormati secara otomatis

## Tech Stack

- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- Framer Motion
- randomuser.me API (halaman Tim)
