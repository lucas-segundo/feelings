import { describe, it, expect, vi } from 'vitest'
import { mockDBMessage } from '@/infra/drizzle/mocks/Message'
import { db } from '@/infra/drizzle'
import { messages } from '@/infra/drizzle/schema/tables/messages'
import { makeCreateMessagePort } from './factory'

vi.mock('@/infra/drizzle', () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(),
      })),
    })),
  },
}))

describe('CreateMessagePort', () => {
  const createMessagePort = makeCreateMessagePort()

  it('should create a message', async () => {
    const dbMessage = mockDBMessage()

    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([dbMessage]),
      }),
    } as any)

    const result = await createMessagePort.create({
      text: dbMessage.text,
      userID: dbMessage.userID.toString(),
    })

    expect(
      db.insert(messages).values(dbMessage).returning,
    ).toHaveBeenCalledWith({
      id: messages.id,
      text: messages.text,
      createdAt: messages.createdAt,
      userID: messages.userID,
    })
    expect(result).toEqual({
      ...dbMessage,
      id: dbMessage.id.toString(),
      userID: dbMessage.userID.toString(),
    })
  })
})
