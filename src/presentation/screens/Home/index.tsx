'use client'

import { useState } from 'react'
import { MessageInput } from './components/MessageInput'
import { useTranslations } from 'next-intl'
import { Separator } from '@/presentation/components/ui/Separator'
import { createMessageService } from '@/data/services/CreateMessage'
import { toast } from 'sonner'
import LastMessages from './components/LastMessages'

export default function HomeScreen() {
  const t = useTranslations('Home')
  const [isLoading, setIsLoading] = useState(false)

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
