import { CollectionFactory, ContainerFactory, ServiceTables } from '../interfaces'
import { ComponentOptions } from 'vue'
import Vue from 'vue'
import { metadata } from '../constants'
import { Mutation } from './mutation'
import { VueConstructor } from 'vue/types/vue'


export class Collection implements CollectionFactory {
  
  private _instance: any
  private _vueComponent: any
  private dependencies: string[] = []
  readonly componentOptions: ComponentOptions<Vue>
  
  get instance(): any {
    if (!this._instance) this.init()
    return this._instance
  }
  get vueComponent(): VueConstructor<Vue> {
    if (!this._instance) this.init()
    return this._vueComponent
  }
  get vueComponentOptions(): any {
    return this.componentOptions || {}
  }
  get bindingName(): string {
    return this.name
  }
  
  constructor(
    public factory: new (...args: any[]) => any,
    private name: string,
    private container: ContainerFactory,
  ) {
    this.componentOptions = Reflect.getMetadata(metadata.COMPONENT_IDENTIFY, factory)
    this.updateDependencies()
  }
  
  isInstantiated(): boolean {
    return !!this._instance
  }
  
  isComponent(): boolean {
    return !!this.componentOptions
  }
  
  private init(): void {
    if (!this.dependencies.length) return this.updateCollection()
    const instances: any[] = this.dependencies.map(dep => this.container.findOne(dep).instance)
    return this.updateCollection(instances)
  }
  
  private updateCollection(instances?: any[]): void {
    if (!this.isComponent()) {
      this._instance = new this.factory(instances)
      return
    }
    this._vueComponent = new Mutation(this, instances, this.container).toVueComponent()
    this._instance = class None {}
  }
  
  private updateDependencies(): void {
    const types: any[] = Reflect.getMetadata(metadata.HOST_PARAM_TYPES, this.factory) || []
    const nativeTables: ServiceTables = this.container.nativeTables()
    this.dependencies = Object.keys(nativeTables)
    .map(name => {
      const type: any = nativeTables[name]
      return types.find(t => t === type) ? name : null
    })
    .filter(r => r)
  }
  
}

