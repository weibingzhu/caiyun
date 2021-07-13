export default {
  main: [
    {path: 'date', title: ['开票日期'], type: 'd', format: 'YYYY-MM-DD'},
    {path: 'deduction', title: ['用途']},
    {path: 'source', title: ['平台类型']},

    {path: 'buyer.taxId', title: ['买方税号']},

    {path: 'invoice.order', title: ['序号']},
    {path: 'invoice.code', title: ['发票代码']},
    {path: 'invoice.no', title: ['发票号码']},
    {path: 'invoice.type', title: ['发票类型']},
    {path: 'invoice.status', title: ['发票状态']},
    {path: 'invoice.currency', title: ['币种']},

    {path: 'provider.taxId', title: ['销方税号']},
    {path: 'provider.title', title: ['销方名称']},

    {path: 'total.amount', title: ['金额'], type: 'n'},
    {path: 'total.tax', title: ['有效税额', '税额'], type: 'n'},
    {path: 'total.rate', title: ['汇率'], type: 'n'},

    {path: 'other.check.date', title: ['确认/认证日期', '勾选日期', '认证日期'], type: 'd', format: 'YYYY-MM-DD'},
    {path: 'other.check.model', title: ['认证方式']},
    {path: 'other.checkCode', title: ['校验码']},
    {
      path: 'other.check.checkMonth',
      title: ['认证月份'],
      type: 'd',
      format: 'YYYY-MM-DD'
    }
  ]
}
