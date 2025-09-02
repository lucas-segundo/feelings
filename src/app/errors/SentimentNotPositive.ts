export class SentimentNotPositive extends Error {
  constructor() {
    super('Sentiment analysis is not positive')
    this.name = 'SentimentNotPositive'
  }
}
