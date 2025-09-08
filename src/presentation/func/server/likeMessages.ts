'use server'

import { LikeMessageUseCaseDTO } from '@/app/useCases/LikeMessage'
import { makeLikeMessageUseCase } from '@/app/useCases/LikeMessage/factory'

export const likeMessages = async (dto: LikeMessageUseCaseDTO) => {
  const likeMessagesUseCase = makeLikeMessageUseCase()
  return likeMessagesUseCase.execute(dto)
}
