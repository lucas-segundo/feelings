import { authClient } from '@/infra/betterAuth/client'
import { SignOutPort } from '.'

export class BetterAuthSignOutAdapter implements SignOutPort {
  async signOut(): Promise<void> {
    await authClient.signOut()
  }
}
