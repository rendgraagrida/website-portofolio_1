import { edenTreaty } from '@elysiajs/eden';
import type { App } from '../../../backend/src/index';

// Menghubungkan frontend ke backend Elysia secara type-safe
export const api = edenTreaty<App>('http://localhost:3000');
