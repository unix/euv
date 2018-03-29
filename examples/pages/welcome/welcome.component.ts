import { Component } from '../../../src/index'
import { Logger } from '../../services/log.service'
import { User } from '../../services/user.service'
declare const require: any

@Component({
  components: ['login' ],
  template: require('./welcome.component.html'),
})
export class WelcomeComponent {
  
  message: string = 'hello'
  
  constructor(
    private logger: Logger,
    private user: User,
  ) {
    this.message += '123'
  }
  
  get name(): any {
    return this.user.name
  }
  
}
