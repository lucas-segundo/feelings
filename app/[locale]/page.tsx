import Home from '@/presentation/screens/Home'
import { getSession } from '@/presentation/func/server/getSession'

export default async function HomePage() {
  const session = await getSession()

  return <Home session={session} />
}
