import { Session } from '@/app/entities/Session'

export type GetSessionService = () => Promise<Session | null>
