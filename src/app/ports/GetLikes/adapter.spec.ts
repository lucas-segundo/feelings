import { describe, expect, it, vi } from 'vitest'
import { DrizzleGetLikesAdapter } from './adapter'
import { db } from '@/infra/drizzle'
import { mockDBUserLike } from '@/infra/drizzle/mocks/UserLike'
import { usersLikes as dbUsersLikes } from '@/infra/drizzle/schema'
import { GetLikesPortFilter } from '.'
import { and, eq, inArray } from 'drizzle-orm'

vi.mock('@/infra/drizzle', () => ({
  db: {
    query: {
      usersLikes: {
        findMany: vi.fn(),
      },
    },
  },
}))

describe('DrizzleGetLikesAdapter', () => {
  const adapter = new DrizzleGetLikesAdapter()

  it('should get users likes', async () => {
    const usersLikes = [mockDBUserLike(), mockDBUserLike()]

    vi.mocked(db.query.usersLikes.findMany).mockResolvedValue(usersLikes)

    const filter: GetLikesPortFilter = {
      userID: {
        eq: '1',
      },
      messageID: {
        in: ['1', '2'],
      },
      limit: 10,
      order: { createdAt: 'desc' as const },
    }

    const result = await adapter.get(filter)

    expect(db.query.usersLikes.findMany).toHaveBeenCalledWith({
      where: and(
        eq(dbUsersLikes.userID, 1),
        inArray(dbUsersLikes.messageID, [1, 2]),
      ),
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
