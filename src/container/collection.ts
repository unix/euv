import { CollectionFactory, ContainerFactory } from '../interfaces'
import { ComponentOptions } from 'vue'
import Vue from 'vue'
import { metadata } from '../constants'
import { Mutation } from './mutation'


export class Collection implements CollectionFactory {
  
  private _instance: any
  private _vueComponent: any
  private dependencies: string[] = []
  private componentOptions: ComponentOptions<Vue>
  get instance(): any {
    if (!this._instance) this.init()
    return this._instance
  }
  get vueComponent(): any {
    if (!this._instance) this.init()
    return this._vueComponent
  }
  
  constructor(
    public factory: new (...args: any[]) => any,
    private name: string,
    private container: ContainerFactory,
  ) {
    this.componentOptions = Reflect.getMetadata(metadata.COMPONENT_IDENTIFY, factory)
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
    this._instance = new this.factory(instances)
    if (this.isComponent()) {
      this._vueComponent = new Mutation(this).toVueComponent()
    }
  }
  
}

