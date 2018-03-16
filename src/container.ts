import * as Interface from './interfaces'
import { logger } from './utils'
import { information } from './constants'

export class Container {
  
  private instanceMap: Interface.InstanceMap = {}
  // private con: Interface.$Container = (<any>window).$Container
  private set con(val: Interface.$Container) {
    window.$Container = val
  }
  
  private get con(): Interface.$Container {
    return window.$Container
  }
  
  constructor() {
  }
  
  bind(binds?: Interface.Binds): void {
  }
  
  init(): Interface.$Container {
    if (window.$Container) return window.$Container
    this.con = {
      instances: this.instanceMap,
      findInstance: this.findInstance.bind(this),
      saveInstance: this.saveInstance.bind(this),
    }
    return this.con
  }
  
  private findInstance(name: string): Interface.ServiceInstance {
    console.log(this.instanceMap[name])
    return this.instanceMap[name] || null
  }
  
  private saveInstance(funcs: Array<new () => any>): any[] {
    return funcs.map(func => {
      const name: string = func.name
      if (this.findInstance(name)) {
        return logger.warning(information.WARNING_CLASS_NAME_REPEAT, name)
      }
      this.instanceMap = Object.assign({}, this.instanceMap, {
        [name]: {
          name, copy: new func(),
          dependencies: 0,
        },
      })
      return this.instanceMap[name].copy
    })
  }
  
}

