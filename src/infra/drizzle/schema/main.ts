import { sql } from 'drizzle-orm'
import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core'

const timestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp(),
}

export const messages = pgTable('messages', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  text: varchar({ length: 255 }).notNull(),
  ...timestamps,
})
