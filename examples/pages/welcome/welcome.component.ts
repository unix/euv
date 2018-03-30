import { Component } from '../../../src/index'
import { Logger } from '../../services/log.service'
import { User } from '../../services/user.service'
import { Inject } from '../../../src/annotations'
declare const require: any

@Component({
  components: ['login' ],
  template: require('./welcome.component.html'),
})
export class WelcomeComponent {
  
  message: string = 'hello'
  
  constructor(
    // private logger: Logger,
    private user: User,
    @Inject('logger') private logger: any,
  ) {
    this.message += '123'
    console.log(this.logger)
  }
  
  get name(): any {
    return this.user.name
  }
  
}
