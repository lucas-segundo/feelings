'use client'

import { SignInWithProviderPortParams } from '@/app/services/SignInWithProvider'
import { makeSignInWithProviderPort } from '@/app/services/SignInWithProvider/factory'

export const signInWithProvider = async (
  params: SignInWithProviderPortParams,
) => {
  const signInWithProviderPort = makeSignInWithProviderPort()
  return signInWithProviderPort.signIn(params)
}
