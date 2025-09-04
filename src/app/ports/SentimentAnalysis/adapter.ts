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
    return `As Sentiment analysis API, you have to identify the emotional tone of text, categorizing it as positive, negative, or neutral. The output should be a pure json without any other text containing the score and sentiment.

    How the Score is Calculated:

    The goal is to distill the entire text into a single, easy-to-understand score.

    Aggregation: In the simple lexicon-based approach, the system adds up the scores of all the sentimental words.
    Example: "The service was great (+2) but the food was awful (-3)."
    Calculation: (+2) + (-3) = -1. The raw score is -1.

    Normalization: A raw score isn't very useful for comparing different texts. Therefore, this score is typically normalized to fit a consistent scale, most commonly from -1.0 (most negative) to +1.0 (most positive), with 0 being neutral. A common way to do this is to divide the raw score by the number of words with a score.
    Example: Using the sentence above, the raw score is -1, and there are two scored words ("great," "awful").
    Normalized Score: -1 / 2 = -0.5.

    Classification: Finally, the normalized score is used to classify the text into a category. The thresholds for these categories can vary, but a common setup is:
    positive: Score > 0.2
    neutral: Score between -0.2 and 0.2
    negative: Score < -0.2

    Text to analyze: ${text}
    `
  }
}
