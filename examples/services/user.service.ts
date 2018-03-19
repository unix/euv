import { Injectable } from '../src/annotations/injectable'
import { Logger } from './log.service'
import { Optional } from '../src/annotations/optional'

// @Injectable()
export class User {
  
  k: string = '1'
  
  constructor(
    @Optional() private logger: Logger,
  ) {
  }
  
  hi(): void {
    // console.log('logger:', this.logger)
  }
  
}


