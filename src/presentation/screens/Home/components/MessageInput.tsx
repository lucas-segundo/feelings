import { useState } from 'react'
import { Button } from '@/presentation/components/ui/Button'
import { Card } from '@/presentation/components/ui/Card'
import { Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { TextArea } from '@/presentation/components/ui/TextArea'
import { toast } from 'sonner'
import { createMessageService } from '@/data/services/CreateMessage'
import { Session } from '@/domain/entities/Session'
import { useStateWithStorage } from '@/presentation/hooks/useStateWithStorage'

interface MessageInputProps {
  session: Session | null
  onSubmitWithoutSession: () => void
}

export function MessageInput({
  session,
  onSubmitWithoutSession,
}: MessageInputProps) {
  const t = useTranslations('MessageInput')
  const [message, setMessage] = useStateWithStorage('messageInput', '')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!session) {
      return onSubmitWithoutSession()
    }

    const text = message.trim()
    if (text) {
      await handleNewMessage(text, session)
      setMessage('')
    }
  }

  const handleNewMessage = async (text: string, session: Session) => {
    try {
      setIsLoading(true)
      await createMessageService({ text, userID: session.user.id })
      toast.success(t('messageSent'))
    } catch {
      toast.error(t('messageCreationFailed'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-lg">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl text-gray-800 mb-2">{t('title')}</h2>
          <p className="text-gray-600 text-sm">{t('description')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <TextArea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t('placeholder')}
              className="min-h-[100px] bg-gray-50 border-gray-200 focus:border-amber-400 focus:ring-amber-400 resize-none"
              minLength={28}
              maxLength={280}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {message.length}/280
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Button
              type="submit"
              disabled={message.trim().length < 28 || isLoading}
              isLoading={isLoading}
              className="flex w-40 items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Send className="w-4 h-4" />
              <span>{t('send')}</span>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}
