import { eld } from '@/infra/eld'
import { DetectLanguagePort, DetectLanguagePortResult } from '.'
import { Language } from '@/app/entities/Message'

export class ELDDetectLanguageAdapter implements DetectLanguagePort {
  async detect(text: string): Promise<DetectLanguagePortResult> {
    const result = eld.detect(text)
    return {
      language: result as Language,
    }
  }
}
