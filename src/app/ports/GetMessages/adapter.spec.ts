import { describe, it, expect, vi } from 'vitest'
import { mockDBMessage } from '@/infra/drizzle/mocks/Message'
import { db } from '@/infra/drizzle'
import { makeGetMessagesPort } from './factory'
import { messages } from '@/infra/drizzle/schema/tables/messages'
import { and, desc, eq } from 'drizzle-orm'

vi.mock('drizzle-orm')
vi.mock('@/infra/drizzle', () => ({
  db: {
    query: {
      messages: {
        findMany: vi.fn(),
      },
    },
  },
}))

describe('GetMessagesPort', () => {
  const getMessagesPort = makeGetMessagesPort()

  it('should get messages with default params', async () => {
    const dbMessages = [mockDBMessage(), mockDBMessage()]

    vi.mocked(db.query.messages.findMany).mockResolvedValue(dbMessages)

    const result = await getMessagesPort.get({})

    expect(db.query.messages.findMany).toHaveBeenCalledWith({
      orderBy: [],
      limit: undefined,
    })
    expect(result).toEqual(
      dbMessages.map((message) => ({
        ...message,
        userID: message.userID.toString(),
        id: message.id.toString(),
      })),
    )
  })

  it('should get messages with params', async () => {
    const dbMessages = [mockDBMessage()]
    const params = {
      limit: 10,
      order: { createdAt: 'desc' as const },
      filter: {
        userID: {
          eq: '1',
        },
      },
    }

    vi.mocked(db.query.messages.findMany).mockResolvedValue(dbMessages)

    const result = await getMessagesPort.get(params)

    expect(db.query.messages.findMany).toHaveBeenCalledWith({
      where: and(eq(messages.userID, 1)),
      orderBy: [desc(messages.createdAt)],
      limit: 10,
    })
    expect(result).toEqual(
      dbMessages.map((message) => ({
        ...message,
        userID: message.userID.toString(),
        id: message.id.toString(),
      })),
    )
  })
})
