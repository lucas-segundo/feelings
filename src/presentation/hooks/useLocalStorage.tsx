import { useState, useEffect } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue?: T,
): [T, (value: T) => void] {
  const item = getItem(key)
  const [storedValue, setStoredValue] = useState(
    item ? JSON.parse(item) : initialValue,
  )

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
