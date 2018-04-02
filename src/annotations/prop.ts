import { metadata } from '../constants'
import { PropTagIdentifier } from '../interfaces'

export const Prop = () => (target: any, key: string, index?: number): void => {
  
  const prop: PropTagIdentifier = {
    name: key,
    type: Reflect.getMetadata(metadata.DESIGN_TYPE, target, key),
    value: target[key],
  }
  
  const props: PropTagIdentifier[] = Reflect.getMetadata(metadata.PROPS_IDENTIFIER, target) || []
  
  const next: PropTagIdentifier[] = props.concat(prop)
  
  Reflect.defineMetadata(metadata.PROPS_IDENTIFIER, next, target.constructor)
  
}
