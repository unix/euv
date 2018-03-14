import { $Container } from './interfaces'

export const assignChild = (source: object, child: string, val: object): object => {
  return Object.assign({}, source, {
    [child]: Object.assign({}, source[child], val),
  })
}

export const findConstructorParamTypes = (func: any): Array<new () => void> => {
  return (<any>Reflect).getMetadata('design:paramtypes', func)
}

export const findConstructorParams = (func: any): string[] => {
  return /\(\s*([\s\S]*?)\s*\)/.exec(func)[1].split(/\s*,\s*/)
}

export const findContainer = (): $Container => {
  return window.$Container
}


