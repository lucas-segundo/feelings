import { db } from '@/infra/drizzle'
import { CreateMessagePort, CreateMessagePortParams } from '.'
import { Message } from '@/app/entities/Message'
import { messages } from '@/infra/drizzle/schema/tables/messages'

export class DrizzleCreateMessageAdapter implements CreateMessagePort {
  async create(message: CreateMessagePortParams): Promise<Message> {
    const [newMessage] = await db
      .insert(messages)
      .values({
        text: message.text,
        userID: Number(message.userID),
      })
      .returning({
        id: messages.id,
        text: messages.text,
        createdAt: messages.createdAt,
        userID: messages.userID,
      })

    return {
      ...newMessage,
      id: newMessage.id.toString(),
      userID: newMessage.userID.toString(),
    }
  }
}
