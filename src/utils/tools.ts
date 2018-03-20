import { ContainerFactory } from '../interfaces'

export const tools = {
  assignChild: <T>(source: T, child: string, val: object): T => {
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
  
  findContainer: (): ContainerFactory => {
    return window.$Container
  },
}


