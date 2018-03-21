import { WelcomeComponent } from './pages/welcome/welcome.component'
import { Logger } from './services/log.service'
import { User } from './services/user.service'
import { LoginComponent } from './pages/login/login.component'
import { Module } from '../src/index'

@Module({
  providers: {
    app: WelcomeComponent,
    logger: Logger,
    user: User,
    login: LoginComponent,
  },
})
export class AppModule {
}
