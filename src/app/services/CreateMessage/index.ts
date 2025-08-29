import { Message } from '@/app/entities/Message'

export interface CreateMessagePortParams {
  text: string
  userID: string
}

export interface CreateMessagePort {
  create: (message: CreateMessagePortParams) => Promise<Message>
}
