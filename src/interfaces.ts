import { Vue, VueConstructor } from 'vue/types/vue'

export type Binds = {
  [key: string]: new (...args: any[]) => any,
}

export type ServiceInstance = {
  name: string,
  copy: any,
  dependencies: number,
}

export type InstanceMap = {
  [key: string]: ServiceInstance,
}

export type $Container = {
  instances: InstanceMap,
  findInstance: (name: string) => ServiceInstance,
  saveInstance: (instance: any) => void,
}


declare global {
  interface Window {
    $Container?: $Container,
  }
}


