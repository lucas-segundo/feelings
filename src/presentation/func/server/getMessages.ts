'use server'

import { GetMessagesPortParams } from '@/app/ports/GetMessages'
import { makeGetMessagesPort } from '@/app/ports/GetMessages/factory'

export const getMessages = async (params: GetMessagesPortParams) => {
  const getMessagesPort = makeGetMessagesPort()
  console.log('getMessages', params)
  return getMessagesPort.get(params)
}
