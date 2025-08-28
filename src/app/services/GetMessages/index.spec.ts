import { describe, it, expect, vi } from 'vitest'
import { getMessagesService } from '.'
import { mockDBMessage } from '@/infra/drizzle/mocks/Message'
import { db } from '@/infra/drizzle'
import { desc } from 'drizzle-orm'
import { messages } from '@/infra/drizzle/schema/tables/messages'

vi.mock('@/infra/drizzle')

describe('getMessagesService', () => {
  it('should return messages', async () => {
    const dbMessages = [mockDBMessage(), mockDBMessage()]
    vi.mocked(db.query.messages.findMany).mockResolvedValue(dbMessages)

    const result = await getMessagesService({
      limit: 10,
      order: {
        createdAt: 'desc',
      },
    })

    expect(db.query.messages.findMany).toHaveBeenCalledWith({
      orderBy: [desc(messages.createdAt)],
      limit: 10,
    })
    expect(result).toEqual(
      dbMessages.map((message) => ({
        ...message,
        id: message.id.toString(),
        userID: message.userID.toString(),
      })),
    )
  })
})
