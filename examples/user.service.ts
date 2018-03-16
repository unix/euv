import { Injectable } from '../src/annotations/injectable'
import { Logger } from './log.service'

// @Injectable()
export class User {
  
  k: string = '1'
  
  constructor(
    private logger: Logger,
  ) {
  }
  
  hi(): void {
    // console.log('logger:', this.logger)
  }
  
}


