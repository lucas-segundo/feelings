import { Session } from '@/app/entities/Session'

export interface GetSessionPort {
  get(): Promise<Session | null>
}
