import { DrizzleGetLikesAdapter } from './adapter'
import { GetLikesPort } from '.'

export const makeGetLikesPort = (): GetLikesPort => {
  return new DrizzleGetLikesAdapter()
}
