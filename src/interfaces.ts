
export type ServiceTables = {
  [key: string]: new (...args: any[]) => any,
}


export type ServicePool = {
  [key: string]: CollectionFactory,
}

export interface CollectionFactory {
  instance: any,
  vueComponent: any,
  vueComponentOptions: any,
  factory: new (...args: any[]) => any,
  isInstantiated: () => boolean,
}

export interface ContainerFactory {
  findOne: (serviceName: string) => CollectionFactory,
  append: (name: string, serviceFactory: new (...args: any[]) => any) => void,
  has: (serviceName: string) => boolean,
  entries: () => Array<{ [key: string]: CollectionFactory }>,
  nativeTables: () => ServiceTables,
}


declare global {
  interface Window {
    $Container?: any,
  }
}


