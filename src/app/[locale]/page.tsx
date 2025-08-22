'use client'

import { queryClient } from '@/infra/reactQuery'
import Home from '@/presentation/screens/Home'
import { QueryClientProvider } from '@tanstack/react-query'

export default function HomePage() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}
