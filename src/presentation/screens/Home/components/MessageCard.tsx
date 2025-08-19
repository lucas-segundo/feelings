import { useState } from 'react'
import { Card } from '@/presentation/components/ui/card'
import { Button } from '@/presentation/components/ui/button'
import { Heart, ThumbsDown } from 'lucide-react'

interface Message {
  id: string
  text: string
  likes: number
  dislikes: number
  timestamp: Date
}

interface MessageCardProps {
  message: Message
  onLike: (id: string) => void
  onDislike: (id: string) => void
}

export function MessageCard({ message, onLike, onDislike }: MessageCardProps) {
  const [hasLiked, setHasLiked] = useState(false)
  const [hasDisliked, setHasDisliked] = useState(false)

  const handleLike = () => {
    if (!hasLiked) {
      onLike(message.id)
      setHasLiked(true)
      if (hasDisliked) {
        setHasDisliked(false)
      }
    }
  }

  const handleDislike = () => {
    if (!hasDisliked) {
      onDislike(message.id)
      setHasDisliked(true)
      if (hasLiked) {
        setHasLiked(false)
      }
    }
  }

  return (
    <Card className="p-4 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-3">
        <p className="text-gray-800 leading-relaxed">{message.text}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:bg-amber-50 ${
                hasLiked ? 'text-amber-600 bg-amber-50' : 'text-gray-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{message.likes + (hasLiked ? 1 : 0)}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleDislike}
              className={`flex items-center space-x-1 hover:bg-gray-100 ${
                hasDisliked ? 'text-gray-700 bg-gray-50' : 'text-gray-500'
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>{message.dislikes + (hasDisliked ? 1 : 0)}</span>
            </Button>
          </div>

          <span className="text-xs text-gray-500">
            {message.timestamp.toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  )
}
