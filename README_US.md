## EUV
IoC with Vue, **dependence on abstraction** is better than dependence and entity.

most developers prefer this design pattern, unfortunately there are no such libs in the Vue community, EUV is one of my attempts,
i hope it can bring you a different experience.

(construction-in-progress, welcome contribution)

### Guide

- install

  `npm i --save euv`

- start vue

  ```typescript
  // in app.ts

  import 'reflect-metadata'
  import Vue from 'vue'
  import { Container } from 'euv'
  import { AppModule } from  './module'
  const container = new Container(AppModule)

  new Vue({
    el: '#app',
    render: h => h(container.VueHook('app')),
  })


  // in ./module.ts, collecting dependencies for container:
  import { WelcomeComponent } from './app.component'

  @Module({
    providers: {
      app: WelcomeComponent,
    },
  })
  export class AppModule {
  }

  ```

- use annotations and class style in Vue

  ```typescript
  @Component({
    template: `<p>{{ message }}</p>`
  })
  export class AppComponent {

    message: string = 'hi!'

  }
  ```

- inject style

  ```typescript
  @Component(...)
  export class HelloComponent {

    constructor(
      private apis: ApiService,
    ) {
    }
    mounted(): void {
      this.apis.requestBannerImages()
    }
  }
  ```

- simply build any services

  ```typescript
  @Injectable()
  export class LoggerService {
  }

  @Injectable()
  export class AuthService {

    constructor(
      private logger: LoggerService,
    ) {
    }
  }
  ```

- use inject token

  ```typescript
  // declare service
  @Injectable()
  export class LoggerService {}

  // declare module
  @Module({
    providers: { logger: LoggerService },
  })
  export class AppModule {
  }

  // 'Inject' annotation will inject Logger service with 'logger' sign.
  @Injectable()
  export class AuthService {

    constructor(
      @Inject('logger') private logger: any,
    ) {
    }
  }
```

- optional inject

  ```typescript
  @Injectable()
  export class AuthService {

    constructor(
      @Optional() @Inject('user') private user: any = { token: 0 },
    ) {
    }
  }
  ```

- Prop Casing

  ```typescript
  // declare once only. the type will be checked.
  // support default value.

  @Component({ ... })
  export class Demo {

    @Prop() username: string = 'witt'

  }
  ```


<br/>
<br/>
<br/>

### More

- [recommended tsconfig](https://github.com/DhyanaChina/euv/blob/master/examples/tsconfig.json)

- [example](https://github.com/DhyanaChina/euv/tree/master/examples)







