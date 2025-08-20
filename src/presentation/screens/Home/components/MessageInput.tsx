import { useState } from 'react'
import { Button } from '@/presentation/components/ui/Button'
import { Card } from '@/presentation/components/ui/Card'
import { Send } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { TextArea } from '@/presentation/components/ui/TextArea'

interface MessageInputProps {
  onSubmit: (message: string) => void
}

export function MessageInput({ onSubmit }: MessageInputProps) {
  const t = useTranslations('MessageInput')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSubmit(message.trim())
      setMessage('')
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
              disabled={message.trim().length < 28}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white"
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
