import { WelcomeComponent } from './pages/welcome/welcome.component'
import { Logger } from './services/log.service'
import { User } from './services/user.service'

export const binds = {
  app: WelcomeComponent,
  logger: Logger,
  user: User,
}

export class Module {

}
