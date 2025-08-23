import { drizzle } from 'drizzle-orm/node-postgres'
import * as mainSchema from './schemas/main'
import * as authSchema from './schemas/auth'

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
  schema: { ...mainSchema, ...authSchema },
})
