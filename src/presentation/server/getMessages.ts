'use server'

import { GetMessagesPortFilter } from '@/app/services/GetMessages'
import { makeGetMessagesPort } from '@/app/services/GetMessages/factory'

export const getMessages = async (params: GetMessagesPortFilter) => {
  const getMessagesPort = makeGetMessagesPort()
  return getMessagesPort.get(params)
}
