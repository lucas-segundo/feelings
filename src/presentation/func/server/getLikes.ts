'use server'

import { GetLikesPortParams } from '@/app/ports/GetLikes'
import { makeGetLikesPort } from '@/app/ports/GetLikes/factory'

export const getLikes = async (params: GetLikesPortParams) => {
  const getLikesPort = makeGetLikesPort()
  return getLikesPort.get(params)
}
