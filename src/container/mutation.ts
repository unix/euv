import Vue from 'vue'
import { tools, is } from '../utils'
import { VueConstructor } from 'vue/types/vue'
import { CollectionFactory, ContainerFactory, EuvComponentOptions } from '../interfaces'

export type Extras = {
  methods: object,
  data: object,
  [key: string]: any,
}

export class Mutation {
  
  private _prototype: any

  constructor(
    private collection: CollectionFactory,
    private instances: any[],
    private container: ContainerFactory,
  ) {
    this._prototype = collection.factory.prototype
  }
  
  toVueComponent(): VueConstructor<Vue> {
    const extras: Extras = Object.getOwnPropertyNames(this._prototype)
    .reduce((tree, key) => {
      const val: any = this._prototype[key]
      const next: { [key: string]: any } = { [key]: val }
      if (is.constructor(key)) return tree
      if (is.vueHook(key)) return Object.assign(tree, next)
      if (is.vueMethod(val)) return tools.assignChild(tree, 'methods', next)
      return tools.assignChild(tree, 'data', next)
    }, { methods: {}, data: {} })
  
    extras.data = () => Object.assign({}, extras.data, this.makeVueDatas())
    
    return Vue.component(this.collection.bindingName, Object.assign({}, extras, this.makeVueExtra()))
  }
  
  private makeVueDatas(): any {
    const params: string[] = tools.findConstructorParams(this.collection.factory)
    if (!params || !params.length) return {}
    
    return params
    .reduce((data, next, index) => Object.assign({}, data, {
      [next]: this.instances[index],
    }), {})
  }
  
  private makeVueExtra(): any {
    const options: EuvComponentOptions = this.collection.vueComponentOptions || {}
    const components: object = (options.components || [])
    .reduce((coms, next) => {
      const com = this.container.findOne(next).vueComponent
      if (!com) return coms
      return Object.assign({}, coms, { [next]: com })
    }, {})
    return {
      template: options.template || '',
      name: this.collection.bindingName,
      components,
    }
  }
}
