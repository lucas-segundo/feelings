import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { defaultTimestamps } from '../timestamps'

export const sessions = pgTable('sessions', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...defaultTimestamps,
})
