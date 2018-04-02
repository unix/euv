## EUV
基于 Vue 的控制反转 ——— **依赖于抽象** 优于依赖于实体.

很多开发者都知道这种设计模式，但在 Vue 社区里却不多见，甚至没有一个可以使用的库。本项目是使用 TypeScript 与控制反转的模式来编写 Vue 的尝试，
有关更多的设计细节和语法，欢迎 [讨论](https://github.com/DhyanaChina/euv/issues/new)。

[English doc](README_US.md)

### 起步

- 安装

  `npm i --save euv`

- 开始使用 euv

  ```typescript
  // 在 app.ts 文件中:

  import 'reflect-metadata'
  import Vue from 'vue'
  import { Container } from 'euv'
  import { AppModule } from  './module'
  const container = new Container(AppModule)

  new Vue({
    el: '#app',
    render: h => h(container.VueHook('app')),
  })


  // 在 ./module.ts 文件中收集容器的依赖:
  import { WelcomeComponent } from './app.component'

  @Module({
    providers: {
      app: WelcomeComponent,
    },
  })
  export class AppModule {
  }

  ```

- 使用注解与类的方式来编写 Vue

  ```typescript
  @Component({
    template: `<p>{{ message }}</p>`
  })
  export class AppComponent {

    message: string = 'hi!'

  }
  ```

- 注入一个服务

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

- 服务之间也可以互相注入

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

- 使用令牌注入

  ```typescript
  // 声明服务
  @Injectable()
  export class LoggerService {}

  // 声明模块
  @Module({
    providers: { logger: LoggerService },
  })
  export class AppModule {
  }

  // Inject 会通过 'logger' 标记自动帮你注入 Logger 服务
  @Injectable()
  export class AuthService {

    constructor(
      @Inject('logger') private logger: any,
    ) {
    }
  }
  ```

- 可选注入

  ```typescript
  // 当出现互相依赖或不确定是否能加载时，可以使用 Optional
  // 同时你可以为注入项提供默认值
  @Injectable()
    export class AuthService {

      constructor(
        @Optional() @Inject('user') private user: any = { token: 0 },
      ) {
      }
    }
  ```

<br/>
<br/>
<br/>

### 更多
  
- [推荐的 tsconfig 配置](https://github.com/DhyanaChina/euv/blob/master/examples/tsconfig.json) 
  
- [示例](https://github.com/DhyanaChina/euv/tree/master/examples)
  
  
 
   



