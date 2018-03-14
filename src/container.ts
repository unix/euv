import * as Interface from './interfaces'
import * as Logger from './utils/logger'
import * as Information from './constants/information'

export class Container {
  
  private instanceMap: Interface.InstanceMap
  private con: Interface.$Container = (<any>window).$Container
  
  constructor() {
  }
  
  bind(binds: Interface.Binds): void {
    this.init()
  }
  
  private init(): void {
    this.con = {
      instances: this.instanceMap,
      findInstance: this.findInstance,
      saveInstance: this.saveInstance,
    }
  }
  
  private findInstance(name: string): Interface.ServiceInstance {
    return this.instanceMap[name] || null
  }
  
  private saveInstance(funcs: Array<new () => any>): any[] {
    return funcs.map(func => {
      const name: string = func.name
      if (this.findInstance(name)) {
        return Logger.warning(Information.WARNING_CLASS_NAME_REPEAT, name)
      }
      this.instanceMap[name] = {
        name, copy: new func(),
        dependencies: 0,
      }
      return this.instanceMap[name].copy
    })
  }
  
}

