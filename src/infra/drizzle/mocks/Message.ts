import { faker } from '@faker-js/faker'
import { messages } from '../schema/tables/messages'

export const mockDBMessage = (): typeof messages.$inferSelect => ({
  id: faker.number.int({ min: 1, max: 1000 }),
  text: faker.lorem.sentence(),
  userID: faker.number.int({ min: 1, max: 1000 }),
  createdAt: faker.date.recent(),
  language: faker.helpers.arrayElement(['pt', 'en']),
  updatedAt: faker.date.recent(),
  deletedAt: null,
})
