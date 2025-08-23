import { Session } from '@/domain/entities/Session'
import { authClient } from '@/infra/betterAuth/client'

interface Result {
  session: Session | null
  isLoading: boolean
  error: Error | null
}

export const useSession = (): Result => {
  const { data, isPending, error } = authClient.useSession()
  const session = data
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

  return { session, isLoading: isPending, error }
}
