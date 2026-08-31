# ADR 004: Standardisasi Testing & AI Second Brain

**Tanggal**: 1 September 2026  
**Status**: Diterima (Accepted)

## Konteks
Setelah pengembangan fitur inti dan transisi UI selesai, proyek ini dirancang agar tidak hanya menjadi sekadar "portofolio", melainkan **Template Induk (Master Template)** untuk proyek pengembangan perangkat lunak selanjutnya.
Untuk mencapai hal tersebut, diperlukan dua fondasi yang kokoh:
1. **Jaminan Stabilitas Kode (QA/Testing)**: Agar pengembangan di masa depan tidak merusak fitur lama secara tidak sengaja (Regresi).
2. **Jaminan Stabilitas Sistem Agen AI**: Agen AI yang memegang kendali di masa depan harus memahami gaya *coding* ini tanpa perlu diajarkan ulang secara manual setiap saat, dan mencegah terjadinya *context bloat* akibat akumulasi dokumen pasif.

## Keputusan

### 1. Ekosistem Pengujian Berjenjang (Layered Testing)
- **Frontend Unit Testing**: Memilih **Vitest** dengan `@testing-library/react` dan `jsdom` karena integrasi yang mulus (satu ekosistem berbasis *Vite* yang digunakan di balik layar oleh Astro).
- **Backend Unit & Integration Testing**: Memanfaatkan *runner* tes **bawaan dari Bun** (`bun test`). Keputusan ini mengurangi ketergantungan (dependencies) tambahan seperti Jest, serta memastikan performa super cepat sesuai dengan filosofi *runtime* Bun.
- **Frontend End-to-End (E2E) Testing**: Menggunakan **Playwright** untuk menyimulasikan interaksi 100% *real user* pada level browser untuk skenario-skenario kompleks (seperti pengisian *contact form*).

### 2. Restrukturisasi "Otak AI" (Second Brain) ke Standar Antigravity
Sistem lama berbasis *MemoryBank* (berisi folder seperti `decisions/`, `milestones/`, `workflows/`, dll) di dalam `.agents/` menyebabkan kebocoran memori (context bloat) yang memperlambat kinerja agen (terutama Antigravity / Gemini) karena semuanya dimuat paksa.
Oleh karenanya:
- **Dokumentasi Pasif**: Semua file dokumentasi (sejarah proyek, ADR, *milestone*, *glossary*) **DIKELUARKAN** dari `.agents/` dan dipindahkan ke folder standar pengembangan perangkat lunak tradisional yaitu **`docs/`** di direktori utama.
- **Aturan Terpadu**: 11 file *rules* yang tercerai-berai digabung secara padat menjadi 3 aturan utama (`01-core-behavior`, `02-frontend-guidelines`, `03-backend-systems`) agar konteks tetap terjaga.
- **On-Demand Skills Ecosystem**: File *workflows* dan *tools* (*scripts*) dipaket ulang menjadi arsitektur **Skills Antigravity** yang standar (`project-tools`, `project-workflows`, `test-driven-dev`, dll) agar dimuat secara malas (*lazy-loaded*) sesuai kebutuhan, dan langsung mengintegrasikan 37 *skills* populer dari direktori komunitas `skills.sh`.

## Konsekuensi
- **Positif**: Kecepatan pemrosesan *prompt* oleh AI di proyek masa depan akan jauh lebih efisien karena sistem hanya memuat aturan dasar (*rules*), sementara keahlian prosedural (*skills*) dan dokumentasi sejarah (`docs/`) baru dipanggil hanya jika dibutuhkan. Repositori memiliki struktur standar industri yang bersih. Kode juga memiliki tes jaring pengaman (safety net).
- **Negatif**: Mengubah struktur kerja yang sudah terbiasa dengan metode folder `milestones` secara langsung di `.agents`. Agen AI sekarang harus diajarkan untuk mencari file di `docs/` jika ingin mengingat sejarah.
