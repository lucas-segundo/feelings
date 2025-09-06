import { db } from '@/infra/drizzle'
import { GetLikesPort, GetLikesPortParams } from '.'
import { usersLikes } from '@/infra/drizzle/schema'
import { and, asc, desc, eq, inArray, SQL } from 'drizzle-orm'
import { Like } from '@/app/entities/Like'

export class DrizzleGetLikesAdapter implements GetLikesPort {
  async get({ filter, limit, order }: GetLikesPortParams): Promise<Like[]> {
    const data = await db.query.usersLikes.findMany({
      where: and(...this.adaptFilter(filter)),
      limit,
      orderBy: this.adaptOrderFilter(order),
    })

    return data.map((userLike) => ({
      createdAt: userLike.createdAt,
      userID: userLike.userID.toString(),
      messageID: userLike.messageID.toString(),
      id: userLike.id.toString(),
    }))
  }

  private adaptFilter(filter?: GetLikesPortParams['filter']): SQL[] {
    const conditions: SQL[] = []

    if (filter?.userID?.eq) {
      conditions.push(eq(usersLikes.userID, Number(filter.userID.eq)))
    } else if (filter?.userID?.in) {
      conditions.push(inArray(usersLikes.userID, filter.userID.in.map(Number)))
    }

    if (filter?.messageID?.eq) {
      conditions.push(eq(usersLikes.messageID, Number(filter.messageID.eq)))
    } else if (filter?.messageID?.in) {
      conditions.push(
        inArray(usersLikes.messageID, filter.messageID.in.map(Number)),
      )
    }

    return conditions
  }

  private adaptOrderFilter(order?: GetLikesPortParams['order']): SQL[] {
    const orderBy: SQL[] = []

    if (order?.createdAt) {
      const direction =
        order.createdAt === 'asc'
          ? asc(usersLikes.createdAt)
          : desc(usersLikes.createdAt)
      orderBy.push(direction)
    }

    return orderBy
  }
}
