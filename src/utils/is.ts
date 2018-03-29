import { hooks } from '../constants'

export const is = {
  constructor: (name: string): boolean => name === 'constructor',
  
  vueHook: (name: string): boolean => !!hooks.VUE_HOOKS[name],
  
  vueMethod: (descriptor: PropertyDescriptor): boolean => typeof descriptor.value === 'function',
  
  vueComputed: (descriptor: PropertyDescriptor): boolean => !!(descriptor.get || descriptor.set),
}

