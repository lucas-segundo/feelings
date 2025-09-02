'use server'

import { SendMessageUseCaseDTO } from '@/app/useCases/SendMessage'
import { makeSendMessageUseCase } from '@/app/useCases/SendMessage/factory'

export const sendMessage = async (dto: SendMessageUseCaseDTO) => {
  const sendMessageUseCase = makeSendMessageUseCase()
  return sendMessageUseCase.execute(dto)
}
