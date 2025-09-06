import { Like } from '@/app/entities/Like'

export interface CreateLikePortParams {
  userID: string
  messageID: string
}

export interface CreateLikePort {
  create(params: CreateLikePortParams): Promise<Like>
}
