<template>
  <p>hello</p>
</template>
<script lang="ts">
import 'reflect-metadata'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Logger } from './log.service'
import { Container, inject, injectable, optional } from 'inversify'

@injectable()
@Component({
  props: {
    propMessage: String,
  },
  components: {},
})
export default class App extends Vue {

  propMessage: string

  constructor(
    @inject('Logger') private logger: any,
  ) {
    super()
    console.log(this.logger)
  }

  mounted(): void {
    this.greet()
  }

  greet(): void {
    // console.log(this.propMessage)
  }

}

</script>
