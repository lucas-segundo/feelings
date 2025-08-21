'use client'

import { useState } from 'react'
import { ScrollArea } from '@/presentation/components/ui/ScrollArea'
import { MessageCard } from './components/MessageCard'
import { MessageInput } from './components/MessageInput'
import { useTranslations } from 'next-intl'
import { Separator } from '@/presentation/components/ui/Separator'
import { Message } from '@/domain/entities/Message'

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

export default function App() {
  const t = useTranslations('Home')
  const [messages, setMessages] = useState<Message[]>(initialMessages)

  const handleNewMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      likes: 0,
      createdAt: new Date(),
    }
    setMessages([newMessage, ...messages])
  }

  const handleLike = (id: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-4 text-gray-800">{t('title')}</h1>
          <p className="text-gray-600 mb-4">{t('description')}</p>
        </div>

        <div className="mb-8">
          <MessageInput onSubmit={handleNewMessage} />
        </div>

        <Separator className="my-8" />

        <div className="mb-6">
          <h2 className="text-2xl text-center mb-6 text-gray-800">
            {t('latestMessages')}
          </h2>

          <ScrollArea className="h-[600px] rounded-lg border border-gray-200 bg-white/80 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onLike={handleLike}
                />
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

        <div className="text-center text-sm text-gray-600 mt-8">
          <p>{t('footer')}</p>
        </div>
      </div>
    </div>
  )
}
