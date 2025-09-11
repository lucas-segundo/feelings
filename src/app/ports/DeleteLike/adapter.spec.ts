import { describe, expect, it, vi } from 'vitest'
import { makeDeleteLikePort } from './factory'
import { usersLikes } from '@/infra/drizzle/schema'
import { db } from '@/infra/drizzle'
import { and, eq } from 'drizzle-orm'

vi.mock('@/infra/drizzle', () => ({
  db: {
    delete: vi.fn().mockReturnValue({
      where: vi.fn(),
    }),
  },
}))

describe('DeleteLikePort', () => {
  const deleteLikePort = makeDeleteLikePort()

  it('should delete a like', async () => {
    await deleteLikePort.delete({ id: '1', messageID: '1', userID: '1' })

    expect(db.delete(usersLikes).where).toHaveBeenCalledWith(
      and(
        eq(usersLikes.id, 1),
        eq(usersLikes.messageID, 1),
        eq(usersLikes.userID, 1),
      ),
    )
  })
})
