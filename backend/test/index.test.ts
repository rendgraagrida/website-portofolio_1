import { describe, expect, it } from 'bun:test';
import { Elysia } from 'elysia';

const app = new Elysia().get('/', () => 'Hello Elysia');

describe('Elysia Server', () => {
  it('harus merespons dengan Hello Elysia di route utama', async () => {
    const response = await app.handle(new Request('http://localhost/'));
    const text = await response.text();
    expect(text).toBe('Hello Elysia');
  });
});
