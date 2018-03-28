import { Component } from '../../../src/index'
import { Logger } from '../../services/log.service'
declare const require: any

@Component({
  components: [
    'login',
  ],
  template: require('./welcome.component.html'),
})
export class WelcomeComponent {
  
  propMessage: string
  
  constructor(
    private logger: Logger,
  ) {
  }
  
  mounted(): void {
    console.log('inject logger:', this.logger)
    this.greet()
  }
  
  greet(): void {
  }
  
}
