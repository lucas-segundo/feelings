import { db } from '@/infra/drizzle'
import { CreateLikePort, CreateLikePortParams } from '.'
import { usersLikes } from '@/infra/drizzle/schema'
import { Like } from '@/app/entities/Like'

export class DrizzleCreateLikeAdapter implements CreateLikePort {
  async create(params: CreateLikePortParams): Promise<Like> {
    const [newLike] = await db
      .insert(usersLikes)
      .values({
        userID: Number(params.userID),
        messageID: Number(params.messageID),
      })
      .returning({
        id: usersLikes.id,
        userID: usersLikes.userID,
        messageID: usersLikes.messageID,
        createdAt: usersLikes.createdAt,
      })

    return {
      createdAt: newLike.createdAt,
      id: newLike.id.toString(),
      userID: newLike.userID.toString(),
      messageID: newLike.messageID.toString(),
    }
  }
}
