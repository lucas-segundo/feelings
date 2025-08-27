'use server'

import { db } from '@/infra/drizzle'
import { GetMessagesService, GetMessagesServiceFilter } from './types'
import { messages } from '@/infra/drizzle/schema/tables/messages'
import { asc, desc, SQL } from 'drizzle-orm'

export const getMessagesService: GetMessagesService = async (
  filter: GetMessagesServiceFilter,
) => {
  const orderBy = adaptOrderFilter(filter?.order)

  const data = await db.query.messages.findMany({
    orderBy,
    limit: filter?.limit,
  })

  return data.map((message) => ({
    ...message,
    userID: message.userID.toString(),
    id: message.id.toString(),
  }))
}

const adaptOrderFilter = (order?: GetMessagesServiceFilter['order']): SQL[] => {
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
