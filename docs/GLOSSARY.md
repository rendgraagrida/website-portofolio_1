# 📖 Kamus Istilah & Filosofi Proyek (Glossary)

## 1. Filosofi & Manajemen
- **Vibe Coder**: Gaya *engineering* yang mengutamakan *flow state*, mendelegasikan beban pekerjaan repetitif kepada AI.
- **Bird's-Eye View**: Memandang proyek dari skala besar/garis besar.
- **Worm's-Eye View**: Memandang proyek dari detail teknis per-tugas di lapangan.
- **Just-In-Time (JIT) Issues**: Membuat GitHub Issue *tepat sebelum* koding dimulai.

## 2. Arsitektur & Teknologi
- **Islands Architecture (Astro)**: Mayoritas halaman web statis, dengan "pulau" kecil interaktif (React).
- **End-to-End Type Safety**: Keamanan tipe data dari database hingga UI (via Elysia Eden).
- **Monorepo**: Menyatukan kode `frontend/` dan `backend/` dalam satu folder repo.

## 3. Clean Code (Kode Bersih)
- **Thin Router, Fat Controller**: File API/Router dibuat setipis mungkin, logika berat digeser ke Controller.
- **Guard Clauses**: Teknik menolak error di baris-baris pertama fungsi (Early Return) agar kode tidak menjorok ke dalam.
- **Conventional Commits**: Standar penulisan riwayat Git (`feat:`, `fix:`, `chore:`).

## 4. Standar Enterprise & Automasi
- **A11y (Accessibility)**: Standar agar web bisa diakses oleh disabilitas (aria-label, alt text, color contrast).
- **CI/CD**: Continuous Integration/Deployment (Otomatisasi pengujian dan rilis kode di server/GitHub).
- **Master Template**: Struktur `.agents` yang sudah ramping, efisien, dan siap direplikasi untuk proyek raksasa berikutnya.
