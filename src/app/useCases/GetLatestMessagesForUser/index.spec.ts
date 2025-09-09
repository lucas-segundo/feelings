import { describe, expect, it, Mocked, vi } from 'vitest'
import { GetMessagesPort } from '@/app/ports/GetMessages'
import { GetLikesPort } from '@/app/ports/GetLikes'
import { GetLatestMessagesForUserUseCase } from '.'
import { mockMessage } from '@/app/entities/Message/mock'
import { faker } from '@faker-js/faker'
import { Like } from '@/app/entities/Like'
import { mockLike } from '@/app/entities/Like/mock'

const getMessagesPort: Mocked<GetMessagesPort> = {
  get: vi.fn(),
}

const getLikesPort: Mocked<GetLikesPort> = {
  get: vi.fn(),
}

describe('GetLatestMessagesForUserUseCase', () => {
  const getLatestMessagesForUserUseCase = new GetLatestMessagesForUserUseCase(
    getMessagesPort,
    getLikesPort,
  )

  it('should get latest messages without user likes', async () => {
    const messages = [mockMessage(), mockMessage()]
    const likedMessage: Like = {
      ...mockLike(),
      messageID: messages[1].id,
    }
    const likes = [likedMessage]

    getMessagesPort.get.mockResolvedValue(messages)
    getLikesPort.get.mockResolvedValue(likes)

    const userID = faker.string.uuid()
    const result = await getLatestMessagesForUserUseCase.execute({
      userID,
    })

    messages.pop()
    expect(result).toEqual(messages)
    expect(getMessagesPort.get).toHaveBeenCalledWith({
      filter: {
        userID: {
          eq: userID,
        },
      },
    })

    expect(getLikesPort.get).toHaveBeenCalledWith({
      filter: {
        userID: {
          eq: userID,
        },
      },
    })
  })

  it('should not get likes if it has no messages', async () => {
    getMessagesPort.get.mockResolvedValue([])

    const userID = faker.string.uuid()
    const result = await getLatestMessagesForUserUseCase.execute({
      userID,
    })

    expect(result).toEqual([])
    expect(getLikesPort.get).not.toHaveBeenCalled()
  })
})
