import 'reflect-metadata'
import Vue from 'vue'
import { Container } from './../src/container'
// import { binds } from './binds'
new Container().init()

import { WelcomeComponent } from './welcome'

// mount
new Vue({
  el: '#app',
  render: h => h(WelcomeComponent, {
    props: { propMessage: 'World' },
  }),
})

