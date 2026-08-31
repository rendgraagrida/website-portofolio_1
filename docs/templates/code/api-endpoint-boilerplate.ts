import { Elysia, t } from 'elysia';

// Boilerplate Endpoint Elysia dengan Validasi TypeBox (Anti-XSS & Secure Payload)
export const standardEndpoint = new Elysia({ prefix: '/api' })
  .post(
    '/example',
    async ({ body, set }) => {
      try {
        // Implementasi logika bisnis di sini
        return {
          success: true,
          message: 'Data berhasil diproses',
          data: {
            title: body.title
          }
        };
      } catch (error) {
        set.status = 500;
        return {
          success: false,
          error: 'Terjadi kesalahan pada server.'
        };
      }
    },
    {
      // Wajib: Validasi payload input menggunakan TypeBox
      body: t.Object({
        title: t.String({ minLength: 3, maxLength: 100 }),
        content: t.String({ minLength: 10 }),
        tags: t.Optional(t.Array(t.String()))
      }),
      // Dokumentasi detail untuk Swagger/OpenAPI (Opsional, tapi Best Practice)
      detail: {
        summary: 'Buat entitas baru',
        description: 'Endpoint ini divalidasi dengan TypeBox untuk memastikan input aman.'
      }
    }
  );
