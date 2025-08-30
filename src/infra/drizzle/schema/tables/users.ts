import { pgTable, text, boolean, integer } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'
import { relations } from 'drizzle-orm'
import { messages } from './messages'
import { accounts } from './accounts'
import { sessions } from './sessions'

const users = pgTable('users', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  ...defaultTimestamps,
})

const userRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  accounts: many(accounts),
  sessions: many(sessions),
}))

export { users, userRelations }
