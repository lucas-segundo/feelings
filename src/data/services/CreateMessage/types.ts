import { Message } from '@/domain/entities/Message'

export interface CreateMessageServiceData {
  text: string
  userID: string
}

export type CreateMessageService = (
  data: CreateMessageServiceData,
) => Promise<Message>
