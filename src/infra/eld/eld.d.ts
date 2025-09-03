declare module 'eld' {
  interface EldDetectResult {
    language: 'pt' | 'en'
  }

  interface Eld {
    dynamicLangSubset(languages: string[]): void
    detect(text: string): EldDetectResult
  }

  const eld: Eld
  export { eld }
}
