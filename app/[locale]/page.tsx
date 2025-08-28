import Home from '@/presentation/screens/Home'
import { getSessionService } from '@/app/services/GetSession'

export default async function HomePage() {
  const session = await getSessionService()

  return <Home session={session} />
}
