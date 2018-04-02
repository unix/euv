import { Component } from '../../../src/index'
import { Prop } from '../../../src/annotations'

@Component({
  template: `
  <p>login {{ show }}</p>
  `,
})
export class LoginComponent {
  
  @Prop() show: string = 'haha'
  
  constructor() {
  }
  
}
