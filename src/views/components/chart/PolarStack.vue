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
          angleAxis: {
          },
          radiusAxis: {
            type: 'category',
            data: ['个税', '小规模增值税', '一般增值税', '其他'],
            z: 10
          },
          polar: {
          },
          series: [{
            type: 'bar',
            data: [1, 2, 30, 4],
            coordinateSystem: 'polar',
            name: '个税',
            stack: 'a'
          }, {
            type: 'bar',
            data: [2, 4, 6, 8],
            coordinateSystem: 'polar',
            name: '小规模增值税',
            stack: 'a'
          }, {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: '一般纳税人增值税',
            stack: 'a'
          }, {
            type: 'bar',
            data: [1, 2, 3, 4],
            coordinateSystem: 'polar',
            name: '其他',
            stack: 'a'
          }],
          legend: {
            show: true,
            data: ['个税', '小规模增值税', '一般纳税人增值税', '其他']
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
