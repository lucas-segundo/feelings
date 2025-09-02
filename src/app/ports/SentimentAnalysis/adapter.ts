import { gemini } from '@/infra/gemini'
import { SentimentAnalysisPort, SentimentAnalysisPortResult } from '.'

export class GeminiSentimentAnalysisAdapter implements SentimentAnalysisPort {
  async analyze(text: string): Promise<SentimentAnalysisPortResult> {
    const prompt = this.generatePrompt(text)

    const response = await gemini.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    })

    if (!response.text) {
      throw new Error('Failed to analyze sentiment', {
        cause: response.text,
      })
    }

    const result = JSON.parse(response.text.replace(/^```json\n|```$/g, ''))

    if (!result.sentiment || !result.score) {
      throw new Error('Gemini API returned an invalid response', {
        cause: response.text,
      })
    }

    return {
      sentiment: result.sentiment,
      score: result.score,
    }
  }

  generatePrompt(text: string): string {
    return `As Sentiment analysis API, I have to identify the emotional tone of text, categorizing it as positive, negative, or neutral. The output should be a pure json without any other text containing the score and sentiment. The score should be between -1 and 1, where below 0 is negative and above 0 is positive.
    Text: ${text}
    `
  }
}
