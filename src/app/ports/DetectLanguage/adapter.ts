import { eld } from '@/infra/eld'
import { DetectLanguagePort, DetectLanguagePortResult } from '.'

export class ELDDetectLanguageAdapter implements DetectLanguagePort {
  async detect(text: string): Promise<DetectLanguagePortResult> {
    const result = await eld.detect(text)
    return {
      language: result.language,
    }
  }
}
