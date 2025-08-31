export interface SignInWithProviderPortParams {
  provider: 'google' | 'linkedin'
  callbackURL: string
}

export interface SignInWithProviderPort {
  signIn(params: SignInWithProviderPortParams): Promise<void>
}
