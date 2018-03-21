import Vue from 'vue'
import { VueConstructor } from 'vue/types/vue'

export type EuvComponentOptions = {
  template?: string,
  styleUrls?: string[],
  styles?: string[],
  components?: string[],
}

export type ServiceTables = {
  [key: string]: new (...args: any[]) => any,
}

export type ServicePool = {
  [key: string]: CollectionFactory,
}

export interface CollectionFactory {
  instance: any,
  vueComponent: VueConstructor<Vue>,
  vueComponentOptions: any,
  factory: new (...args: any[]) => any,
  isInstantiated: () => boolean,
  bindingName: string,
}

export interface ContainerFactory {
  findOne: (serviceName: string) => CollectionFactory,
  append: (name: string, serviceFactory: new (...args: any[]) => any) => void,
  has: (serviceName: string) => boolean,
  entries: () => Array<{ [key: string]: CollectionFactory }>,
  nativeTables: () => ServiceTables,
}

export type ModuleProviders = {
  [key: string]: new (...args: any[]) => any,
}

export type ModuleOptions = {
  providers?: ModuleProviders,
}

export type EuvModules = new () => void

declare global {
  interface Window {
    $Container?: any,
  }
}


