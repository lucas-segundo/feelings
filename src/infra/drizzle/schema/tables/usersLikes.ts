import { integer, pgTable } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'
import { users } from './users'
import { messages } from './messages'
import { relations } from 'drizzle-orm'

export const usersLikes = pgTable('users_likes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userID: integer()
    .notNull()
    .references(() => users.id),
  messageID: integer()
    .notNull()
    .references(() => messages.id),
  ...defaultTimestamps,
})

export const usersLikesRelations = relations(usersLikes, ({ one }) => ({
  user: one(users, {
    fields: [usersLikes.userID],
    references: [users.id],
  }),
  message: one(messages, {
    fields: [usersLikes.messageID],
    references: [messages.id],
  }),
}))
