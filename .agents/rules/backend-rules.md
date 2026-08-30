Wajib pakai Bun. Terapkan 'Thin Router, Fat Controller'. Wajib pakai TypeBox untuk validasi API.

6. **STANDAR RESPON API**: Semua endpoint API Elysia WAJIB mengembalikan struktur JSON yang seragam untuk memudahkan Frontend (Eden). Jangan membalas dengan array mentah. 
Gunakan format baku ini: `{ success: boolean, data: any, error?: string | null }`.
