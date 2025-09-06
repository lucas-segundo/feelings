import { DrizzleCreateLikeAdapter } from './adapter'
import { CreateLikePort } from '.'

export const makeCreateLikePort = (): CreateLikePort => {
  return new DrizzleCreateLikeAdapter()
}
