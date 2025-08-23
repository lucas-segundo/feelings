import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/infra/betterAuth/server'

export const { POST, GET } = toNextJsHandler(auth)
