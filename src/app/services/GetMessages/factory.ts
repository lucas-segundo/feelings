import { DrizzleGetMessagesAdapter } from './adapter'
import { GetMessagesPort } from '.'

export const makeGetMessagesPort = (): GetMessagesPort => {
  return new DrizzleGetMessagesAdapter()
}
