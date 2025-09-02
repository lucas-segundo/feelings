export interface SentimentAnalysisPortResult {
  sentiment: 'positive' | 'negative' | 'neutral'
  score: number
}

export interface SentimentAnalysisPort {
  analyze(text: string): Promise<SentimentAnalysisPortResult>
}
