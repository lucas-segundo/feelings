import { describe, it, expect, vi } from 'vitest'
import { authClient } from '@/infra/betterAuth/client'
import { makeSignInWithProviderPort } from './factory'

vi.mock('@/infra/betterAuth/client', () => ({
  authClient: {
    signIn: {
      social: vi.fn(),
    },
  },
}))

describe('SignInWithProviderPort', () => {
  const signInWithProviderPort = makeSignInWithProviderPort()

  it('should sign in with provider', async () => {
    const params = {
      provider: 'google' as const,
      callbackURL: 'http://localhost:3000/callback',
    }

    vi.mocked(authClient.signIn.social).mockResolvedValue(undefined)

    await signInWithProviderPort.signIn(params)

    expect(authClient.signIn.social).toHaveBeenCalledWith({
      provider: 'google',
      callbackURL: 'http://localhost:3000/callback',
    })
  })
})
