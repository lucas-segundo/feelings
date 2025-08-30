import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'

export const verifications = pgTable('verifications', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ...defaultTimestamps,
})
