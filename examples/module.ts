import { WelcomeComponent } from './pages/welcome/welcome.component'
import { Logger } from './services/log.service'
import { User } from './services/user.service'
import { Module } from '../src/index'

@Module({
  providers: {
    app: WelcomeComponent,
    logger: Logger,
    user: User,
  },
})
export class AppModule {
}
