import { auth } from '@/infra/betterAuth/server'
import { GetSessionPort } from '.'
import { headers } from 'next/headers'

interface BetterAuthSession {
  session: {
    id: string
    token: string
    expiresAt: Date
  }
  user: {
    id: string
    name: string
    email: string
    image?: string | null
  }
}

export class BetterAuthGetSessionAdapter implements GetSessionPort {
  async get() {
    const data = await auth.api.getSession({
      headers: await headers(),
    })

    return data ? this.adapt(data) : null
  }

  private adapt(data: BetterAuthSession) {
    return {
      id: data.session.id,
      token: data.session.token,
      expiresAt: data.session.expiresAt,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        photo: data.user.image ?? null,
      },
    }
  }
}
