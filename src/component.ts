import Vue, { ComponentOptions } from 'vue'
import * as Interface from './interfaces'
import { assignChild, findConstructorParams, findConstructorParamTypes, findContainer } from './utils'
import { VueConstructor } from 'vue/types/vue'

enum VUE_HOOKS {
  data = 'data',
  beforeCreate = 'beforeCreate',
  created = 'created',
  beforeMount = 'beforeMount',
  mounted = 'mounted',
  beforeDestroy = 'beforeDestroy',
  destroyed = 'destroyed',
  beforeUpdate = 'beforeUpdate',
  updated = 'updated',
  activated = 'activated',
  deactivated = 'deactivated',
  render = 'render',
  errorCaptured = 'errorCaptured',
}

const isConstructor = (name: string): boolean => name === 'constructor'
const isVueHook = (name: string): boolean => !!VUE_HOOKS[name]
const isVueMethod =  (name: string): boolean => typeof name === 'function'

export const Component = (options: ComponentOptions<Vue>): (c: any) => VueConstructor<Vue> => {
  const container: Interface.$Container = findContainer()
  
  return (Component: any): VueConstructor<Vue> => {
    const funcs: Array<new () => void> = findConstructorParamTypes(Component)
    const params: string[] = findConstructorParams(Component)
    const instances = container.saveInstance(funcs)
    const datas = params.reduce((data, next, index) => Object.assign({}, data, { [next]: instances[index] }), {})
    
    const prototype = Component.prototype
    const extras: any = Object.getOwnPropertyNames(Component.prototype)
      .reduce((tree, key) => {
        const val = prototype[key]
        const next = { [key]: val }
        if (isConstructor(key)) return assignChild(tree, 'methods', { test: () => val })
        if (isVueHook(key)) return Object.assign(tree, next)
        if (isVueMethod(key)) return assignChild(tree, 'methods', next)
        return assignChild(tree, 'data', next)
      }, { methods: {}, data: {} })
    extras.data = Object.assign({}, extras.data, datas)
    
    const vueComponent = Object.assign({}, options, extras, {
      data: () => extras.data,
      template: '<p>123</p>',
    })
    const Extended: VueConstructor<Vue> = Vue.extend(vueComponent)
    return Extended
  }
}

