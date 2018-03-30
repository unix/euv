import { logger } from '../utils/index'
import { information } from '../constants/index'
import { Collection } from './collection'
import {
  CollectionFactory, ContainerFactory, EuvModules, ModuleProviders, OptionalFactory, ServicePool,
  ServiceTables,
} from '../interfaces'
import Vue from 'vue'
import { VueConstructor } from 'vue/types/vue'
import { metadata } from '../constants'
import { Optional } from './optional'

export class Container implements ContainerFactory {
  
  optionalPool: OptionalFactory = new Optional()
  private instancePool: ServicePool = {}
  private providers: ModuleProviders
  
  constructor(
    private modules: EuvModules,
  ) {
    if (!window.$Container) window.$Container = this
    this.init(modules)
  }
  
  private init(modules: EuvModules): void {
    this.providers = Reflect.getMetadata(metadata.MODULE_PROVIDERS_IDENTIFIER, modules)
    const keys: string[] = Object.keys(this.providers)
    if (!keys || !keys.length) return logger.warning(information.WARNING_NOT_FOUND_PROVIDERS)
  
    keys.forEach(key => this.append(key, this.providers[key]))
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
    return this.providers
  }
  
  VueHook(componentName: string): VueConstructor<Vue> {
    return this.findOne(componentName).vueComponent
  }
  
}

