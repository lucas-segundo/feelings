import { Message } from '@/domain/entities/Message'

export interface GetMessagesServiceFilter {
  limit?: number
  order?: {
    [K in 'createdAt' | 'likes']?: 'asc' | 'desc'
  }
}

export type GetMessagesService = (
  filter: GetMessagesServiceFilter,
) => Promise<Message[]>
