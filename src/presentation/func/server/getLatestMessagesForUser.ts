'use server'

import { GetLatestMessagesForUserDTO } from '@/app/useCases/GetLatestMessagesForUser'
import { makeGetLatestMessagesForUserUseCase } from '@/app/useCases/GetLatestMessagesForUser/factory'

export const getLatestMessagesForUser = async (
  params: GetLatestMessagesForUserDTO,
) => {
  const getLatestMessagesForUserUseCase = makeGetLatestMessagesForUserUseCase()
  return getLatestMessagesForUserUseCase.execute(params)
}
