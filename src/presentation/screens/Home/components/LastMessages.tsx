import { Message } from '@/domain/entities/Message'
import { ScrollArea } from '@/presentation/components/ui/ScrollArea'
import { MessageCard } from './MessageCard'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { getMessagesService } from '@/data/services/GetMessages'

export default function LastMessages() {
  const t = useTranslations('Home')
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    getLastMessages()
  }, [])

  const getLastMessages = async () => {
    const messages = await getMessagesService({
      limit: 10,
      order: {
        createdAt: 'desc',
      },
    })

    setMessages(messages)
  }

  return (
    <div>
      <h2 className="text-2xl text-center mb-6 text-gray-800">
        {t('latestMessages')}
      </h2>
      <ScrollArea className="h-[600px] rounded-lg border border-gray-200 bg-white/80 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <MessageCard key={message.id} message={message} onLike={() => {}} />
          ))}

          {messages.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <div className="text-6xl mb-4">🌈</div>
              <p>{t('noMessages')}</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
