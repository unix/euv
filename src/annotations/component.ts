import Vue, { ComponentOptions } from 'vue'
import { VueConstructor } from 'vue/types/vue'
import { metadata } from '../constants'

const componentFactory = (options?: ComponentOptions<Vue>) =>
(target: new (...args: any[]) => any): any => {
  
  const types: any[] = Reflect.getMetadata(metadata.DESIGN_PARAM_TYPES, target)
  
  Reflect.defineMetadata(metadata.HOST_PARAM_TYPES, types, target)
  
  Reflect.defineMetadata(metadata.COMPONENT_IDENTIFY, options || {}, target)
  
  return target
}

export const Component = (options?: ComponentOptions<Vue>): (c: new (...args: any[]) => any)
=> VueConstructor<Vue> => componentFactory(options)

