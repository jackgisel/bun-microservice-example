import { InferModel } from 'drizzle-orm';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
    id: integer('id', { mode: 'number' }).primaryKey(),
    title: text('title').notNull(),
    completed: integer('completed', { mode: 'boolean' }).notNull().default(false),
});

export type Task = InferModel<typeof tasks>;