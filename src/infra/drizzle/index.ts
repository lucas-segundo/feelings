import { drizzle } from 'drizzle-orm/node-postgres'
import { accounts } from './schema/accounts'
import { users } from './schema/users'
import { sessions } from './schema/sessions'
import { verifications } from './schema/verifications'
import { messages } from './schema/messages'

export const db = drizzle({
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
  schema: {
    accounts,
    users,
    sessions,
    verifications,
    messages,
  },
})
