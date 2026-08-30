# Rencana Implementasi: Milestone 04 - Deployment

Ini adalah tahap puncak dari proyek portofolio Anda. Kita akan memastikan seluruh kode telah aman dari kutu (bugs) dan menyiapkan konfigurasi agar bisa mengudara (live) di internet.

## User Review Required
> [!IMPORTANT]
> **Proses Eksekusi Cloud**: Mengingat saya (AI) beroperasi secara lokal di IDE Anda, saya tidak memiliki akses _login_ ke akun Vercel dan Koyeb Anda. Tugas saya di sini adalah **menyiapkan seluruh pondasi (Dockerfile, penyesuaian port, lolos uji)**. Setelah itu, saya akan menyajikan panduan presisi agar Anda bisa menyambungkan repositori GitHub ini ke Vercel dan Koyeb hanya dengan beberapa klik. Apakah Anda setuju dengan alur kerja (workflow) ini?

## Proposed Changes

---

### Verifikasi & Uji Kualitas
#### [MODIFY] `backend/src/index.ts`
- Mengubah `app.listen(3000)` menjadi `app.listen(process.env.PORT || 3000)` agar Koyeb bisa menyuntikkan porta (port) dinamis mereka.

#### [NEW] Command Execution
- Menjalankan `bun run tsc --noEmit` di Frontend dan Backend untuk memastikan Type Safety Elysia Eden solid 100%.
- Menjalankan `bun test` untuk menguji unit test Elysia.

---

### Persiapan Cloud
#### [NEW] `backend/Dockerfile`
- Membuat Dockerfile teringan (menggunakan basis `oven/bun:alpine`) untuk membungkus Elysia dan Drizzle. Dockerfile ini akan secara otomatis dideteksi dan di-*build* oleh Koyeb/Render saat Anda menekan tombol deploy.

#### [NEW] `.dockerignore`
- Mengabaikan `node_modules` dan `local.db` saat proses pembentukan (_build_) kontainer.

## Verification Plan
1. Menjalankan skrip validasi (`type-check` dan `test`).
2. Setelah lolos, saya akan menyusun dokumentasi instruksi akhir di *Walkthrough* yang berisi:
   - Cara *login* ke Vercel dan menyambungkan folder `frontend`.
   - Cara *login* ke Koyeb, menautkan GitHub folder `backend`, dan memasukkan `TURSO_DATABASE_URL` asli.
   - Cara menyetel URL backend (Koyeb) ke Vercel (Eden API Endpoint) agar mereka saling berbicara di _production_.
