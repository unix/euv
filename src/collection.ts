import { Container } from './container'
import { CollectionFactory, ContainerFactory } from './interfaces'


export class Collection implements CollectionFactory {
  
  private _instance: any
  private dependencies: string[] = []
  get instance(): any {
    if (!this._instance) this.init()
    return this._instance
  }
  
  constructor(
    private name: string,
    private factory: new (...args: any[]) => any,
    private container: ContainerFactory,
  ) {
  }
  
  isInstantiated(): boolean {
    return !!this._instance
  }
  
  private init(): void {
    if (!this.dependencies.length) return new this.factory()
    const instances: any[] = this.dependencies.map(dep => this.container.findOne(dep).instance)
    return new this.factory(instances)
  }
  
}

