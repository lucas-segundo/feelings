'use client'

import { useState } from 'react'
import { MessageInput } from './components/MessageInput'
import { useTranslations } from 'next-intl'
import LastMessages from './components/LastMessages'
import { LoginModal } from '@/presentation/components/LoginModal'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/infra/reactQuery'
import { Session } from '@/app/entities/Session'
import { SignInButton } from './components/SignInButton'
import { UserLogged } from './components/UserLogged'
import { likeMessages } from '@/presentation/func/server/likeMessages'
import { deleteLike } from '@/presentation/func/server/deleteLike'
import { Separator } from '@/presentation/components/ui/Separator'

interface Props {
  session: Session | null
}

export default function HomeScreen({ session }: Props) {
  const t = useTranslations('Home')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleOnLikeMessage = async (id: string) => {
    if (session) {
      likeMessages({ messageID: id, userID: session.user.id })
    } else {
      setIsLoginModalOpen(true)
    }
  }

  const handleOnDislikeMessage = async (id: string) => {
    if (session) {
      deleteLike({ messageID: id, userID: session.user.id })
    } else {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="absolute top-4 right-4">
          {session ? (
            <UserLogged session={session} />
          ) : (
            <SignInButton onClick={() => setIsLoginModalOpen(true)} />
          )}
        </div>
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl mb-4 text-gray-800">{t('title')}</h1>
            <p className="text-gray-600 mb-4">{t('description')}</p>
          </div>

          <div className="mb-8">
            <MessageInput
              session={session}
              onSubmitWithoutSession={() => setIsLoginModalOpen(true)}
            />
          </div>

          <Separator className="my-8" />

          <div className="mb-6">
            <LastMessages
              session={session}
              onLikeMessage={handleOnLikeMessage}
              onDislikeMessage={handleOnDislikeMessage}
            />
          </div>

          <div className="text-center text-sm text-gray-600 mt-8">
            <p>{t('footer')}</p>
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </QueryClientProvider>
  )
}
