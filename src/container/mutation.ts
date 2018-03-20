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
  ) {
    this._prototype = collection.factory.prototype
  }
  
  toVueComponent(): any {
  
    const extras: Extras = Object.getOwnPropertyNames(this._prototype)
      .reduce((tree, key) => {
        const val: any = this._prototype[key]
        const next: { [key: string]: any } = { [key]: val }
        if (is.constructor(key)) return tools.assignChild(tree, 'methods', { test: () => val })
        if (is.vueHook(key)) return Object.assign(tree, next)
        if (is.vueMethod(key)) return tools.assignChild(tree, 'methods', next)
        return tools.assignChild(tree, 'data', next)
      }, { methods: {}, data: {} })
    extras.data = Object.assign({}, extras.data)
    
    return Vue.extend({
      template: '<p>123</p>',
      data: () => extras.data,
    })
  }
}
