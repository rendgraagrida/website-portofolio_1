# Rencana Implementasi: Milestone 01 - Setup Engine

Melakukan inisialisasi awal untuk "Mesin" utama proyek yang terdiri dari Frontend (Astro + React) dan Backend (Bun + Elysia) serta menyambungkan ORM Drizzle ke Turso (Edge SQLite).

## User Review Required
> [!IMPORTANT]
> **Struktur Direktori**: Karena kita memiliki Frontend dan Backend yang terpisah, saya mengusulkan struktur _monorepo_ sederhana. Frontend akan diletakkan di dalam folder `frontend/` dan Backend di dalam `backend/`. Apakah Anda setuju dengan struktur folder terpisah ini, atau Anda ingin menggabungkannya dalam satu _root_ yang sama? (Direkomendasikan terpisah agar konfigurasi Astro dan Elysia tidak saling berbenturan).

## Proposed Changes

---

### Inisialisasi Backend (Elysia + Bun)
- Membuat folder `backend/` menggunakan `bun create elysia backend`.
- Menginstal dependensi Drizzle ORM (`drizzle-orm`, `drizzle-kit`) dan Turso client (`@libsql/client`).
- Membuat file konfigurasi Drizzle (`drizzle.config.ts`) dan skema database awal (`src/db/schema.ts`).
- Mengatur koneksi awal Turso di `src/db/index.ts` menggunakan *environment variables* yang disyaratkan oleh `tools/check-env.ts` (`TURSO_DATABASE_URL` & `TURSO_AUTH_TOKEN`).

### Inisialisasi Frontend (Astro + React + Tailwind)
- Membuat folder `frontend/` menggunakan `bun create astro frontend` dengan template kosong/basic.
- Menambahkan integrasi React dan Tailwind CSS (`bunx astro add react tailwind`).
- Mengkonfigurasi Tailwind agar menggunakan palet warna _earthy_ sesuai aturan `rules/frontend-rules.md`.

### Pengaturan Root Project
- Membuat `package.json` di root (menggunakan `bun init -y`) hanya untuk mempermudah menjalankan _script_ (seperti `bun run dev` yang akan menyalakan FE dan BE secara bersamaan).
- Memastikan `bun test` dapat dijalankan untuk menguji backend.

## Verification Plan

### Automated Tests
- Menjalankan `bun test` di dalam folder backend untuk memverifikasi instansiasi aplikasi Elysia.
- Menjalankan `bun run check-env` yang ada di `.agents/tools/check-env.ts` untuk memastikan _environment variables_ Turso tersedia.

### Manual Verification
- Menjalankan `bun run dev` (Astro & Elysia) dan memverifikasi keduanya menyala di port masing-masing tanpa *error*.
- Memeriksa koneksi Drizzle ke Turso dengan mencoba melakukan _push_ skema awal (jika database Turso sudah Anda siapkan, atau menggunakan mode *local SQLite* sementara sebagai _fallback_).
