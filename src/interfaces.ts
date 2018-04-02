import Vue from 'vue'
import { VueConstructor } from 'vue/types/vue'

export type EuvComponentOptions = {
  template?: string,
  styles?: string[],
  components?: string[],
}

export type EuvInstance = new (...args: any[]) => any

export type ServiceTables = {
  [key: string]: new (...args: any[]) => any,
}

export type ServicePool = {
  [key: string]: CollectionFactory,
}

export type OptionalPool = {
  [key: string]: {
    value: new (...args: any[]) => any,
  },
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
  optionalPool: OptionalFactory,
  findOne: (serviceName: string) => CollectionFactory,
  append: (name: string, factory: new (...args: any[]) => any) => void,
  has: (serviceName: string) => boolean,
  entries: () => Array<{ [key: string]: CollectionFactory }>,
  nativeTables: () => ServiceTables,
}

export interface OptionalFactory {
  has: (name: string) => boolean,
  create: (name: string) => void,
  patch: (name: string, factory: new (...args: any[]) => any) => void,
  link: (name: string) => any,
}

export type ModuleProviders = {
  [key: string]: new (...args: any[]) => any,
}

export type ModuleOptions = {
  providers?: ModuleProviders,
}

export type EuvModules = new () => void

export type InjectTagIdentifier = {
  name: string,
  index: number,
}

export type PropTagIdentifier = {
  name: string,
  type: any,
  value?: any,
}

declare global {
  interface Window {
    $Container?: any,
  }
}


