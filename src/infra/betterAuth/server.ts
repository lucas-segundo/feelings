import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '../drizzle'
import { nextCookies } from 'better-auth/next-js'
import { accounts } from '../drizzle/schema/tables/accounts'
import { users } from '../drizzle/schema/tables/users'
import { sessions } from '../drizzle/schema/tables/sessions'
import { verifications } from '../drizzle/schema/tables/verifications'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      account: accounts,
      user: users,
      session: sessions,
      verification: verifications,
    },
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  plugins: [nextCookies()],
  advanced: {
    database: {
      generateId: false,
    },
  },
})
