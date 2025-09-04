import { faker } from '@faker-js/faker'
import { Like } from '.'

export const mockLike = (): Like => ({
  id: faker.string.uuid(),
  userID: faker.string.uuid(),
  messageID: faker.string.uuid(),
  createdAt: faker.date.recent(),
})
