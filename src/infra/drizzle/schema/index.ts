import * as mainSchema from './main'
import * as authSchema from './auth'

export const schema = {
  ...mainSchema,
  ...authSchema,
}
