# Prompt: Setup Fitur Bilingual (ID/EN)

**Gunakan prompt ini saat Anda ingin mengubah proyek Astro statis biasa menjadi aplikasi dwibahasa (Bilingual):**

> "Halo AI, tolong implementasikan fitur bilingual (Bahasa Indonesia & Inggris) pada proyek Astro ini dengan instruksi berikut:
> 1. Buat folder `src/i18n` dan siapkan file `ui.ts` (berisi kamus data) dan `utils.ts` (fungsi pembaca bahasa dari URL).
> 2. Implementasikan *URL routing* menggunakan direktori bawaan Astro (`/` untuk bahasa default ID, `/en/` untuk bahasa Inggris).
> 3. Jangan gunakan *state* React untuk fitur toggle utama agar *SEO-friendly*, melainkan tautan biasa `<a href="/en/">` atau sebaliknya.
> 4. Pastikan teks *fallback* berjalan (kembali ke ID jika string EN tidak ada).
> 5. Rombak komponen UI yang ada untuk menerima *props* `lang` dan mengambil terjemahannya dari `ui.ts`."
