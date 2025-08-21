import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, describe, vi, beforeEach, expect, afterEach } from 'vitest'
import { mockMessage } from '@/domain/entities/Message/mock'
import HomeScreen from '.'
import { faker } from '@faker-js/faker'
import translation from '@/presentation/i18n/messages/en.json'
import { createMessageService } from '@/data/services/CreateMessage'
import { TestingProviders } from '@/presentation/utils/TestingProviders'
import { getMessagesService } from '@/data/services/GetMessages'
import { GetMessagesServiceFilter } from '@/data/services/GetMessages/types'

vi.mock('@/data/services/CreateMessage')
vi.mock('@/data/services/GetMessages')

describe('HomeScreen', () => {
  const user = userEvent.setup()
  const message = mockMessage()
  const messages = [mockMessage(), mockMessage(), mockMessage()]

  beforeEach(() => {
    vi.mocked(createMessageService).mockResolvedValue(message)
    vi.mocked(getMessagesService).mockResolvedValue(messages)
    render(
      <TestingProviders>
        <HomeScreen />
      </TestingProviders>,
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  it('should create a new message', async () => {
    const messageInput = screen.getByPlaceholderText(
      translation.MessageInput.placeholder,
    )

    vi.mocked(createMessageService).mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      return message
    })

    const text = faker.lorem.sentence(20)
    await user.type(messageInput, text)
    await user.click(screen.getByText(translation.MessageInput.send))

    expect(screen.getByTestId('loading-spinner')).toBeDefined()

    expect(createMessageService).toHaveBeenCalledWith({
      text,
    })

    const successMessage = await screen.findByText(translation.Home.messageSent)
    expect(successMessage).toBeDefined()

    expect(screen.queryByTestId('loading-spinner')).toBeNull()
    expect(screen.queryByText(text)).toBeNull()
  })

  it('should not create a new message if it is less than 28 characters', async () => {
    const messageInput = screen.getByPlaceholderText(
      translation.MessageInput.placeholder,
    )
    const text = faker.lorem.words(2)
    await user.type(messageInput, text)

    await user.click(screen.getByText(translation.MessageInput.send))

    expect(createMessageService).not.toHaveBeenCalled()
  })

  it('should show error message if creation fails', async () => {
    vi.mocked(createMessageService).mockRejectedValue(
      new Error('Failed to create message'),
    )

    await user.type(
      screen.getByPlaceholderText(translation.MessageInput.placeholder),
      faker.lorem.sentence(20),
    )
    await user.click(screen.getByText(translation.MessageInput.send))

    expect(
      await screen.findByText(translation.Home.messageCreationFailed),
    ).toBeDefined()
  })

  it('should show last messages', async () => {
    const serviceParams: GetMessagesServiceFilter = {
      limit: 10,
      order: {
        createdAt: 'desc',
      },
    }

    expect(getMessagesService).toHaveBeenCalledWith(serviceParams)
    for (const message of messages) {
      expect(await screen.findByText(message.text)).toBeDefined()
    }
  })
})
