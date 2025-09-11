import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { it, describe, vi, beforeEach, expect } from 'vitest'
import { mockMessage } from '@/app/entities/Message/mock'
import HomeScreen from '.'
import { faker } from '@faker-js/faker'
import translation from '@/presentation/i18n/messages/en.json'
import { TestingProviders } from '@/presentation/utils/TestingProviders'
import { getMessages } from '@/presentation/func/server/getMessages'
import { mockSession } from '@/app/entities/Session/mock'
import { signOut } from '@/presentation/func/client/signOut'
import { useRouter } from 'next/navigation'
import { sendMessage } from '@/presentation/func/server/sendMessage'
import { GetMessagesPortParams } from '@/app/ports/GetMessages'
import { SentimentNotPositive } from '@/app/errors/SentimentNotPositive'
import { likeMessages } from '@/presentation/func/server/likeMessages'
import { getLatestMessagesForUser } from '@/presentation/func/server/getLatestMessagesForUser'
import { getLikes } from '@/presentation/func/server/getLikes'
import { mockLike } from '@/app/entities/Like/mock'
import { deleteLike } from '@/presentation/func/server/deleteLike'

vi.mock('@/presentation/func/server/sendMessage')
vi.mock('@/presentation/func/server/getMessages')
vi.mock('@/presentation/func/server/getLikes')
vi.mock('@/presentation/func/server/getLatestMessagesForUser')
vi.mock('@/presentation/func/server/likeMessages')
vi.mock('@/presentation/func/client/signOut')
vi.mock('@/presentation/func/server/deleteLike')

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

      vi.mocked(sendMessage).mockImplementation(async () => {
        await new Promise((resolve) => setTimeout(resolve, 10))
        return message
      })

      const text = faker.lorem.sentence(20)
      await user.type(messageInput, text)
      await user.click(screen.getByText(translation.MessageInput.send))

      expect(screen.getByTestId('loading-spinner')).toBeDefined()

      expect(sendMessage).toHaveBeenCalledWith({
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

      expect(sendMessage).not.toHaveBeenCalled()
    })

    it('should show error message if creation fails', async () => {
      vi.mocked(sendMessage).mockRejectedValue(
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

    it('should show error message if sentiment is not positive', async () => {
      vi.mocked(sendMessage).mockRejectedValue(new SentimentNotPositive())

      await user.type(
        screen.getByPlaceholderText(translation.MessageInput.placeholder),
        faker.lorem.sentence(20),
      )
      await user.click(screen.getByText(translation.MessageInput.send))

      expect(
        await screen.findByText(translation.MessageInput.sentimentNotPositive),
      ).toBeDefined()
    })
  })

  describe('LastMessages', () => {
    it('should show last messages with likes', async () => {
      vi.mocked(getMessages).mockResolvedValue(messages)

      const likes = [
        { ...mockLike(), messageID: messages[0].id },
        { ...mockLike(), messageID: messages[0].id },
      ]
      vi.mocked(getLikes).mockResolvedValue(likes)

      render(
        <TestingProviders>
          <HomeScreen session={null} />
        </TestingProviders>,
      )

      expect(screen.getByTestId('last-messages-loading')).toBeDefined()

      const serviceParams: GetMessagesPortParams = {
        limit: 10,
        order: {
          createdAt: 'desc',
        },
      }

      expect(getMessages).toHaveBeenCalledWith(serviceParams)

      const likesCounts = await screen.findAllByTestId('likes-count')

      expect(likesCounts[0]).toHaveTextContent('2')
      expect(likesCounts[1]).toHaveTextContent('0')
      expect(likesCounts[2]).toHaveTextContent('0')

      for (const message of messages) {
        expect(await screen.findByText(message.text)).toBeDefined()
      }

      expect(screen.queryByTestId('last-messages-loading')).toBeNull()
    })

    it('should show no messages if there are no messages', async () => {
      vi.mocked(getMessages).mockResolvedValue([])

      render(
        <TestingProviders>
          <HomeScreen session={null} />
        </TestingProviders>,
      )

      expect(await screen.findByText(translation.Home.noMessages)).toBeDefined()
      await waitFor(() => {
        expect(screen.queryByTestId('last-messages-loading')).toBeNull()
      })
    })

    it('should show messages for user', async () => {
      vi.mocked(getLatestMessagesForUser).mockResolvedValue(messages)

      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )

      expect(getLatestMessagesForUser).toHaveBeenCalledWith({
        userID: session.user.id,
        limit: 10,
        order: {
          createdAt: 'desc',
        },
      })

      for (const message of messages) {
        expect(await screen.findByText(message.text)).toBeDefined()
      }

      expect(screen.queryByTestId('last-messages-loading')).toBeNull()
    })

    it('should like a message', async () => {
      vi.mocked(getLatestMessagesForUser).mockResolvedValue(messages)
      vi.mocked(getLikes).mockResolvedValue([])

      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )

      const likeButtons = await screen.findAllByTestId('like-button')
      await user.click(likeButtons[0])

      expect(likeMessages).toHaveBeenCalledWith({
        messageID: messages[0].id,
        userID: session.user.id,
      })
    })

    it('should deslike a message', async () => {
      vi.mocked(getLatestMessagesForUser).mockResolvedValue(messages)
      vi.mocked(getLikes).mockResolvedValue([])

      render(
        <TestingProviders>
          <HomeScreen session={session} />
        </TestingProviders>,
      )

      const likeButtons = await screen.findAllByTestId('like-button')
      const likesCounts = await screen.findAllByTestId('likes-count')

      await user.click(likeButtons[0])
      expect(likesCounts[0]).toHaveTextContent('1')

      await user.click(likeButtons[0])
      expect(likesCounts[0]).toHaveTextContent('0')

      expect(deleteLike).toHaveBeenCalledWith({
        messageID: messages[0].id,
        userID: session.user.id,
      })
    })
  })

  describe('LoginModal', () => {
    beforeEach(() => {
      vi.mocked(getMessages).mockResolvedValue(messages)

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
      expect(sendMessage).not.toHaveBeenCalled()
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
      expect(signOut).toHaveBeenCalled()
      expect(useRouter().push).toHaveBeenCalledWith('/')
    })
  })
})
