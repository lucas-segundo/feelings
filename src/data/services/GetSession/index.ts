import { auth } from '@/infra/betterAuth'
import { GetSessionService } from './type'
import { headers } from 'next/headers'

export const getSessionService: GetSessionService = async () => {
  const data = await auth.api.getSession({
    headers: await headers(),
  })

  return data
    ? {
        id: data.session.id,
        token: data.session.token,
        expiresAt: data.session.expiresAt,
        user: {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
        },
      }
    : null
}
