import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { db } from './db';
import { projects } from './db/schema';

const app = new Elysia()
  .use(cors())
  .get('/', () => 'Hello Elysia')
  .group('/api', (app) =>
    app.get('/projects', async () => {
      const allProjects = await db.select().from(projects);
      return allProjects;
    })
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
