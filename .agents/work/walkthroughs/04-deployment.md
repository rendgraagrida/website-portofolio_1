# Walkthrough: Panduan Deployment (Tahap Akhir) 🚀

Proyek **Web Portofolio** Anda telah lulus uji ketat (*Type Check* dan *Unit Test* berhasil 100%) dan seluruh file persiapan untuk *hosting* telah dirampungkan!

## Apa yang Telah Saya Siapkan?
1. Mengubah *port* `index.ts` Backend menjadi `process.env.PORT` agar sesuai dengan server Cloud (Koyeb/Render).
2. Membuat `Dockerfile` dan `.dockerignore` super-ringan (*oven/bun:alpine*) untuk mendeploy Elysia ke Koyeb secara otomatis.

Mengingat akun Cloud Anda bersifat privat, ini adalah **instruksi manual yang harus Anda ikuti** untuk mendaratkan _website_ ini ke internet:

---

## ☁️ Langkah 1: Deploy Backend (Koyeb)
Kita _deploy_ Backend lebih dulu agar mendapat URL API.
1. _Login_ ke akun [Koyeb](https://app.koyeb.com).
2. Buat **New Service** dan pilih **GitHub**.
3. Pilih repositori `website-portofolio_1`.
4. Di bagian **Builder**, atur:
   - **Work directory**: `backend/`
   - Pilih **Dockerfile**.
5. Di bagian **Environment Variables**, tambahkan data asli dari Turso Anda:
   - `TURSO_DATABASE_URL` = `libsql://...`
   - `TURSO_AUTH_TOKEN` = `...`
6. Di bagian **Port**, pastikan disetel ke `3000` (atau sesuai konfigurasi Koyeb).
7. Klik **Deploy**!
*(Catat URL publik Koyeb Anda, misalnya `https://portofolio-backend-rendgra.koyeb.app`)*

---

## ☁️ Langkah 2: Deploy Frontend (Vercel)
Setelah API hidup, saatnya menghubungkan UI-nya.
1. _Login_ ke akun [Vercel](https://vercel.com/new).
2. Pilih **Import Project** dari GitHub dan pilih repositori yang sama.
3. Di bagian **Framework Preset**, pilih **Astro**.
4. Di bagian **Root Directory**, tekan _Edit_ dan pilih folder `frontend/`.
5. Di tahap ini, jika Anda menggunakan URL absolut untuk Eden, pastikan file `frontend/src/lib/eden.ts` diubah URL-nya (dari `http://localhost:3000` menjadi URL Koyeb Anda) lalu di-_commit_. *Atau jika Anda ingin cara mudah, _deploy_ dulu saja untuk melihat UI statisnya.*
6. Klik **Deploy**!

🎉 **Selamat! Web Portofolio dengan Arsitektur Second Brain Anda telah resmi mengudara!**
