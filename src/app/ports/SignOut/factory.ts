import { BetterAuthSignOutAdapter } from './adapter'
import { SignOutPort } from '.'

export const makeSignOutPort = (): SignOutPort => {
  return new BetterAuthSignOutAdapter()
}
