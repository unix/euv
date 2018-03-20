import { metadata } from '../constants'

export const Injectable = (options?: any) => (target: any): any => {
  
  const types: any[] = Reflect.getMetadata(metadata.DESIGN_PARAM_TYPES, target)
  
  Reflect.defineMetadata(metadata.HOST_PARAM_TYPES, types, target)
  
  return target
}
