export interface DetectLanguagePortResult {
  language: 'pt' | 'en'
}

export interface DetectLanguagePort {
  detect(text: string): Promise<DetectLanguagePortResult>
}
