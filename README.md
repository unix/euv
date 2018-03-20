## euv
IoC with Vue.

(construction-in-progress, welcome contribution)

### Guide
1. use vue with TypeScript:
```typescript
@Component({
  templateUrl: '',
  styleUrls: [''],
})
export class HelloComponent {
  mounted(): void {
    alert('hello')
  }
}

```

2. **dependence on abstraction** is better than dependence and entity:

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

3. add service dependency injection for Vue

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


