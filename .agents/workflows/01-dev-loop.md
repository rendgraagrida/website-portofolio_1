# SOP Dev Loop (Vibe Coder Loop)

Setiap siklus kerja, ikuti urutan ini secara ketat:

1. **Baca Memori**: Baca `MEMORY.md` untuk mengetahui posisi terakhir.
2. **Baca Milestone**: Baca file milestone yang sedang aktif di folder `milestones/`.
3. **Buat Issue (Opsional)**: Ajukan pembuatan draf GitHub Issue jika milestone baru akan dimulai.
4. **Koding**: Tulis kode dengan mematuhi semua `RULES`.
5. **CEK PORT LOKAL (PENTING!)**: Sebelum menjalankan server lokal (`bun run dev`), **WAJIB** mengecek ketersediaan port terlebih dahulu (misal: cek port 3000 untuk backend dan 4321 untuk frontend menggunakan perintah terminal seperti `lsof -i :3000`). Jangan menimpa port yang sedang dipakai oleh proyek lain (misal: Track Wallet). Jika bentrok, bunuh proses lama atau ganti port proyek ini.
6. **Testing**: Jalankan server lokal atau `bun test` untuk verifikasi kode.
7. **Git Push**: AI merangkum pesan commit, tunggu izin User, lalu eksekusi Push.
8. **Update Memori**: Centang milestone yang selesai dan perbarui status di `MEMORY.md`.
