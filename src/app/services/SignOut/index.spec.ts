import { describe, expect, it, vi } from 'vitest'
import { signOutService } from '.'
import { authClient } from '@/infra/betterAuth/client'

vi.mock('@/infra/betterAuth/client', () => ({
  authClient: {
    signOut: vi.fn(),
  },
}))

describe('signOutService', () => {
  it('should sign out user', async () => {
    await signOutService()
    expect(authClient.signOut).toHaveBeenCalled()
  })
})
