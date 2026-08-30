Wajib Mobile-First dengan Tailwind (Warna earthy). Ekstrak UI berulang jadi komponen React (DRY). Anti-XSS: Dilarang pakai dangerouslySetInnerHTML.

5. **GLOBAL STATE (ASTRO ISLANDS)**: Karena Astro mengisolasi komponen React sebagai 'Pulau' yang terpisah, DILARANG KERAS menggunakan React Context atau Redux untuk membagikan state antar komponen lintas pulau. Jika butuh Global State, WAJIB menggunakan **Nano Stores** (`@nanostores/react`).
