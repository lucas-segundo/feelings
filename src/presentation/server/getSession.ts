'use server'

import { makeGetSessionPort } from '@/app/services/GetSession/factory'

export const getSession = async () => {
  const getSessionPort = makeGetSessionPort()
  return getSessionPort.get()
}
