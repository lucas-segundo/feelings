declare module 'eld' {
  interface Eld {
    dynamicLangSubset(languages: string[]): void
    detect(text: string): string
  }

  const eld: Eld
  export { eld }
}
