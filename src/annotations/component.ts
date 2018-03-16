import Vue, { ComponentOptions } from 'vue'
import * as Interface from '../interfaces'
import { is, tools } from '../utils/index'
import { VueConstructor } from 'vue/types/vue'

const componentFactory = (options?: ComponentOptions<Vue>) =>
(component: new (...args: any[]) => any): VueConstructor<Vue> => {
  const container: Interface.$Container = tools.findContainer()
  const funcs: Array<new () => void> = tools.findConstructorParamTypes(component)
  const params: string[] = tools.findConstructorParams(component)
  const instances = container.saveInstance(funcs)
  const datas = params.reduce((data, next, index) => Object.assign({}, data, { [next]: instances[index] }), {})
  
  const prototype = component.prototype
  const extras: any = Object.getOwnPropertyNames(component.prototype)
    .reduce((tree, key) => {
      const val = prototype[key]
      const next = { [key]: val }
      if (is.constructor(key)) return tools.assignChild(tree, 'methods', { test: () => val })
      if (is.vueHook(key)) return Object.assign(tree, next)
      if (is.vueMethod(key)) return tools.assignChild(tree, 'methods', next)
      return tools.assignChild(tree, 'data', next)
    }, { methods: {}, data: {} })
  extras.data = Object.assign({}, extras.data, datas)
  
  const vueComponent = Object.assign({}, options, extras, {
    data: () => extras.data,
    template: '<p>123</p>',
  })
  const Extended: VueConstructor<Vue> = Vue.extend(vueComponent)
  return Extended
}

export const Component = (options?: ComponentOptions<Vue>): (c: new (...args: any[]) => any)
=> VueConstructor<Vue> => componentFactory(options)

