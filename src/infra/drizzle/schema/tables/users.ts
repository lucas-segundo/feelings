import { pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'
import { relations } from 'drizzle-orm'
import { messages } from './messages'

const users = pgTable('users', {
  id: text('id').primaryKey(),
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
}))

export { users, userRelations }
