import { describe, expect, it } from 'bun:test';
import { app } from '../src/index';

describe('Elysia Server & API', () => {
  it('harus merespons dengan Hello Elysia di route utama', async () => {
    const response = await app.handle(new Request('http://localhost/'));
    const text = await response.text();
    expect(text).toBe('Hello Elysia');
  });

  it('GET /api/projects harus mengembalikan daftar proyek array', async () => {
    const response = await app.handle(new Request('http://localhost/api/projects'));
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });

  it('POST /api/contact harus berhasil menyimpan pesan yang valid', async () => {
    const payload = {
      name: 'Rendgra Tester',
      email: 'test@example.com',
      message: 'Halo, ini pesan pengujian integrasi otomatis.',
    };

    const response = await app.handle(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    );

    expect(response.status).toBe(201);
    const resJson = (await response.json()) as { success: boolean; data: { name: string; email: string } };
    expect(resJson.success).toBe(true);
    expect(resJson.data.name).toBe('Rendgra Tester');
    expect(resJson.data.email).toBe('test@example.com');
  });

  it('POST /api/contact harus menolak payload dengan email tidak valid (TypeBox)', async () => {
    const invalidPayload = {
      name: 'R',
      email: 'bukan-email',
      message: '123',
    };

    const response = await app.handle(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invalidPayload),
      })
    );

    expect(response.status).toBe(422); // Validation error
  });
});
