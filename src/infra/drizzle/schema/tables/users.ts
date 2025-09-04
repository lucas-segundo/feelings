import { pgTable, text, boolean, integer } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'
import { relations } from 'drizzle-orm'
import { messages } from './messages'
import { accounts } from './accounts'
import { sessions } from './sessions'
import { usersLikes } from './usersLikes'

const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull().unique(),
  emailVerified: boolean()
    .$defaultFn(() => false)
    .notNull(),
  image: text(),
  ...defaultTimestamps,
})

const userRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  accounts: many(accounts),
  sessions: many(sessions),
  usersLikes: many(usersLikes),
}))

export { users, userRelations }
