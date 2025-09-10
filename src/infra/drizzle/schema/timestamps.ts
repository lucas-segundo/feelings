import { timestamp } from 'drizzle-orm/pg-core'

export const defaultTimestamps = {
  createdAt: timestamp()
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: timestamp()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
  deletedAt: timestamp(),
}
