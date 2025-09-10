import { ScrollArea } from '@/presentation/components/ui/ScrollArea'
import { useTranslations } from 'next-intl'

import { useQueryHandler } from '@/presentation/hooks/useQueryHandler'
import { LoaderCircle } from 'lucide-react'
import { MessageCard } from './MessageCard'
import { getLatestMessagesForUser } from '@/presentation/func/server/getLatestMessagesForUser'
import { Session } from '@/app/entities/Session'
import { getMessages } from '@/presentation/func/server/getMessages'

interface LastMessagesProps {
  session: Session | null
  onLikeMessage: (id: string) => void
}

export default function LastMessages({
  session,
  onLikeMessage,
}: LastMessagesProps) {
  const t = useTranslations('Home')
  const { data = [], isLoading } = useQueryHandler({
    key: 'messages',
    execute: () => handleGetMessages(),
  })

  const handleGetMessages = async () => {
    if (session) {
      return getLatestMessagesForUser({
        userID: session.user.id,
        limit: 10,
        order: {
          createdAt: 'desc',
        },
      })
    } else {
      return getMessages({
        limit: 10,
        order: {
          createdAt: 'desc',
        },
      })
    }
  }

  return (
    <div>
      <h2 className="text-2xl text-center mb-6 text-gray-800">
        {t('latestMessages')}
      </h2>

      <ScrollArea className="h-[600px] rounded-lg border border-gray-200 bg-white/80 p-4">
        <div className="space-y-4">
          {isLoading && (
            <div className="flex flex-col justify-center items-center mt-10">
              <LoaderCircle
                size={30}
                data-testid="last-messages-loading"
                className="animate-spin"
              />
            </div>
          )}

          {data.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>{t('noMessages')}</p>
            </div>
          )}

          {data.map((message) => (
            <MessageCard
              key={message.id}
              message={message}
              onLike={onLikeMessage}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
