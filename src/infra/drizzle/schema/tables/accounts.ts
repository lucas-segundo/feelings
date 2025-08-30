import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'
import { users } from './users'

export const accounts = pgTable('accounts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  accountId: text().notNull(),
  providerId: text().notNull(),
  userId: integer()
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  accessToken: text(),
  refreshToken: text(),
  idToken: text(),
  accessTokenExpiresAt: timestamp(),
  refreshTokenExpiresAt: timestamp(),
  scope: text(),
  password: text(),
  ...defaultTimestamps,
})
