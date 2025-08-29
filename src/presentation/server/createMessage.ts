'use server'

import { CreateMessagePortParams } from '@/app/services/CreateMessage'
import { makeCreateMessagePort } from '@/app/services/CreateMessage/factory'

export const createMessage = async (message: CreateMessagePortParams) => {
  const createMessagePort = makeCreateMessagePort()
  return createMessagePort.create(message)
}
