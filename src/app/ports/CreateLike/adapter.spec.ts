import { describe, expect, it, vi } from 'vitest'
import { mockLike } from '@/app/entities/Like/mock'
import { makeCreateLikePort } from './factory'
import { mockDBUserLike } from '@/infra/drizzle/mocks/UserLike'
import { db } from '@/infra/drizzle'

vi.mock('@/infra/drizzle', () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => ({
        returning: vi.fn(),
      })),
    })),
  },
}))

describe('CreateLikePort', () => {
  const createLikePort = makeCreateLikePort()
  const like = mockLike()

  it('should create a like', async () => {
    const dbLike = mockDBUserLike()

    vi.mocked(db.insert).mockReturnValue({
      values: vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([dbLike]),
      }),
    } as any)

    const result = await createLikePort.create({
      userID: like.userID,
      messageID: like.messageID,
    })
    expect(result).toEqual({
      createdAt: dbLike.createdAt,
      id: dbLike.id.toString(),
      userID: dbLike.userID.toString(),
      messageID: dbLike.messageID.toString(),
    })
  })
})
