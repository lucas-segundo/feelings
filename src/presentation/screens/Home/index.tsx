'use client'

import { useState } from 'react'
import { MessageInput } from './components/MessageInput'
import { useTranslations } from 'next-intl'
import { Separator } from '@/presentation/components/ui/Separator'
import LastMessages from './components/LastMessages'
import { LoginModal } from '@/presentation/components/LoginModal'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/infra/reactQuery'
import { Session } from '@/domain/entities/Session'
import { SignInButton } from './components/SignInButton'
import Image from 'next/image'
import { Button } from '@/presentation/components/ui/Button'
import { LogOut, User } from 'lucide-react'

interface Props {
  session: Session | null
}

export default function HomeScreen({ session }: Props) {
  const t = useTranslations('Home')
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const handleOnLikeMessage = async (id: string) => {
    if (session) {
      console.log('like message', id)
    } else {
      setIsLoginModalOpen(true)
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="absolute top-4 right-4">
          {session ? (
            <>
              <div className="flex items-center space-x-2">
                {session.user.photo ? (
                  <Image
                    width={32}
                    height={32}
                    data-testid="user-photo"
                    src={session.user.photo}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <User
                    className="w-8 h-8"
                    data-testid="user-placeholder-photo"
                  />
                )}
              </div>
              <Button
                data-testid="logout-button"
                variant="outline"
                size="sm"
                className="text-gray-600 hover:text-gray-900 hover:bg-transparent"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </>
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
            <LastMessages onLikeMessage={handleOnLikeMessage} />
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
