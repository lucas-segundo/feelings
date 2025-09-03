import { integer, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'
import { users } from './users'

export const languageEnum = pgEnum('language', ['pt', 'en'])
export const messages = pgTable('messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
  userID: integer()
    .notNull()
    .references(() => users.id),
  language: languageEnum().notNull(),
  ...defaultTimestamps,
})
