import { metadata } from '../constants'
import { ModuleOptions } from '../interfaces'

export const Module = (options: ModuleOptions = {}) => target => {
  
  Reflect.defineMetadata(metadata.MODULE_PROVIDERS_IDENTIFY, options.providers, target)
  
  return target
}
