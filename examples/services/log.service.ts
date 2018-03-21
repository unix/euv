import { User } from './user.service'
import { Injectable } from '../../src/index'

@Injectable()
export class Logger {
  
  private messages: string[] = []
  
  static print(message: string): void {
    console.log(`log_service: ${message}\n`)
  }
  
  constructor(
    private user: User,
  ) {
  }
  
  append(message: string): void {
    this.messages.push(message)
  }
  
  debug(): void {
    this.messages.forEach(msg => Logger.print(msg))
  }
  
}


