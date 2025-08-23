import { toNextJsHandler } from 'better-auth/next-js'
import { auth } from '@/infra/betterAuth'

export const { POST, GET } = toNextJsHandler(auth)
