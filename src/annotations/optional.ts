import { metadata } from '../constants'

export const Optional = () => (target: any, key: string, index?: number): void => {
  
  const indexs: number[] = Reflect.getMetadata(metadata.OPTIONAL_IDENTIFIER, target) || []
  
  const next: number[] = [...new Set(indexs.concat(index))]
  
  Reflect.defineMetadata(metadata.OPTIONAL_IDENTIFIER, next, target, key)
  
}
