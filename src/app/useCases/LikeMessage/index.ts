import { Like } from '@/app/entities/Like'
import { LikeAlreadyExists } from '@/app/errors/LikeAlreadyExists'
import { CreateLikePort } from '@/app/ports/CreateLike'
import { GetLikesPort } from '@/app/ports/GetLikes'

export interface LikeMessageUseCaseDTO {
  userID: string
  messageID: string
}

export class LikeMessageUseCase {
  constructor(
    private readonly getLikesPort: GetLikesPort,
    private readonly createLikePort: CreateLikePort,
  ) {}

  async execute(dto: LikeMessageUseCaseDTO): Promise<Like> {
    const likes = await this.getLikesPort.get({
      filter: {
        messageID: {
          eq: dto.messageID,
        },
        userID: {
          eq: dto.userID,
        },
      },
    })

    if (likes.length > 0) {
      throw new LikeAlreadyExists()
    }

    return await this.createLikePort.create(dto)
  }
}
