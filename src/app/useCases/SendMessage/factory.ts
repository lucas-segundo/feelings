import { makeSentimentAnalysisPort } from '@/app/ports/SentimentAnalysis/factory'
import { SendMessageUseCase } from '.'
import { makeCreateMessagePort } from '@/app/ports/CreateMessage/factory'

export const makeSendMessageUseCase = (): SendMessageUseCase => {
  return new SendMessageUseCase(
    makeSentimentAnalysisPort(),
    makeCreateMessagePort(),
  )
}
