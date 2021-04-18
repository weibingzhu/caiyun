<template>
  <div class="invoice-statistics-components">
    <span>统计</span>:
    一共<em>{{count}}</em>张,
    &nbsp;总金额:<em>{{amount | formatMoney}}</em>,
    &nbsp;总税额:<em>{{tax | formatMoney}}</em>
  </div>
</template>

<script>
export default {
  componentName: 'InvoiceStatistics',
  props: {
    count: {
      type: Number,
      default: 0
    },
    amount: {
      type: Number,
      default: 0
    },
    tax: {
      type: Number,
      default: 0
    }
  }
}
</script>
<style lang="scss" >
.invoice-statistics-components {
  font-weight: bold;
  em {
    font-size: 1.2rem;
    color: red;
  }
}
</style>
