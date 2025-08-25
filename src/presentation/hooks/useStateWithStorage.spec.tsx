import { describe, it, expect } from 'vitest'
import { useStateWithStorage } from './useStateWithStorage'
import { act, renderHook } from '@testing-library/react'

describe('useStateWithStorage', () => {
  it('should return the initial value', () => {
    const { result } = renderHook(() => useStateWithStorage('test', 'initial'))
    const [value] = result.current
    expect(value).toBe('initial')
  })

  it('should update the value', () => {
    const { result } = renderHook(() => useStateWithStorage('test', 'initial'))
    const [, setValue] = result.current

    act(() => {
      setValue('updated')
    })

    const [value] = result.current
    expect(value).toBe('updated')

    act(() => {
      setValue('initial')
    })

    const [value2] = result.current
    expect(value2).toBe('initial')
  })
})
