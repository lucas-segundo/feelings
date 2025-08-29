import { Message } from '@/app/entities/Message'

export interface GetMessagesPortFilter {
  limit?: number
  order?: {
    [K in 'createdAt']?: 'asc' | 'desc'
  }
}

export interface GetMessagesPort {
  get(filter: GetMessagesPortFilter): Promise<Message[]>
}
