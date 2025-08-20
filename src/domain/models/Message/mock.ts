import { Message } from '.'
import { faker } from '@faker-js/faker'

export const mockMessage = (): Message => ({
  id: faker.string.uuid(),
  text: faker.lorem.sentence(),
  likes: faker.number.int({ min: 0, max: 100 }),
  createdAt: faker.date.recent(),
})
