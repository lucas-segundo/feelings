import { Like } from '@/app/entities/Like'

export interface GetLikesPortParams {
  filter?: {
    userID?: {
      eq?: string
      in?: string[]
    }
    messageID?: {
      eq?: string
      in?: string[]
    }
  }
  limit?: number
  order?: {
    [K in 'createdAt']?: 'asc' | 'desc'
  }
}

export interface GetLikesPort {
  get(params: GetLikesPortParams): Promise<Like[]>
}
