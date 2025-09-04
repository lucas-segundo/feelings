import { faker } from '@faker-js/faker'
import { usersLikes } from '../schema/tables/usersLikes'

export const mockDBUserLike = (): typeof usersLikes.$inferSelect => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  userID: faker.number.int({ min: 1, max: 1000 }),
  messageID: faker.number.int({ min: 1, max: 1000 }),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  deletedAt: null,
})
