
export type ServiceTables = {
  [key: string]: new (...args: any[]) => any,
}


export type ServicePool = {
  [key: string]: CollectionFactory,
}

export interface CollectionFactory {
  instance: any,
  isInstantiated: () => boolean,
}

export interface ContainerFactory {
  findOne: (serviceName: string) => CollectionFactory,
  append: (name: string, serviceFactory: new (...args: any[]) => any) => void,
  has: (serviceName: string) => boolean,
}


declare global {
  interface Window {
    $Container?: any,
  }
}


