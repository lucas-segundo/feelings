import { db } from '@/infra/drizzle'
import { GetMessagesPort, GetMessagesPortParams } from '.'
import { messages } from '@/infra/drizzle/schema/tables/messages'
import { and, asc, desc, eq, SQL } from 'drizzle-orm'

export class DrizzleGetMessagesAdapter implements GetMessagesPort {
  async get({ limit, order, filter }: GetMessagesPortParams) {
    const orderBy = this.adaptOrderFilter(order)

    const data = await db.query.messages.findMany({
      where: and(...this.adaptFilter(filter)),
      orderBy,
      limit,
    })

    return data.map((message) => ({
      ...message,
      userID: message.userID.toString(),
      id: message.id.toString(),
    }))
  }

  private adaptFilter(filter?: GetMessagesPortParams['filter']): SQL[] {
    const conditions: SQL[] = []

    if (filter?.userID?.eq) {
      conditions.push(eq(messages.userID, Number(filter.userID.eq)))
    }

    return conditions
  }

  private adaptOrderFilter(order?: GetMessagesPortParams['order']): SQL[] {
    const orderBy: SQL[] = []

    if (order?.createdAt) {
      const direction =
        order.createdAt === 'asc'
          ? asc(messages.createdAt)
          : desc(messages.createdAt)
      orderBy.push(direction)
    }

    return orderBy
  }
}
