import Vue from 'vue'
import { tools, is } from '../utils'
import { VueConstructor } from 'vue/types/vue'
import { CollectionFactory, ContainerFactory, EuvComponentOptions, EuvInstance, PropTagIdentifier } from '../interfaces'
import { metadata } from '../constants'

export type Extras = {
  methods: object,
  data: object,
  computed: object,
  [key: string]: any,
}

export const DEFAULT_EXTRAS: Extras = {
  methods: {}, data: {}, computed: {},
}

export class Mutation {
  
  private _prototype: any
  private _depDatas: { [key: string]: any } = {}

  constructor(
    private collection: CollectionFactory,
    private instances: EuvInstance[] = [],
    private container: ContainerFactory,
  ) {
    this._prototype = collection.factory.prototype
    this.updateDependencies()
  }
  
  toVueComponent(): VueConstructor<Vue> {
    const extras: Extras = Object.getOwnPropertyNames(this._prototype)
    .reduce((tree, key) => {
      const descriptor: PropertyDescriptor = Reflect.getOwnPropertyDescriptor(this._prototype, key)
      const val: any = this._prototype[key]
      const next: { [key: string]: any } = { [key]: val }
  
      if (is.constructor(key)) return tree
      if (is.vueHook(key)) return Object.assign(tree, next)
      if (is.vueMethod(descriptor)) return tools.assignChild(tree, 'methods', next)
      return tools.assignChild(tree, 'data', next)
    }, DEFAULT_EXTRAS)
    const vueDatas = Object.assign({}, extras.data, this._depDatas)
    
    const tags: PropTagIdentifier[] = Reflect.getMetadata(metadata.PROPS_IDENTIFIER, this.collection.factory) || []
    const props: object = tags.reduce((tree: object, next: PropTagIdentifier) => {
      
      if (vueDatas[next.name] !== undefined) {
        next.value = vueDatas[next.name]
        delete vueDatas[next.name]
      }
      return Object.assign(tree, {
        [next.name]: { type: next.type, default: next.value },
      })
    }, {})
    
    extras.data = () => vueDatas
    extras.props = props
  
    return Vue.component(this.collection.bindingName, Object.assign({}, extras, this.makeVueExtra()))
  }
  
  private makeVueExtra(): any {
    const options: EuvComponentOptions = this.collection.vueComponentOptions || {}
    const components: object = (options.components || [])
    .reduce((coms, next) => {
      const component: VueConstructor<Vue> = this.container.findOne(next).vueComponent
      if (!component) return coms
      return Object.assign({}, coms, { [next]: component })
    }, {})
  
    return {
      template: options.template || '',
      name: this.collection.bindingName,
      components,
    }
  }
  
  private updateDependencies(): void {
    const shamFactory = new this.collection.factory(...this.instances)
  
    this._depDatas = Object.keys(shamFactory)
    .reduce((pre, key) => Object.assign(pre, key && shamFactory[key] ? { [key]: shamFactory[key] } : {}), {})
    
    this._prototype = Object.assign(this._prototype, this._depDatas)
  }
}
