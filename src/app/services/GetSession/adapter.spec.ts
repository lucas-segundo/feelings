import { describe, expect, it, vi } from 'vitest'
import { auth } from '@/infra/betterAuth/server'
import { mockBetterAuthData } from '@/infra/betterAuth/mock'
import { makeGetSessionPort } from './factory'

vi.mock('@/infra/betterAuth/server', () => ({
  auth: {
    api: {
      getSession: vi.fn(),
    },
  },
}))

vi.mock('next/headers')

describe('getSessionService', () => {
  const getSessionPort = makeGetSessionPort()

  it('should return the session', async () => {
    const data = mockBetterAuthData()
    vi.mocked(auth.api.getSession).mockResolvedValue(data)

    const session = await getSessionPort.get()

    expect(session).toEqual({
      id: data.session.id,
      token: data.session.token,
      expiresAt: data.session.expiresAt,
      user: {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        photo: data.user.image ?? null,
      },
    })
  })

  it('should return null if there is no session', async () => {
    vi.mocked(auth.api.getSession).mockResolvedValue(null)

    const session = await getSessionPort.get()

    expect(session).toBeNull()
  })
})
