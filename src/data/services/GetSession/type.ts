import { Session } from '@/domain/entities/Session'

export type GetSessionService = () => Promise<Session | null>
