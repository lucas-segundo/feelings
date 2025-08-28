'use server'

import { CreateMessageService, CreateMessageServiceData } from './types'
import { messages } from '@/infra/drizzle/schema/tables/messages'
import { db } from '@/infra/drizzle'

export const createMessageService: CreateMessageService = async (
  data: CreateMessageServiceData,
) => {
  const [message] = await db
    .insert(messages)
    .values({
      text: data.text,
      userID: Number(data.userID),
    })
    .returning({
      id: messages.id,
      text: messages.text,
      createdAt: messages.createdAt,
      userID: messages.userID,
    })

  return {
    ...message,
    id: message.id.toString(),
    userID: message.userID.toString(),
  }
}
