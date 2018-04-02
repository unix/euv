import { Component } from '../../../src/index'
import { Logger } from '../../services/log.service'
import { User } from '../../services/user.service'
import { Inject, Prop } from '../../../src/annotations'
import { Optional } from '../../../src'
declare const require: any

@Component({
  components: ['login' ],
  template: require('./welcome.component.html'),
})
export class WelcomeComponent {
  
  message: string = 'hello'
  computed: any = {
    name: function(): number {
      return 123
    },
  }
  
  constructor(
    // private logger: Logger,
    @Optional() @Inject('user') private user: any = {},
    @Inject('logger') private logger: any,
  ) {
    this.message += '123'
  }
  
  created(): void {
  }
  
  
  
  // get myname(): any {
  //   // console.log(this)
  //   console.log((<any>this))
  //   console.log((<any>this).userw)
  //   setTimeout(() => {
  //     // console.log(this.userr)
  //   }, 1000)
  //   return this.user ? this.user.name : ''
  // }
  
}
