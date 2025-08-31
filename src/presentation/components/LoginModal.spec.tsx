import { describe, it, expect, vi } from 'vitest'
import { LoginModal } from './LoginModal'
import { signInWithProvider } from '../func/client/signInWithProvider'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import translation from '@/presentation/i18n/messages/en.json'
import { TestingProviders } from '../utils/TestingProviders'

vi.mock('../func/client/signInWithProvider')

describe('LoginModal', () => {
  const user = userEvent.setup()

  it('should call signInWithProvider for google', async () => {
    render(
      <TestingProviders>
        <LoginModal isOpen={true} onClose={() => {}} />
      </TestingProviders>,
    )

    await user.click(screen.getByText(translation.LoginModal.google))

    expect(signInWithProvider).toHaveBeenCalledWith({
      provider: 'google',
      callbackURL: '/',
    })
  })

  it('should call signInWithProvider for linkedin', async () => {
    render(
      <TestingProviders>
        <LoginModal isOpen={true} onClose={() => {}} />
      </TestingProviders>,
    )

    await user.click(screen.getByText(translation.LoginModal.linkedin))

    expect(signInWithProvider).toHaveBeenCalledWith({
      provider: 'linkedin',
      callbackURL: '/',
    })
  })
})
