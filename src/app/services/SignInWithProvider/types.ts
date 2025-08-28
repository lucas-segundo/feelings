interface Params {
  provider: 'google'
  callbackURL: string
}

export type SignInWithProviderService = (params: Params) => Promise<void>
