import {
  CreateMessageService,
  CreateMessageServiceData,
} from '@/data/services/CreateMessage'
import { db } from '@/infra/drizzle'
import { messages } from '@/infra/drizzle/schema'

export class DrizzleCreateMessageService implements CreateMessageService {
  async create(data: CreateMessageServiceData) {
    const [message] = await db.insert(messages).values(data).returning({
      id: messages.id,
      text: messages.text,
      likes: messages.likes,
      createdAt: messages.createdAt,
    })

    return {
      ...message,
      id: message.id.toString(),
    }
  }
}
