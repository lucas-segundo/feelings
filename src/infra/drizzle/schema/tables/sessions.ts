import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { defaultTimestamps } from '../timestamps'

export const sessions = pgTable('sessions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  expiresAt: timestamp().notNull(),
  token: text().notNull().unique(),
  ipAddress: text(),
  userAgent: text(),
  userId: integer()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...defaultTimestamps,
})
