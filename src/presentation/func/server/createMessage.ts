'use server'

import { CreateMessagePortParams } from '@/app/ports/CreateMessage'
import { makeCreateMessagePort } from '@/app/ports/CreateMessage/factory'

export const createMessage = async (message: CreateMessagePortParams) => {
  const createMessagePort = makeCreateMessagePort()
  return createMessagePort.create(message)
}
