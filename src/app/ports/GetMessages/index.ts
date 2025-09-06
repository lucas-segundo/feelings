import { Message } from '@/app/entities/Message'

export interface GetMessagesPortParams {
  limit?: number
  order?: {
    [K in 'createdAt']?: 'asc' | 'desc'
  }
}

export interface GetMessagesPort {
  get(params: GetMessagesPortParams): Promise<Message[]>
}
