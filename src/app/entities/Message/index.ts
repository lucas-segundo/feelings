export interface Message {
  id: string
  text: string
  userID: string
  language: 'pt' | 'en'
  createdAt: Date
}
