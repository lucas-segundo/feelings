import { Message } from '@/app/entities/Message'
import { GetLikesPort } from '@/app/ports/GetLikes'
import { GetMessagesPort } from '@/app/ports/GetMessages'

export interface GetLatestMessagesForUserDTO {
  userID: string
  limit?: number
  order?: {
    [K in 'createdAt']?: 'asc' | 'desc'
  }
}

export class GetLatestMessagesForUserUseCase {
  constructor(
    private readonly getMessagesPort: GetMessagesPort,
    private readonly getLikesPort: GetLikesPort,
  ) {}

  async execute(dto: GetLatestMessagesForUserDTO): Promise<Message[]> {
    const messages = await this.getMessagesPort.get({
      filter: {
        userID: {
          eq: dto.userID,
        },
      },
      limit: dto.limit,
      order: dto.order,
    })

    if (messages.length === 0) {
      return []
    }

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
