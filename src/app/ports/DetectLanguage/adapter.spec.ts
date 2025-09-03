import { describe, expect, it, vi } from 'vitest'
import { ELDDetectLanguageAdapter } from './adapter'
import { eld } from '@/infra/eld'

vi.mock('@/infra/eld')

describe('ELDDetectLanguageAdapter', () => {
  const detectLanguagePort = new ELDDetectLanguageAdapter()

  it('should detect language', async () => {
    vi.mocked(eld.detect).mockReturnValue('en')
    const result = await detectLanguagePort.detect('Hello, how are you?')
    expect(result).toEqual({ language: 'en' })
    expect(eld.detect).toHaveBeenCalledWith('Hello, how are you?')
  })
})
