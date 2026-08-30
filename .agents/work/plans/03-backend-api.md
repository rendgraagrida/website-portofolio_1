# Rencana Implementasi: Milestone 03 - Backend API

Fokus kita kali ini adalah merangkai "mesin utama" aplikasi: menyiapkan *database* (Turso), membangun *Endpoint API* (Elysia), hingga menghubungkannya dengan *Frontend* menggunakan Elysia Eden secara _Type-Safe_.

## User Review Required
> [!WARNING]
> **Kredensial Database Turso**: File `.env` saat ini masih berisi data palsu (`libsql://your-database-name.turso.io`). Agar saya bisa menjalankan `drizzle-kit push` ke Turso, Anda harus memperbarui isi `.env` dengan kredensial asli Anda. **Apakah Anda ingin mengatur `.env` Anda sendiri sekarang, atau Anda ingin saya menggunakan `file:local.db` (SQLite Lokal) sementara untuk tahap _development_ ini?**

> [!TIP]
> **Elysia Eden**: Saya akan menggunakan `useEffect` sederhana di React untuk menarik (fetch) data proyek dari backend via Eden. Pendekatan ini tidak butuh dependensi tambahan. Apakah setuju?

## Proposed Changes

---

### Database & Skema
#### [MODIFY] `.agents/tools/seed-database.ts`
- Menulis logika _insertion_ menggunakan Drizzle ORM untuk memasukkan data proyek awal (*Toserba Online*, *Kopi Kenangan App*, dll) langsung ke tabel `projects`.

### Backend API (Elysia)
#### [MODIFY] `backend/src/index.ts`
- Membuat *route* `GET /api/projects`.
- Menarik (*query*) semua baris dari Drizzle (`db.select().from(projects)`).
- Mengekspor tipe `App` (`export type App = typeof app`) agar dapat dikonsumsi oleh Eden di sisi *frontend*.

### Frontend (Integrasi API)
#### [NEW] Instalasi Elysia Eden
- Menjalankan perintah `bun add @elysiajs/eden` di dalam direktori `frontend/`.

#### [NEW] `frontend/src/lib/eden.ts`
- Membuat *client* terpusat menggunakan `edenTreaty<App>('http://localhost:3000')`.

#### [MODIFY] `frontend/src/components/ProjectSlider.tsx`
- Menghapus *dummy data* internal.
- Menambahkan *React State* (`projects`, `loading`) dan memanggil `eden.api.projects.get()` di dalam `useEffect`.

## Verification Plan
1. Mengubah `.env` dengan DB asli atau SQLite lokal.
2. Menjalankan `bun run check-env` (Alat pengecekan Anda).
3. Melakukan eksekusi `bun run drizzle-kit push` di backend.
4. Menjalankan `bun run .agents/tools/seed-database.ts` untuk membibit (*seed*) data dummy.
5. Menjalankan `bun run dev:frontend` dan `bun run dev:backend` secara paralel, dan memverifikasi bahwa *slider* di UI kini menarik data nyata dari *database* via Elysia Eden!
