import { BetterAuthSignInWithProviderAdapter } from './adapter'
import { SignInWithProviderPort } from '.'

export const makeSignInWithProviderPort = (): SignInWithProviderPort => {
  return new BetterAuthSignInWithProviderAdapter()
}
