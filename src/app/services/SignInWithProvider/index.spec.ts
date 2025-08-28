import { describe, expect, it, vi } from 'vitest'
import { signInWithProviderService } from '.'
import { authClient } from '@/infra/betterAuth/client'

vi.mock('@/infra/betterAuth/client', () => ({
  authClient: {
    signIn: {
      social: vi.fn(),
    },
  },
}))

describe('signInWithProviderService', () => {
  it('should sign in with provider', async () => {
    await signInWithProviderService({
      provider: 'google',
      callbackURL: '/',
    })

    expect(authClient.signIn.social).toHaveBeenCalledWith({
      provider: 'google',
      callbackURL: '/',
    })
  })
})
