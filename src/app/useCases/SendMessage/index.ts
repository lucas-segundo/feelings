import { Message } from '@/app/entities/Message'
import { SentimentNotPositive } from '@/app/errors/SentimentNotPositive'
import { CreateMessagePort } from '@/app/ports/CreateMessage'
import { DetectLanguagePort } from '@/app/ports/DetectLanguage'
import { SentimentAnalysisPort } from '@/app/ports/SentimentAnalysis'

export interface SendMessageUseCaseDTO {
  text: string
  userID: string
}

export class SendMessageUseCase {
  constructor(
    private readonly sentimentAnalysisPort: SentimentAnalysisPort,
    private readonly createMessagePort: CreateMessagePort,
    private readonly detectLanguagePort: DetectLanguagePort,
  ) {}

  async execute({ text, userID }: SendMessageUseCaseDTO): Promise<Message> {
    const analysis = await this.sentimentAnalysisPort.analyze(text)

    if (analysis.sentiment === 'positive') {
      const { language } = await this.detectLanguagePort.detect(text)
      return await this.createMessagePort.create({
        text,
        userID,
        language,
      })
    }

    throw new SentimentNotPositive()
  }
}
