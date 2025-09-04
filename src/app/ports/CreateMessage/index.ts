import { Message } from '@/app/entities/Message'

export interface CreateMessagePortParams {
  text: string
  userID: string
  language: 'pt' | 'en'
}

export interface CreateMessagePort {
  create: (message: CreateMessagePortParams) => Promise<Message>
}
