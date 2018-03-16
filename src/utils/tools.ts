import { $Container } from '../interfaces'
import { Container } from '../container'

export const tools = {
  assignChild: (source: object, child: string, val: object): object => {
    return Object.assign({}, source, {
      [child]: Object.assign({}, source[child], val),
    })
  },
  
  findConstructorParamTypes: (func: any): Array<new () => void> => {
    return (<any>Reflect).getMetadata('design:paramtypes', func)
  },
  
  findConstructorParams: (func: any): string[] => {
    return /\(\s*([\s\S]*?)\s*\)/.exec(func)[1].split(/\s*,\s*/)
  },
  
  findContainer: (): $Container => {
    return !window.$Container ? new Container().init() : window.$Container
  },
}


