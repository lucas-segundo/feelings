import { faker } from '@faker-js/faker'

export const mockBetterAuthData = () => ({
  session: mockSession(),
  user: mockUser(),
})

const mockSession = () => ({
  id: faker.string.uuid(),
  token: faker.string.uuid(),
  expiresAt: faker.date.future(),
  userId: faker.string.uuid(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
})

const mockUser = () => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  emailVerified: true,
  image: faker.image.url(),
  createdAt: faker.date.past(),
  updatedAt: faker.date.recent(),
})
