'use server'

import { CreateMessageService, CreateMessageServiceData } from './types'
import { messages } from '@/infra/drizzle/schema'
import { db } from '@/infra/drizzle'

export const createMessageService: CreateMessageService = async (
  data: CreateMessageServiceData,
) => {
  const [message] = await db.insert(messages).values(data).returning({
    id: messages.id,
    text: messages.text,
    likes: messages.likes,
    createdAt: messages.createdAt,
  })

  return {
    ...message,
    id: message.id.toString(),
  }
}
