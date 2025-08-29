'use server'

import { GetMessagesPortFilter } from '@/app/ports/GetMessages'
import { makeGetMessagesPort } from '@/app/ports/GetMessages/factory'

export const getMessages = async (params: GetMessagesPortFilter) => {
  const getMessagesPort = makeGetMessagesPort()
  return getMessagesPort.get(params)
}
