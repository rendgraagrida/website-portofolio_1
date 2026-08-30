import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// Skema awal untuk proyek
export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  imageUrl: text('image_url'),
  techStack: text('tech_stack'), // Disimpan sebagai comma-separated string atau JSON
});
