import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'
import { defaultTimestamps } from '../timestamps'

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  ...defaultTimestamps,
})
