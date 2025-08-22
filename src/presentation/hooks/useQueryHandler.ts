import { useQuery } from '@tanstack/react-query'

interface Params<T> {
  key: string
  execute: () => Promise<T>
}

interface Result<T> {
  data: T | undefined
  isLoading: boolean
  error: Error | null
}

export const useQueryHandler = <T>({ key, execute }: Params<T>): Result<T> => {
  const { data, isLoading, error } = useQuery<T>({
    queryKey: [key],
    queryFn: execute,
  })

  return { data, isLoading, error }
}
