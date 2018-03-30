import 'reflect-metadata'
import { metadata } from '../constants'
import { EuvComponentOptions } from '../interfaces'


const componentFactory = (options?: EuvComponentOptions) => target => {
  
  const types: any[] = Reflect.getMetadata(metadata.DESIGN_PARAM_TYPES, target)
  
  Reflect.defineMetadata(metadata.HOST_PARAM_TYPES, types, target)
  
  Reflect.defineMetadata(metadata.COMPONENT_IDENTIFIER, options || {}, target)
  
  return target
}

export const Component = (options?: EuvComponentOptions) => componentFactory(options)

