<template>
  <div class="chart-polar-stack"></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  methods: {
    render () {
      if (this.option) {
        let option = {
          ...this.option
        }
        this.$$chart.setOption(option)
      }
    }
  }
}
</script>

<style lang="scss">
</style>
