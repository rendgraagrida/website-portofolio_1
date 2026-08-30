# Rencana Implementasi: Milestone 02 - Frontend UI

Fokus pada iterasi ini adalah membangun antarmuka statis dengan *vibe* yang _earthy_, hangat, dan merakyat ala "Tuku", sesuai dengan `decisions/002-vibe.md`. Kita akan memprioritaskan desain *Mobile-First* menggunakan Tailwind CSS dan mengekstrak elemen ke komponen React (DRY).

## User Review Required
> [!IMPORTANT]
> **Penggunaan Komponen React vs Astro**: Sesuai `frontend-rules.md`, saya akan membuat semua elemen UI sebagai komponen React (`.tsx`) dan merakitnya di dalam `src/pages/index.astro`. Hal ini memudahkan jika ke depannya ada interaktivitas (seperti pada Slider). Apakah Anda setuju dengan pendekatan ini, atau Anda ingin komponen statis (seperti Footer) tetap dibuat dalam format `.astro`?

> [!TIP]
> **Data Mockup**: Karena backend belum terhubung (Milestone 3), saya akan menggunakan *dummy data* sementara di dalam _Project Slider_ dan _Tech Grid_.

## Proposed Changes

---

### Setup Layout Utama
#### [MODIFY] `frontend/src/layouts/Layout.astro`
- Menghapus boilerplate Astro.
- Mengatur struktur HTML dasar dengan `<main>` dan memanggil `global.css`.
- Menerapkan _background_ `bg-earth-100` dan teks `text-earth-900`.

#### [MODIFY] `frontend/src/pages/index.astro`
- Merakit semua komponen utama (Navbar, Hero, Slider, Grid, Footer) di halaman beranda ini.

---

### Pembuatan Komponen React
Semua komponen akan dibuat di dalam `frontend/src/components/`.

#### [NEW] `frontend/src/components/Navbar.tsx`
- Navigasi atas yang minimalis dan *mobile-friendly*.

#### [NEW] `frontend/src/components/Hero.tsx`
- Menampilkan sapaan hangat ("Halo, Tetangga!" atau semacamnya) ala Tuku menggunakan prinsip *copywriting* ramah.
- Padding luas dan tipografi tebal namun santai.

#### [NEW] `frontend/src/components/ProjectSlider.tsx`
- Menggantikan "menu kopi" dengan _carousel_ horizontal (bisa di-*scroll* menyamping di *mobile*).
- Menampilkan kartu-kartu proyek dengan ujung melengkung (`rounded-xl`), bayangan lembut, dan warna `bg-tuku-cream` atau `bg-earth-200`.

#### [NEW] `frontend/src/components/TechGrid.tsx`
- Menggantikan "Toserba Tuku" dengan *grid* susunan teknologi yang Anda kuasai.
- Desain *grid* kotak-kotak rapi dengan _padding_ luas.

#### [NEW] `frontend/src/components/Footer.tsx`
- Area lokasi dan sosial media dengan nuansa yang sedikit lebih gelap (`bg-earth-800` atau `bg-tuku-dark`) untuk kontras yang membumi.

## Verification Plan

### Manual Verification
- Menjalankan `bun run dev:frontend` dari *root* direktori.
- Membuka `http://localhost:4321` di peramban.
- Mengecek responsivitas di layar *mobile* (Mobile-First) dan warna palet _earthy_ yang diimplementasikan.
- Memastikan efek geser (*scroll* horizontal) pada `ProjectSlider` berjalan lancar.
