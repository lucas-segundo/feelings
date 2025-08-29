import { describe, it, expect, vi } from 'vitest'
import { mockDBMessage } from '@/infra/drizzle/mocks/Message'
import { db } from '@/infra/drizzle'
import { makeGetMessagesPort } from './factory'

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

  it('should get messages with default filter', async () => {
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

  it('should get messages with filter', async () => {
    const dbMessages = [mockDBMessage()]
    const filter = {
      limit: 10,
      order: { createdAt: 'desc' as const },
    }

    vi.mocked(db.query.messages.findMany).mockResolvedValue(dbMessages)

    const result = await getMessagesPort.get(filter)

    expect(db.query.messages.findMany).toHaveBeenCalledWith({
      orderBy: expect.any(Array),
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
