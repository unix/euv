import { logger } from '../utils/index'
import { information } from '../constants/index'
import { Collection } from './collection'
import { CollectionFactory, ContainerFactory, ServicePool, ServiceTables } from '../interfaces'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/vue'

export class Container implements ContainerFactory {
  
  private instancePool: ServicePool = {}
  
  constructor(
    private serviceTables: ServiceTables,
  ) {
    if (!window.$Container) window.$Container = this
    this.init(serviceTables)
  }
  
  private init(serviceTables: ServiceTables): void {
    Object.keys(serviceTables).forEach(name => this.append(name, serviceTables[name]))
  }
  
  
  findOne(name: string): CollectionFactory {
    if (!this.has(name)) {
      logger.warning(information.ERROR_NOT_FOUND_DEPENDENCY, name)
      return null
    }
    return this.instancePool[name]
  }
  
  append(name: string, factory: new (...args: any[]) => any): void {
    if (this.has(name)) return logger.warning(information.WARNING_CLASS_NAME_REPEAT, name)
    this.instancePool[name] = new Collection(factory, name, this)
  }
  
  has(name: string): boolean {
    return !!this.instancePool[name]
  }
  
  entries(): Array<{ [key: string]: CollectionFactory }> {
    return Object.keys(this.instancePool).map(name => ({ [name]: this.instancePool[name] }))
  }
  
  nativeTables(): ServiceTables {
    return this.serviceTables
  }
  
  VueHook(componentName: string): VueConstructor<Vue> {
    return this.findOne(componentName).vueComponent
  }
  
}

