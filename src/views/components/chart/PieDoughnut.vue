<template>
  <div class="chart-pie"></div>
</template>

<script>
import mixin from './mixin'
export default {
  mixins: [mixin],
  methods: {
    render () {
      if (this.option) {
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 5,
            data: ['剩余', '已报', '已扣']
          },
          series: [
            {
              name: '个税',
              type: 'pie',
              radius: ['65%', '80%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '剩余' },
                { value: 35, name: '已报' },
                { value: 310, name: '已扣' }
              ]
            },
            {
              name: '小规模',
              type: 'pie',
              radius: ['40%', '55%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 35, name: '剩余' },
                { value: 310, name: '已报' },
                { value: 234, name: '已扣' }
              ]
            },
            {
              name: '一般纳税人',
              type: 'pie',
              radius: ['15%', '30%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '15',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: 335, name: '剩余' },
                { value: 310, name: '已报' },
                { value: 23, name: '已扣' }
              ]
            }
          ],
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
