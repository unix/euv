import { Component } from '../src/annotations/component'
import { Logger } from './services/log.service'

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
  }

  mounted(): void {
    console.log('inject logger:', this.logger)
    this.greet()
  }

  greet(): void {
  }

}
