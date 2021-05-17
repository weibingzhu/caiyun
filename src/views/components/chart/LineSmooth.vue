<template>
  <div class="chart-line-smooth"></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  methods: {
    render () {
      if (this.option) {
        let option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
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
