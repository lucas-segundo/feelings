'use client'

import { useState } from 'react'
import { MessageInput } from './components/MessageInput'
import { useTranslations } from 'next-intl'
import { Separator } from '@/presentation/components/ui/Separator'
import { createMessageService } from '@/data/services/CreateMessage'
import { toast } from 'sonner'
import LastMessages from './components/LastMessages'
import { Button } from '@/presentation/components/ui/Button'
import { User } from 'lucide-react'
import { LoginModal } from '@/presentation/components/LoginModal'

export default function HomeScreen() {
  const t = useTranslations('Home')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleNewMessage = async (text: string) => {
    try {
      setIsLoading(true)
      await createMessageService({ text })
      toast.success(t('messageSent'))
    } catch {
      toast.error(t('messageCreationFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={() => setIsLoginModalOpen(false)}
      />
      <div className="absolute top-4 right-4">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center space-x-1 border-gray-300 text-gray-600 hover:bg-gray-50 cursor-pointer"
          onClick={() => setIsLoginModalOpen(true)}
        >
          <User className="w-4 h-4" />
          <span>{t('signIn')}</span>
        </Button>
      </div>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4 text-gray-800">{t('title')}</h1>
          <p className="text-gray-600 mb-4">{t('description')}</p>
        </div>

        <div className="mb-8">
          <MessageInput isLoading={isLoading} onSubmit={handleNewMessage} />
        </div>

        <Separator className="my-8" />

        <div className="mb-6">
          <LastMessages />
        </div>

        <div className="text-center text-sm text-gray-600 mt-8">
          <p>{t('footer')}</p>
        </div>
      </div>
    </div>
  )
}
