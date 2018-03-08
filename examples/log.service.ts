import { inject, injectable } from 'inversify'
import { User } from './user.service'

@injectable()
export class Logger {
  
  private messages: string[] = []
  
  static print(message: string): void {
    console.log(`log_service: ${message}\n`)
  }
  
  constructor(
    @inject('User') private user: User,
  ) {
  }
  
  append(message: string): void {
    this.messages.push(message)
  }
  
  debug(): void {
    console.log(123, this.user.k)
    this.messages.forEach(msg => Logger.print(msg))
  }
  
}


