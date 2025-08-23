import { User } from '../User'

export interface Session {
  id: string
  token: string
  expiresAt: Date
  user: User
}
