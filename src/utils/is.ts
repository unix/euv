import { hooks } from '../constants'

export const is = {
  constructor: (name: string): boolean => name === 'constructor',
  
  vueHook: (name: string): boolean => !!hooks.VUE_HOOKS[name],
  
  vueMethod:  (name: string): boolean => typeof name === 'function',
}
