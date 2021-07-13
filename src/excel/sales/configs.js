import models from './models'
import Main from './Main'

export default [
  {
    conditions: [
      {address: 'A2', value: /发票数据/},
      {address: 'A4', value: /资料区间/},
      {address: 'A5', value: /发票类别/}
    ],
    header: ['发票代码', '发票号码'],
    bodyMap: models.main,
    footer: [/份数(.*)金额(.*)/],
    skip: ['小计'],
    parseFile: Main
  }
]
