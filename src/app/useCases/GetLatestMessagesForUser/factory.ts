import { makeGetLikesPort } from '@/app/ports/GetLikes/factory'
import { makeGetMessagesPort } from '@/app/ports/GetMessages/factory'
import { GetLatestMessagesForUserUseCase } from '.'

export const makeGetLatestMessagesForUserUseCase =
  (): GetLatestMessagesForUserUseCase => {
    return new GetLatestMessagesForUserUseCase(
      makeGetMessagesPort(),
      makeGetLikesPort(),
    )
  }
