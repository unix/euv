import { Injectable } from '../../src/index'
// import { Logger } from './log.service'
import { Optional } from '../../src/index'

// @Injectable()
export class User {
  
  k: string = '1'
  
  constructor(
    // @Optional() private logger: Logger,
  ) {
  }
  
  hi(): void {
    // console.log('logger:', this.logger)
  }
  
}


