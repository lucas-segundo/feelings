import { Message } from '.'
import { faker } from '@faker-js/faker'

export const mockMessage = (): Message => ({
  id: faker.string.uuid(),
  text: faker.lorem.sentence(),
  userID: faker.string.uuid(),
  language: faker.helpers.arrayElement(['pt', 'en']),
  createdAt: faker.date.recent(),
})
