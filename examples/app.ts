import 'reflect-metadata'
import Vue from 'vue'
import { Container } from '../src/index'
import { AppModule } from  './module'
const container = new Container(AppModule)

// mount
new Vue({
  el: '#app',
  render: h => h(container.VueHook('app'), {
    props: { propMessage: 'World' },
  }),
})

