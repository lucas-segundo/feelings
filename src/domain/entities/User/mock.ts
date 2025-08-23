import { faker } from '@faker-js/faker'
import { User } from '.'

export const mockUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
})
