'use client'

import { SignInWithProviderPortParams } from '@/app/ports/SignInWithProvider'
import { makeSignInWithProviderPort } from '@/app/ports/SignInWithProvider/factory'

export const signInWithProvider = async (
  params: SignInWithProviderPortParams,
) => {
  const signInWithProviderPort = makeSignInWithProviderPort()
  return signInWithProviderPort.signIn(params)
}
