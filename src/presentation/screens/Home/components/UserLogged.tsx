import { signOut } from '@/presentation/func/client/signOut'
import { Session } from '@/app/entities/Session'
import { Button } from '@/presentation/components/ui/Button'
import { LogOut } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface Props {
  session: Session
}

export const UserLogged = ({ session }: Props) => {
  const router = useRouter()

  const handleLogout = () => {
    signOut()
    router.push('/')
  }

  return (
    <div className="flex items-center space-x-2">
      <Image
        width={24}
        height={24}
        data-testid="user-photo"
        src={session.user.photo || '/images/user-placeholder.png'}
        alt="User avatar"
        className="rounded-full"
      />

      <Button
        data-testid="logout-button"
        variant="ghost"
        size="sm"
        onClick={handleLogout}
      >
        <LogOut className="w-4 h-4" />
      </Button>
    </div>
  )
}
