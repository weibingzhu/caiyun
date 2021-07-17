export default {
  main: [
    {path: 'source', name: ['来源'], expr: '=meta.source', optional: true},
    {path: 'date', name: ['交易日期'], type: 'd', format: 'YYYY-MM-DD'},
    {path: 'self.account', name: [/我方账号/]},
    {path: 'related.account', name: ['对方账号'], optional: true},
    {path: 'related.name', name: ['对方户名']},
    {path: 'debit', name: ['收入金额'], type: 'n'},
    {path: 'credit', name: ['支出金额'], type: 'n'},
    {path: 'balance', name: ['本次余额'], type: 'n', optional: true},
    {path: 'currency', name: ['币种'], expr: '人民币', optional: true},
    {path: 'trading.abstract', name: ['交易附言'], optional: true},
    {path: 'trading.remark', name: ['交易摘要'], optional: true}
  ]

}
