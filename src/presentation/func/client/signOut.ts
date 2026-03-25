'use client'

import { makeSignOutPort } from '@/app/ports/SignOut/factory'

export const signOut = async () => {
  const signOutPort = makeSignOutPort()
  console.log('signOut')
  return signOutPort.signOut()
}
