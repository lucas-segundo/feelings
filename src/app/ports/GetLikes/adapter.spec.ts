import { describe, expect, it, vi } from 'vitest'
import { DrizzleGetLikesAdapter } from './adapter'
import { db } from '@/infra/drizzle'
import { mockDBUserLike } from '@/infra/drizzle/mocks/UserLike'
import { usersLikes as dbUsersLikes } from '@/infra/drizzle/schema'
import { GetLikesPortParams } from '.'
import { and, inArray } from 'drizzle-orm'

vi.mock('@/infra/drizzle', () => ({
  db: {
    query: {
      usersLikes: {
        findMany: vi.fn(),
      },
    },
  },
}))

vi.mock('drizzle-orm')

describe('DrizzleGetLikesAdapter', () => {
  const adapter = new DrizzleGetLikesAdapter()

  it('should get users likes', async () => {
    const usersLikes = [mockDBUserLike(), mockDBUserLike()]

    vi.mocked(db.query.usersLikes.findMany).mockResolvedValue(usersLikes)

    const filter: GetLikesPortParams = {
      filter: {
        userID: {
          in: ['1', '2'],
        },
        messageID: {
          eq: '1',
        },
      },
      limit: 10,
      order: { createdAt: 'desc' as const },
    }

    const result = await adapter.get(filter)

    expect(db.query.usersLikes.findMany).toHaveBeenCalledWith({
      where: and(inArray(dbUsersLikes.messageID, [1, 2])),
      limit: 10,
      orderBy: expect.any(Array),
    })

    expect(result).toEqual(
      usersLikes.map((userLike) => ({
        createdAt: userLike.createdAt,
        userID: userLike.userID.toString(),
        messageID: userLike.messageID.toString(),
        id: userLike.id.toString(),
      })),
    )
  })
})
