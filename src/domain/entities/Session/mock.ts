import { faker } from '@faker-js/faker'
import { Session } from '.'

export const mockSession: Session = {
  id: faker.string.uuid(),
  expiresAt: faker.date.future(),
  token: faker.string.uuid(),
}
