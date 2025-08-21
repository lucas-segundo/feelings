import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, describe, vi, beforeEach, expect, afterEach } from 'vitest'
import { mockMessage } from '@/domain/entities/Message/mock'
import HomeScreen from '.'
import { faker } from '@faker-js/faker'
import { NextIntlClientProvider } from 'next-intl'
import messages from '@/presentation/i18n/messages/en.json'
import { createMessageService } from '@/data/services/CreateMessage'

vi.mock('@/data/services/CreateMessage')

describe('HomeScreen', () => {
  const user = userEvent.setup()
  const message = mockMessage()

  beforeEach(() => {
    vi.mocked(createMessageService).mockResolvedValue(message)
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <HomeScreen />
      </NextIntlClientProvider>,
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  it('should create a new message', async () => {
    const messageInput = screen.getByPlaceholderText(
      messages.MessageInput.placeholder,
    )

    const text = faker.lorem.sentence(20)
    await user.type(messageInput, text)
    await user.click(screen.getByText(messages.MessageInput.send))

    expect(createMessageService).toHaveBeenCalledWith({
      text,
    })
  })

  it('should not create a new message if it is less than 28 characters', async () => {
    const messageInput = screen.getByPlaceholderText(
      messages.MessageInput.placeholder,
    )
    const text = faker.lorem.words(2)
    await user.type(messageInput, text)

    await user.click(screen.getByText(messages.MessageInput.send))

    expect(createMessageService).not.toHaveBeenCalled()
  })
})
