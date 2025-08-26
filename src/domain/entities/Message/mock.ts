import { Message } from '.'
import { faker } from '@faker-js/faker'

export const mockMessage = (): Message => ({
  id: faker.string.uuid(),
  text: faker.lorem.sentence(),
  createdAt: faker.date.recent(),
})
