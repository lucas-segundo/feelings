import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'

export const verifications = pgTable('verifications', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  identifier: text().notNull(),
  value: text().notNull(),
  expiresAt: timestamp().notNull(),
  ...defaultTimestamps,
})
