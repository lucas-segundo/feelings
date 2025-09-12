import { useState } from 'react'
import { Card } from '@/presentation/components/ui/Card'
import { Button } from '@/presentation/components/ui/Button'
import { Heart } from 'lucide-react'
import { Message } from '@/app/entities/Message'
import { Like } from '@/app/entities/Like'
import { Session } from '@/app/entities/Session'

interface MessageCardProps {
  session: Session | null
  hasUserLiked: boolean
  message: Message
  likes: Like[]
  onLike: (id: string) => void
  onDislike: (id: string) => void
}

export function MessageCard({
  session,
  message,
  likes,
  onLike,
  onDislike,
  hasUserLiked,
}: MessageCardProps) {
  const [hasUserLikedState, setHasUserLikedState] = useState(hasUserLiked)
  const [likesCount, setLikesCount] = useState(likes.length)

  const handleLike = () => {
    if (!session) {
      return onLike(message.id)
    }

    if (hasUserLikedState) {
      onDislike(message.id)
      setLikesCount((prev) => prev - 1)
    } else {
      onLike(message.id)
      setLikesCount((prev) => prev + 1)
    }

    setHasUserLikedState((prev) => !prev)
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
                hasUserLikedState
                  ? 'text-amber-600 bg-amber-50'
                  : 'text-gray-600'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${hasUserLikedState ? 'fill-current' : ''}`}
              />
              <span data-testid="likes-count">{likesCount}</span>
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
