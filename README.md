## euv
IoC with Vue.

(construction-in-progress, welcome contribution)

### Guide
1. declare component and service in module

 ```typescript
 @Module({
   providers: {
     login: LoginComponent,
     hello: HelloComponent,
   },
 })
 export class AppModule {
 }
 ```

2. use vue with TypeScript:
```typescript
@Component({
  template: `
  <p> <login/> </p>
  `,
  components: ['login']
})
export class HelloComponent {
  mounted(): void {
    alert('hello')
  }
}

```

3. **dependence on abstraction** is better than dependence and entity:

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

4. add service dependency injection for Vue

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
