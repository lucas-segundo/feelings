import { Message } from '@/domain/entities/Message'

export interface CreateMessageServiceData {
  text: string
}

export interface CreateMessageService {
  create(data: CreateMessageServiceData): Promise<Message>
}
