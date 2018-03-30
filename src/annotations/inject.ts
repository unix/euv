import { metadata } from '../constants'
import { InjectTagIdentifier } from '../interfaces'

export const Inject = (token: string) => (target: any, key: string, index?: number): void => {
  
  const tokens: InjectTagIdentifier[] = Reflect.getMetadata(metadata.INJECT_TOKEN_IDENTIFIER, target) || []
  
  const next: InjectTagIdentifier[] = tokens.concat({ name: token, index })
  
  Reflect.defineMetadata(metadata.INJECT_TOKEN_IDENTIFIER, next, target, key)
  
}
