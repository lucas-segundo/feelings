import { describe, it, expect, vi } from 'vitest'
import { authClient } from '@/infra/betterAuth/client'
import { makeSignOutPort } from './factory'

vi.mock('@/infra/betterAuth/client', () => ({
  authClient: {
    signOut: vi.fn(),
  },
}))

describe('SignOutPort', () => {
  const signOutPort = makeSignOutPort()

  it('should sign out user', async () => {
    vi.mocked(authClient.signOut).mockResolvedValue(undefined)

    await signOutPort.signOut()

    expect(authClient.signOut).toHaveBeenCalled()
  })
})
