import { Button } from '@/presentation/components/ui/Button'
import { User } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface Props {
  onClick: () => void
}

export const SignInButton = ({ onClick }: Props) => {
  const t = useTranslations('Home')
  return (
    <Button
      variant="outline"
      size="sm"
      className="flex items-center space-x-1 border-gray-300 text-gray-600 hover:bg-gray-50"
      onClick={onClick}
    >
      <User className="w-4 h-4" />
      <span>{t('signIn')}</span>
    </Button>
  )
}
