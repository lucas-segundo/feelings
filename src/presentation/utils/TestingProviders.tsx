import { NextIntlClientProvider } from 'next-intl'
import { Toaster } from 'sonner'
import messages from '@/presentation/i18n/messages/en.json'

export function TestingProviders({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      {children}
      <Toaster />
    </NextIntlClientProvider>
  )
}
