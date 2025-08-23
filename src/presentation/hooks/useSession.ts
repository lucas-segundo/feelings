import { authClient } from '@/infra/betterAuth'

interface Data {
  user: {
    id: string
    name: string
    email: string
  }
  session: {
    id: string
    expiresAt: Date
    token: string
  }
}

interface Result {
  data: Data | null
  isLoading: boolean
  error: Error | null
}

export const useSession = (): Result => {
  const { data, isPending, error } = authClient.useSession()
  return { data, isLoading: isPending, error }
}
