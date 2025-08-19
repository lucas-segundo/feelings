import { useState } from 'react'
import { Button } from '@/presentation/components/ui/button'
import { Textarea } from '@/presentation/components/ui/textarea'
import { Card } from '@/presentation/components/ui/card'
import { Send, Sparkles } from 'lucide-react'

interface MessageInputProps {
  onSubmit: (message: string) => void
}

export function MessageInput({ onSubmit }: MessageInputProps) {
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      onSubmit(message.trim())
      setMessage('')
    }
  }

  const inspirationMessages = [
    'You are capable of amazing things! 🌟',
    'Your kindness makes the world brighter! ✨',
    'Someone is proud of you today! 💖',
    'You have a beautiful smile! 😊',
    'Your positive energy is contagious! 🌈',
  ]

  const addInspiration = () => {
    const randomMessage =
      inspirationMessages[
        Math.floor(Math.random() * inspirationMessages.length)
      ]
    setMessage(randomMessage)
  }

  return (
    <Card className="p-6 bg-white border-gray-200 shadow-lg">
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-xl text-gray-800 mb-2">Spread Some Joy! ✨</h2>
          <p className="text-gray-600 text-sm">
            Write a positive message to brighten someone&apos;s day
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your uplifting message here..."
              className="min-h-[100px] bg-gray-50 border-gray-200 focus:border-amber-400 focus:ring-amber-400 resize-none"
              maxLength={280}
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-400">
              {message.length}/280
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={addInspiration}
              className="flex items-center space-x-1 border-gray-300 text-gray-600 hover:bg-gray-50"
            >
              <Sparkles className="w-4 h-4" />
              <span>Need inspiration?</span>
            </Button>

            <Button
              type="submit"
              disabled={!message.trim()}
              className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Send className="w-4 h-4" />
              <span>Send Kindness</span>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  )
}
