import { describe, expect, it, Mocked, vi } from 'vitest'
import { LikeMessageUseCase } from '.'
import { CreateLikePort } from '@/app/ports/CreateLike'
import { GetLikesPort } from '@/app/ports/GetLikes'
import { faker } from '@faker-js/faker'
import { mockLike } from '@/app/entities/Like/mock'
import { LikeAlreadyExists } from '@/app/errors/LikeAlreadyExists'

const getLikesPort: Mocked<GetLikesPort> = {
  get: vi.fn(),
}

const createLikePort: Mocked<CreateLikePort> = {
  create: vi.fn(),
}

describe('LikeMessageUseCase', () => {
  const likeMessageUseCase = new LikeMessageUseCase(
    getLikesPort,
    createLikePort,
  )
  const dto = {
    userID: faker.string.uuid(),
    messageID: faker.string.uuid(),
  }

  it('should like a message', async () => {
    getLikesPort.get.mockResolvedValue([])
    const createdLike = mockLike()
    createLikePort.create.mockResolvedValue(createdLike)

    const result = await likeMessageUseCase.execute(dto)

    expect(getLikesPort.get).toHaveBeenCalledWith({
      filter: {
        userID: {
          eq: dto.userID,
        },
        messageID: {
          eq: dto.messageID,
        },
      },
    })

    expect(result).toEqual(createdLike)
  })

  it('should not like a message if it already exists', async () => {
    getLikesPort.get.mockResolvedValue([mockLike()])

    const result = likeMessageUseCase.execute(dto)

    await expect(result).rejects.toThrow(LikeAlreadyExists)
  })
})
