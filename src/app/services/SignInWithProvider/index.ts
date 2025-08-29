export interface SignInWithProviderPortParams {
  provider: 'google'
  callbackURL: string
}

export interface SignInWithProviderPort {
  signIn(params: SignInWithProviderPortParams): Promise<void>
}
