import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Skema untuk proyek portofolio
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  titleEn: text('title_en'),
  description: text('description'),
  descriptionEn: text('description_en'),
  imageUrl: text('image_url'),
  techStack: text('tech_stack'), // Disimpan sebagai comma-separated string atau JSON
});

// Skema untuk pesan kontak (Contact Form)
export const messages = sqliteTable('messages', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
});
