export type Language = 'pt' | 'en'
export interface Message {
  id: string
  text: string
  userID: string
  language: Language
  createdAt: Date
}
