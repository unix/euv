import * as Interface from '../interfaces'
import { tools } from '../utils'

export const Injectable = (options?: any) => (component: any) => {
  const container: Interface.$Container = tools.findContainer()
  const funcs: Array<new () => void> = tools.findConstructorParamTypes(component)
  const instanceParams: string[] = tools.findConstructorParams(component)
  const instances = container.saveInstance(funcs)
  
  instanceParams.forEach((key, index) => {
    Object.defineProperty(component.prototype, key, {
      get: () => instances[index],
      set: () => {},
    })
  })
  return component
}
