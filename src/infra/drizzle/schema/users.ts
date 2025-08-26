import { pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { defaultTimestamps } from '../timestamps'

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified')
    .$defaultFn(() => false)
    .notNull(),
  image: text('image'),
  ...defaultTimestamps,
})
