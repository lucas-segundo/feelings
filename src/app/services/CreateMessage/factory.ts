import { DrizzleCreateMessageAdapter } from './adapter'
import { CreateMessagePort } from '.'

export const makeCreateMessagePort = (): CreateMessagePort => {
  return new DrizzleCreateMessageAdapter()
}
