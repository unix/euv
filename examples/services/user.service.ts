import { Injectable, Optional } from '../../src/index'
import { Logger } from './log.service'

@Injectable()
export class User {
  
  name: string = 'euv'
  
  constructor(
    // @Optional() private logger: Logger,
  ) {
  }
  
}


