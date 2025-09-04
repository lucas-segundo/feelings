import { ELDDetectLanguageAdapter } from './adapter'
import { DetectLanguagePort } from '.'

export const makeDetectLanguagePort = (): DetectLanguagePort => {
  return new ELDDetectLanguageAdapter()
}
