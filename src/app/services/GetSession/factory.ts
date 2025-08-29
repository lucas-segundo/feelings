import { BetterAuthGetSessionAdapter } from './adapter'
import { GetSessionPort } from '.'

export const makeGetSessionPort = (): GetSessionPort => {
  return new BetterAuthGetSessionAdapter()
}
