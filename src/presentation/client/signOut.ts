'use client'

import { makeSignOutPort } from '@/app/services/SignOut/factory'

export const signOut = async () => {
  const signOutPort = makeSignOutPort()
  return signOutPort.signOut()
}
