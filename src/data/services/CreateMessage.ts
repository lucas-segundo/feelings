import { Message } from '@/domain/entities/Message'

interface Params {
  data: {
    text: string
  }
}

export interface CreateMessageService {
  create(params: Params): Promise<Message>
}
