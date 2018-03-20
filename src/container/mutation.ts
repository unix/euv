import { CollectionFactory } from '../interfaces'
import { tools, is } from '../utils'
import Vue from 'vue'

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
  ) {
    this._prototype = collection.factory.prototype
  }
  
  toVueComponent(): any {
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
  
    return Vue.extend(Object.assign({}, extras, {
      template: '<p>123</p>',
    }))
  }
  
  private makeVueDatas(): any {
    const params: string[] = tools.findConstructorParams(this.collection.factory)
    if (!params || !params.length) return {}
    
    return params
    .reduce((data, next, index) => Object.assign({}, data, {
      [next]: this.instances[index],
    }), {})
  }
}
