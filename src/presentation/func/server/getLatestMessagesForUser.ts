'use server'

import { GetLatestMessagesForUserUseCaseDTO } from '@/app/useCases/GetLatestMessagesForUser'
import { makeGetLatestMessagesForUserUseCase } from '@/app/useCases/GetLatestMessagesForUser/factory'

export const getLatestMessagesForUser = async (
  params: GetLatestMessagesForUserUseCaseDTO,
) => {
  const getLatestMessagesForUserUseCase = makeGetLatestMessagesForUserUseCase()
  return getLatestMessagesForUserUseCase.execute(params)
}
