import { LikeMessageUseCase } from '.'
import { makeCreateLikePort } from '@/app/ports/CreateLike/factory'
import { makeGetLikesPort } from '@/app/ports/GetLikes/factory'

export const makeLikeMessageUseCase = (): LikeMessageUseCase => {
  return new LikeMessageUseCase(makeGetLikesPort(), makeCreateLikePort())
}
