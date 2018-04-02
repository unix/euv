import { OptionalFactory, OptionalPool } from '../interfaces'


export class Optional implements OptionalFactory {
  
  private optionalPool: OptionalPool = {}
  
  create(name: string): void {
    this.optionalPool[name] = {
      value: null,
    }
  }
  
  patch(name: string, factory: new (...args: any[]) => any): void {
    this.optionalPool[name] = { value: factory }
  }
  
  link(name: string): any {
    return (this.optionalPool[name] || { value: null }).value
  }
  
  has(name: string): boolean {
    return !!this.optionalPool[name]
  }

}
