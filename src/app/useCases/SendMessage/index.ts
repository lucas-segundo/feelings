import { Message } from '@/app/entities/Message'
import { CreateMessagePort } from '@/app/ports/CreateMessage'
import { SentimentAnalysisPort } from '@/app/ports/SentimentAnalysis'

export interface SendMessageUseCaseDTO {
  text: string
  userID: string
}

export class SendMessageUseCase {
  constructor(
    private readonly sentimentAnalysisPort: SentimentAnalysisPort,
    private readonly createMessagePort: CreateMessagePort,
  ) {}

  async execute(data: SendMessageUseCaseDTO): Promise<Message> {
    const analysis = await this.sentimentAnalysisPort.analyze(data.text)

    if (analysis.sentiment === 'positive') {
      return await this.createMessagePort.create({
        text: data.text,
        userID: data.userID,
      })
    }

    throw new Error('Sentiment analysis is not positive')
  }
}
