import 'reflect-metadata'
import { Component } from '../src/component'
import { Logger } from './log.service'
import { User } from './user.service'

@Component({
  props: {
    propMessage: String,
  },
  components: {},
})
export default class WelcomeComponent {

  propMessage: string

  constructor(
    private logger: Logger,
  ) {
    console.log(123, this.logger)
  }

  mounted(): void {
    this.greet()
  }

  greet(): void {
    this.logger.append('haha')
    this.logger.debug()
    // console.log(this.propMessage)
  }

}
