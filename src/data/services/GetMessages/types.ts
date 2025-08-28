import { Message } from '@/app/entities/Message'

export interface GetMessagesServiceFilter {
  limit?: number
  order?: {
    [K in 'createdAt']?: 'asc' | 'desc'
  }
}

export type GetMessagesService = (
  filter: GetMessagesServiceFilter,
) => Promise<Message[]>
