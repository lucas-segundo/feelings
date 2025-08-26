import { sql } from 'drizzle-orm'
import { timestamp } from 'drizzle-orm/pg-core'

export const defaultTimestamps = {
  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => sql`now()`),
  deletedAt: timestamp(),
}
