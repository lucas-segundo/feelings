import { DeleteLikePortParams } from '@/app/ports/DeleteLike'
import { makeDeleteLikePort } from '@/app/ports/DeleteLike/factory'

export const deleteLike = async (params: DeleteLikePortParams) => {
  const deleteLikePort = makeDeleteLikePort()
  return deleteLikePort.delete(params)
}
