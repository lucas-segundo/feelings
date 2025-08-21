import { Message } from '@/domain/entities/Message'
import { ScrollArea } from '@/presentation/components/ui/ScrollArea'
import { MessageCard } from './MessageCard'
import { useTranslations } from 'next-intl'

const initialMessages: Message[] = [
  {
    id: '1',
    text: 'You have such a warm and welcoming energy! Thank you for being you! 🌟',
    likes: 42,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: '2',
    text: 'Your creativity and unique perspective inspire everyone around you! Keep shining! ✨',
    likes: 38,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
  },
  {
    id: '3',
    text: 'Someone out there is grateful for your kindness today. You make a difference! 💖',
    likes: 56,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
  },
  {
    id: '4',
    text: "Your smile has the power to brighten someone's entire day! Never underestimate it! 😊",
    likes: 29,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
  },
  {
    id: '5',
    text: 'You are stronger than you know and more loved than you realize! 🌈',
    likes: 67,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
  },
]

export default function LastMessages() {
  const t = useTranslations('Home')

  return (
    <div>
      <h2 className="text-2xl text-center mb-6 text-gray-800">
        {t('latestMessages')}
      </h2>
      <ScrollArea className="h-[600px] rounded-lg border border-gray-200 bg-white/80 p-4">
        <div className="space-y-4">
          {initialMessages.map((message) => (
            <MessageCard key={message.id} message={message} onLike={() => {}} />
          ))}

          {initialMessages.length === 0 && (
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
