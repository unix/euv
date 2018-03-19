import 'reflect-metadata'
import Vue from 'vue'
import { Container } from './../src/container'
import { binds } from  './binds'
const tables = new Container(binds).tables()

// mount
new Vue({
  el: '#app',
  render: h => h(tables.app, {
    props: { propMessage: 'World' },
  }),
})

