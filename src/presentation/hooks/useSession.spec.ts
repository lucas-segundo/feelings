import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useSession } from './useSession'
import { authClient } from '@/infra/betterAuth/client'
import { faker } from '@faker-js/faker'
import { BetterFetchError } from 'better-auth/react'

vi.mock('@/infra/betterAuth/client', () => ({
  authClient: {
    useSession: vi.fn(),
  },
}))

describe('useSession', () => {
  beforeEach(() => {})

  it('should return loading state when session is being fetched', () => {
    vi.mocked(authClient).useSession.mockReturnValue({
      data: null,
      isPending: true,
      error: null,
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useSession())

    expect(result.current.session).toBeNull()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('should return the session data', () => {
    const user = {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      image: faker.image.url(),
      emailVerified: true,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    }

    const session = {
      id: faker.string.uuid(),
      userId: user.id,
      expiresAt: faker.date.future(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      token: faker.string.uuid(),
    }

    vi.mocked(authClient).useSession.mockReturnValue({
      data: {
        user,
        session,
      },
      isPending: false,
      error: null,
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useSession())

    expect(result.current.session).toEqual({
      id: session.id,
      token: session.token,
      expiresAt: session.expiresAt,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        photo: user.image,
      },
    })
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('should return the error when session fetch fails', () => {
    const error = new Error('Session fetch failed') as BetterFetchError

    vi.mocked(authClient).useSession.mockReturnValue({
      data: null,
      isPending: false,
      error,
      refetch: vi.fn(),
    })

    const { result } = renderHook(() => useSession())

    expect(result.current.session).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeInstanceOf(Error)
  })
})
