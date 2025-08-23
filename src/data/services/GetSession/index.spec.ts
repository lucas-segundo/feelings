import { describe, expect, it, vi } from 'vitest'
import { getSessionService } from '.'
import { auth } from '@/infra/betterAuth/server'
import { mockBetterAuthData } from '@/infra/betterAuth/mock'

vi.mock('@/infra/betterAuth', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

vi.mock('next/headers')

describe('getSessionService', () => {
  it('should return the session', async () => {
    const data = mockBetterAuthData()
    vi.mocked(auth.api.getSession).mockResolvedValue(data)

    const session = await getSessionService()

    expect(session).toEqual({
      id: data.session.id,
      token: data.session.token,
      expiresAt: data.session.expiresAt,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      },
    })
  })

  it('should return null if there is no session', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null)

    const session = await getSessionService()

    expect(session).toBeNull()
  })
})
