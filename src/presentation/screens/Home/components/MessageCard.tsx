import { useState } from 'react'
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { Heart } from 'lucide-react'
import { Message } from '@/app/entities/Message'

interface MessageCardProps {
  message: Message
  onLike: (id: string) => void
}

export function MessageCard({ message, onLike }: MessageCardProps) {
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

  return (
    <Card className="p-4 bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="space-y-3">
        <p className="text-gray-800 leading-relaxed">{message.text}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              data-testid="like-button"
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center space-x-1 hover:bg-amber-50 ${
                hasLiked ? 'text-amber-600 bg-amber-50' : 'text-gray-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasLiked ? 'fill-current' : ''}`} />
              <span>{hasLiked ? 1 : 0}</span>
            </Button>
          </div>

          <span className="text-xs text-gray-500">
            {message.createdAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    </Card>
  )
}
