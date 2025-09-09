import { Message } from '@/app/entities/Message'
import { GetLikesPort } from '@/app/ports/GetLikes'
import { GetMessagesPort } from '@/app/ports/GetMessages'

interface GetLatestMessagesForUserUseCaseDTO {
  userID: string
}

export class GetLatestMessagesForUserUseCase {
  constructor(
    private readonly getMessagesPort: GetMessagesPort,
    private readonly getLikesPort: GetLikesPort,
  ) {}

  async execute(dto: GetLatestMessagesForUserUseCaseDTO): Promise<Message[]> {
    const messages = await this.getMessagesPort.get({
      filter: {
        userID: {
          eq: dto.userID,
        },
      },
    })

    const likes = await this.getLikesPort.get({
      filter: {
        userID: {
          eq: dto.userID,
        },
      },
    })

    return messages.filter(
      (message) => !likes.some((like) => like.messageID === message.id),
    )
  }
}
