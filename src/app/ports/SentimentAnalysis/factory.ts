import { SentimentAnalysisPort } from '.'
import { GeminiSentimentAnalysisAdapter } from './adapter'

export const makeSentimentAnalysisPort = (): SentimentAnalysisPort => {
  return new GeminiSentimentAnalysisAdapter()
}
