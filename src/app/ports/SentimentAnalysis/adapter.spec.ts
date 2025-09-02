import { describe, expect, it, vi } from 'vitest'
import { gemini } from '@/infra/gemini'
import { GenerateContentResponse } from '@google/genai'
import { faker } from '@faker-js/faker'
import { GeminiSentimentAnalysisAdapter } from './adapter'

vi.mock('@/infra/gemini', () => ({
  gemini: {
    models: {
      generateContent: vi.fn(),
    },
  },
}))

describe('GeminiSentimentAnalysisAdapter', () => {
  const adapter = new GeminiSentimentAnalysisAdapter()

  it('should analyze sentiment', async () => {
    vi.mocked(gemini.models.generateContent).mockResolvedValue({
      text: '{"sentiment": "positive", "score": 0.5}',
    } as unknown as GenerateContentResponse)

    const text = faker.lorem.sentence()
    const result = await adapter.analyze(text)
    expect(gemini.models.generateContent).toHaveBeenCalledWith({
      model: 'gemini-2.5-flash',
      contents: adapter.generatePrompt(text),
    })

    expect(result).toEqual({
      sentiment: 'positive',
      score: 0.5,
    })
  })

  it('should throw an error if the response is undefined', () => {
    vi.mocked(gemini.models.generateContent).mockResolvedValue({
      text: undefined,
    } as unknown as GenerateContentResponse)

    expect(adapter.analyze(faker.lorem.sentence())).rejects.toThrow(
      'Failed to analyze sentiment',
    )
  })

  it('should throw an error if response doesnt contain sentiment or score', () => {
    vi.mocked(gemini.models.generateContent).mockResolvedValue({
      text: '{"invalid": "response"}',
    } as unknown as GenerateContentResponse)

    expect(adapter.analyze(faker.lorem.sentence())).rejects.toThrow(
      'Gemini API returned an invalid response',
    )
  })
})
