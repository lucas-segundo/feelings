import { describe, it, expect, vi } from 'vitest'
import { getMessagesService } from '.'
import { mockDBMessage } from '@/infra/drizzle/mocks/Message'
import { db } from '@/infra/drizzle'
import { asc, desc } from 'drizzle-orm'
import { messages } from '@/infra/drizzle/schema/main'

vi.mock('@/infra/drizzle')

describe('getMessagesService', () => {
  it('should return messages', async () => {
    const dbMessages = [mockDBMessage(), mockDBMessage()]
    vi.mocked(db.query.messages.findMany).mockResolvedValue(dbMessages)

    const result = await getMessagesService({
      limit: 10,
      order: {
        createdAt: 'desc',
        likes: 'asc',
      },
    })

    expect(db.query.messages.findMany).toHaveBeenCalledWith({
      orderBy: [desc(messages.createdAt), asc(messages.likes)],
      limit: 10,
    })
    expect(result).toEqual(
      dbMessages.map((message) => ({
        ...message,
        id: message.id.toString(),
      })),
    )
  })
})
