import { describe, expect, it } from 'bun:test';
import { app } from './index';

describe('Elysia Backend', () => {
  it('should return Hello Elysia from root', async () => {
    const response = await app.handle(new Request('http://localhost/'));
    const text = await response.text();
    
    expect(response.status).toBe(200);
    expect(text).toBe('Hello Elysia');
  });

  it('should reject invalid contact submissions', async () => {
    const response = await app.handle(
      new Request('http://localhost/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'A', // Too short
          email: 'invalid-email',
          message: 'Hi', // Too short
        }),
      })
    );
    
    expect(response.status).toBe(422); // Unprocessable Entity due to schema validation
  });
});
