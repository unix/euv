// import 'reflect-metadata'
import { Component } from '../src/annotations/component'
import { Logger } from './log.service'

@Component({
  props: {
    propMessage: String,
  },
  components: {},
})
export class WelcomeComponent {

  propMessage: string

  constructor(
    private logger: Logger,
  ) {
    console.log('inject logger:', this.logger)
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
