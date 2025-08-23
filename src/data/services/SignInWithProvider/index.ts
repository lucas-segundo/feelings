'use client'

import { authClient } from '@/infra/betterAuth'
import { SignInWithProviderService } from './types'

export const signInWithProviderService: SignInWithProviderService = async ({
  provider,
  callbackURL,
}) => {
  await authClient.signIn.social({
    provider,
    callbackURL,
  })
}
