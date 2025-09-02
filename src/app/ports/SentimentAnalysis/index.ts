export interface SentimentAnalysisPortResult {
  sentiment: string
  score: number
}

export interface SentimentAnalysisPort {
  analyze(text: string): Promise<SentimentAnalysisPortResult>
}
