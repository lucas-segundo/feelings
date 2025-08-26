'use client'

import { authClient } from '@/infra/betterAuth/client'
import { SignOutService } from './type'

export const signOutService: SignOutService = async () => {
  await authClient.signOut()
}
