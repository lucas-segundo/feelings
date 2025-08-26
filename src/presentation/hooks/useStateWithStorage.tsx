import { useState, useEffect } from 'react'

export function useStateWithStorage<T>(
  key: string,
  initialValue?: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue as T)

  useEffect(() => {
    const item = getItem(key)
    if (item) {
      try {
        setStoredValue(JSON.parse(item))
      } catch (error) {
        console.error('Error parsing localStorage item:', error)
      }
    }
  }, [key])

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

const getItem = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key)
  }
  return null
}
