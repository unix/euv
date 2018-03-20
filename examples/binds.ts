import { WelcomeComponent } from './welcome'
import { Logger } from './services/log.service'
import { User } from './services/user.service'

export const binds = {
  app: WelcomeComponent,
  logger: Logger,
  user: User,
}
