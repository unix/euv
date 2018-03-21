import 'reflect-metadata'
import Vue from 'vue'
import { Container } from '../src/container/container'
import { binds } from  './binds'
const container = new Container(binds)

// mount
new Vue({
  el: '#app',
  render: h => h(container.VueHook('app'), {
    props: { propMessage: 'World' },
  }),
})

