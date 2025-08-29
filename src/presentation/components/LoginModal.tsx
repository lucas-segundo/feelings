'use client'

import { Button } from '@/presentation/components/ui/Button'
import { Separator } from '@/presentation/components/ui/Separator'
import { User } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/presentation/components/ui/Dialog'
import { useTranslations } from 'next-intl'
import { GoogleIcon } from './svgs/Google'
import { signInWithProvider } from '@/presentation/func/client/signInWithProvider'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const t = useTranslations('LoginModal')

  const handleGoogleLogin = async () => {
    await signInWithProvider({
      provider: 'google',
      callbackURL: '/',
    })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center space-x-2">
            <User className="w-5 h-5 text-amber-600" />
            <span>{t('title')}</span>
          </DialogTitle>
          <DialogDescription className="text-center">
            {t('description')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6" data-testid="login-modal">
          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full h-12 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center space-x-3"
          >
            <GoogleIcon />
            <span>{t('google')}</span>
          </Button>
        </div>

        <div className="relative my-6">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-3 text-xs text-gray-500">
              {t('newToKindnessWall')}
            </span>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center">{t('byContinuing')}</p>
      </DialogContent>
    </Dialog>
  )
}
