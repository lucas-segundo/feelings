import { describe, expect, it, Mocked, vi } from 'vitest'
import { SendMessageUseCase } from '.'
import { SentimentAnalysisPort } from '@/app/ports/SentimentAnalysis'
import { CreateMessagePort } from '@/app/ports/CreateMessage'
import { mockMessage } from '@/app/entities/Message/mock'
import { SentimentNotPositive } from '@/app/errors/SentimentNotPositive'

const sentimentAnalysisPort: Mocked<SentimentAnalysisPort> = {
  analyze: vi.fn(),
}

const createMessagePort: Mocked<CreateMessagePort> = {
  create: vi.fn(),
}

describe('SendMessageUseCase', () => {
  const sendMessageUseCase = new SendMessageUseCase(
    sentimentAnalysisPort,
    createMessagePort,
  )
  const message = mockMessage()

  it('should send a message', async () => {
    vi.mocked(sentimentAnalysisPort.analyze).mockResolvedValue({
      sentiment: 'positive',
      score: 1,
    })

    vi.mocked(createMessagePort.create).mockResolvedValue(message)

    const { text, userID } = message
    const result = await sendMessageUseCase.execute({
      text,
      userID,
    })

    expect(result).toEqual(message)
    expect(sentimentAnalysisPort.analyze).toHaveBeenCalledWith(message.text)
    expect(createMessagePort.create).toHaveBeenCalledWith({
      text,
      userID,
    })
  })

  it('should throw an error if the sentiment is negative', async () => {
    vi.mocked(sentimentAnalysisPort.analyze).mockResolvedValue({
      sentiment: 'negative',
      score: 0.5,
    })

    const { text, userID } = message
    const result = sendMessageUseCase.execute({
      text,
      userID,
    })

    expect(result).rejects.toThrow(SentimentNotPositive)
    expect(sentimentAnalysisPort.analyze).toHaveBeenCalledWith(message.text)
    expect(createMessagePort.create).not.toHaveBeenCalled()
  })
})
