'use server'

import { makeGetSessionPort } from '@/app/ports/GetSession/factory'

export const getSession = async () => {
  const getSessionPort = makeGetSessionPort()
  console.log('getSession')
  return getSessionPort.get()
}
