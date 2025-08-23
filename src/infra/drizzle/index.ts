import { drizzle } from 'drizzle-orm/node-postgres'
import { schema } from './schema'

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
  schema,
})
