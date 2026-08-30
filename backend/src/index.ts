import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { config } from 'dotenv';
config({ path: '../.env' });
import { db } from './db';
import { projects, messages } from './db/schema';

export const app = new Elysia()
  .use(cors())
  .get('/', () => 'Hello Elysia')
  .group('/api', (app) =>
    app
      .get('/projects', async () => {
        const allProjects = await db.select().from(projects);
        return allProjects;
      })
      .post(
        '/contact',
        async ({ body, set }) => {
          try {
            const [inserted] = await db
              .insert(messages)
              .values({
                name: body.name.trim(),
                email: body.email.trim().toLowerCase(),
                message: body.message.trim(),
              })
              .returning();

            set.status = 201;
            return {
              success: true,
              message: 'Pesan berhasil disimpan',
              data: inserted,
            };
          } catch (error) {
            set.status = 500;
            return {
              success: false,
              message: 'Gagal menyimpan pesan',
              error: error instanceof Error ? error.message : 'Unknown error',
            };
          }
        },
        {
          body: t.Object({
            name: t.String({ minLength: 2, maxLength: 100 }),
            email: t.String({ format: 'email' }),
            message: t.String({ minLength: 5, maxLength: 2000 }),
          }),
        }
      )
  );

if (process.env.NODE_ENV !== 'test') {
  app.listen(process.env.PORT || 3001);
  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

export type App = typeof app;
