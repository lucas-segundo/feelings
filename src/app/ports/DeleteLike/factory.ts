import { DeleteLikePort } from '.'
import { DrizzleDeleteLikeAdapter } from './adapter'

export const makeDeleteLikePort = (): DeleteLikePort => {
  return new DrizzleDeleteLikeAdapter()
}
