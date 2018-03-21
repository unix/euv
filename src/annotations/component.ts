import 'reflect-metadata'
import { metadata } from '../constants'
import { EuvComponentOptions } from '../interfaces'

export type ComponentTarget = new (...args: any[]) => any

const componentFactory = (options?: EuvComponentOptions) =>
(target: ComponentTarget): ComponentTarget => {
  
  const types: any[] = Reflect.getMetadata(metadata.DESIGN_PARAM_TYPES, target)
  
  Reflect.defineMetadata(metadata.HOST_PARAM_TYPES, types, target)
  
  Reflect.defineMetadata(metadata.COMPONENT_IDENTIFY, options || {}, target)
  
  return target
}

export const Component = (options?: EuvComponentOptions) => componentFactory(options)

