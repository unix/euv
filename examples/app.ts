import Vue from 'vue'
import App from './welcome.vue'
import 'reflect-metadata'
import { Logger } from './log.service'
import { User } from './user.service'
import { Container } from 'inversify'

const container = new Container()
container.bind<Logger>('Logger').to(Logger)
container.bind<User>('User').to(User)
container.bind<App>('App').to(App)
console.log(container.get<Logger>('Logger').debug())

// mount
new Vue({
  el: '#app',
  render: h => h(App, {
    props: { propMessage: 'World' },
  }),
})

