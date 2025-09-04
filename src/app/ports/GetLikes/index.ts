import { Like } from '@/app/entities/Like'

export interface GetLikesPortFilter {
  userID?: {
    eq?: string
    in?: string[]
  }
  messageID?: {
    eq?: string
    in?: string[]
  }
  limit?: number
  order?: {
    [K in 'createdAt']?: 'asc' | 'desc'
  }
}

export interface GetLikesPort {
  get(filter: GetLikesPortFilter): Promise<Like[]>
}
