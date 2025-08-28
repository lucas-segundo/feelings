import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, describe, vi, beforeEach, expect } from 'vitest'
import { mockMessage } from '@/app/entities/Message/mock'
import HomeScreen from '.'
import { faker } from '@faker-js/faker'
import translation from '@/presentation/i18n/messages/en.json'
import { createMessageService } from '@/data/services/CreateMessage'
import { TestingProviders } from '@/presentation/utils/TestingProviders'
import { getMessagesService } from '@/data/services/GetMessages'
import { GetMessagesServiceFilter } from '@/data/services/GetMessages/types'
import { mockSession } from '@/app/entities/Session/mock'
import { signOutService } from '@/data/services/SignOut'
import { useRouter } from 'next/navigation'

vi.mock('@/data/services/CreateMessage')
vi.mock('@/data/services/GetMessages')
vi.mock('@/data/services/SignOut')

vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    push: vi.fn(),
  }),
}))

describe('HomeScreen', () => {
  const user = userEvent.setup()
  const message = mockMessage()
  const messages = [mockMessage(), mockMessage(), mockMessage()]
  const session = mockSession()

  beforeEach(() => {
    vi.mocked(createMessageService).mockResolvedValue(message)
    vi.mocked(getMessagesService).mockResolvedValue(messages)
  })

  describe('MessageCreation', () => {
    beforeEach(() => {
      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )
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
        userID: session.user.id,
      })

      const successMessage = await screen.findByText(
        translation.MessageInput.messageSent,
      )
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
        await screen.findByText(translation.MessageInput.messageCreationFailed),
      ).toBeDefined()
    })
  })

  describe('LastMessages', () => {
    beforeEach(() => {
      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )
    })

    it('should show last messages', async () => {
      expect(screen.getByTestId('last-messages-loading')).toBeDefined()

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

      expect(screen.queryByTestId('last-messages-loading')).toBeNull()
    })

    it('should show no messages if there are no messages', async () => {
      vi.mocked(getMessagesService).mockResolvedValue([])

      expect(await screen.findByText(translation.Home.noMessages)).toBeDefined()
      expect(screen.queryByTestId('last-messages-loading')).toBeNull()
    })
  })

  describe('LoginModal', () => {
    beforeEach(() => {
      render(
        <TestingProviders>
          <HomeScreen session={null} />
        </TestingProviders>,
      )
    })

    it('should open it after clicking on sign in button', async () => {
      await user.click(screen.getByText(translation.Home.signIn))
      expect(await screen.findByTestId('login-modal')).toBeDefined()
    })

    it('should open it after submit on messageinput', async () => {
      const messageInput = screen.getByPlaceholderText(
        translation.MessageInput.placeholder,
      )
      const text = faker.lorem.sentence(20)
      await user.type(messageInput, text)
      await user.click(screen.getByText(translation.MessageInput.send))

      expect(await screen.findByTestId('login-modal')).toBeDefined()
      expect(createMessageService).not.toHaveBeenCalled()
    })

    it('should open it after click on like button', async () => {
      const likeButtons = await screen.findAllByTestId('like-button')
      await user.click(likeButtons[0])
      expect(await screen.findByTestId('login-modal')).toBeDefined()
    })
  })

  describe('Session', () => {
    it('should show user photo and logout button', () => {
      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )

      expect(screen.queryByText(translation.Home.signIn)).toBeNull()
      expect(screen.getByTestId('user-photo')).toBeDefined()
      expect(screen.getByTestId('logout-button')).toBeDefined()
    })

    it('should show placeholder photo if user has no photo', () => {
      const session = mockSession()
      session.user.photo = null
      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )

      expect(screen.getByTestId('user-photo')).toHaveAttribute(
        'src',
        '/_next/image?url=%2Fimages%2Fuser-placeholder.png&w=48&q=75',
      )
    })

    it('should logout user', async () => {
      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )

      await user.click(screen.getByTestId('logout-button'))
      expect(signOutService).toHaveBeenCalled()
      expect(useRouter().push).toHaveBeenCalledWith('/')
    })
  })
})
