import { authClient } from '@/infra/betterAuth/client'
import { SignInWithProviderPort, SignInWithProviderPortParams } from '.'

export class BetterAuthSignInWithProviderAdapter
  implements SignInWithProviderPort
{
  async signIn(params: SignInWithProviderPortParams): Promise<void> {
    await authClient.signIn.social({
      provider: params.provider,
      callbackURL: params.callbackURL,
    })
  }
}
