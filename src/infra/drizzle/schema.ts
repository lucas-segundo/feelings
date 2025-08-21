import { pgTable, integer, varchar } from 'drizzle-orm/pg-core'

export const messageTable = pgTable('messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
  likes: integer().notNull().default(0),
})
