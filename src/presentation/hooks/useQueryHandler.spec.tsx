import { beforeEach, describe, expect, it } from 'vitest'
import { useQueryHandler } from './useQueryHandler'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const mockReactQueryWrapper = () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )

  return wrapper
}

describe('useQueryHandler', () => {
  beforeEach(() => {
    queryClient.clear()
  })

  it('should return the data', async () => {
    const wrapper = mockReactQueryWrapper()
    const { result } = renderHook(
      () =>
        useQueryHandler({
          key: 'test',
          execute: async () => {
            return 'test'
          },
        }),
      {
        wrapper,
      },
    )

    expect(result.current.data).toBeUndefined()
    expect(result.current.isLoading).toBe(true)
    expect(result.current.error).toBeNull()

    await waitFor(() => {
      expect(result.current.data).toBe('test')
      expect(result.current.isLoading).toBe(false)
      expect(result.current.error).toBeNull()
    })
  })
})
