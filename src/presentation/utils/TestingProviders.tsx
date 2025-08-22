import { NextIntlClientProvider } from 'next-intl'
import { Toaster } from 'sonner'
import messages from '@/presentation/i18n/messages/en.json'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/infra/reactQuery'

export function TestingProviders({ children }: { children: React.ReactNode }) {
  queryClient.clear()
  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale="en" messages={messages}>
        {children}
        <Toaster />
      </NextIntlClientProvider>
    </QueryClientProvider>
  )
}
