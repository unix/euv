import App from './welcome'
import { Logger } from './log.service'
import { User } from './user.service'

export const binds = {
  app: App,
  logger: Logger,
  user: User,
}
