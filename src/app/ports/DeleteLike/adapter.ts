import { db } from '@/infra/drizzle'
import { usersLikes } from '@/infra/drizzle/schema'
import { DeleteLikePort, DeleteLikePortParams } from '.'
import { and, eq, SQL } from 'drizzle-orm'

export class DrizzleDeleteLikeAdapter implements DeleteLikePort {
  async delete(params: DeleteLikePortParams): Promise<void> {
    await db.delete(usersLikes).where(and(...this.adaptFilter(params)))
  }

  private adaptFilter(params: DeleteLikePortParams): SQL[] {
    const conditions: SQL[] = []

    if (params.id) {
      conditions.push(eq(usersLikes.id, Number(params.id)))
    }

    if (params.messageID) {
      conditions.push(eq(usersLikes.messageID, Number(params.messageID)))
    }

    if (params.userID) {
      conditions.push(eq(usersLikes.userID, Number(params.userID)))
    }

    return conditions
  }
}
