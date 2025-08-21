import { DrizzleCreateMessageService } from '@/infra/drizzle/services/message/Create'
import { CreateMessageService } from '.'

export const makeCreateMessageService = (): CreateMessageService => {
  return new DrizzleCreateMessageService()
}
