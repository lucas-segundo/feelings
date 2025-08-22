import { faker } from '@faker-js/faker'
import { messages } from '../schema'

export const mockDBMessage = (): typeof messages.$inferSelect => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  text: faker.lorem.sentence(),
  likes: faker.number.int({ min: 0, max: 100 }),
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  deletedAt: null,
})
