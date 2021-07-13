import models from './models'
import Main from './Main'

export default [
  {
    conditions: [
      {address: 'A1', value: '发票清单'},
      {address: 'A2', value: /纳税人识别号/},
      {address: 'G2', value: /所属月份/}
    ],
    header: ['发票代码', '发票号码'],
    bodyMap: models.main,
    footer: [],
    skip: [],
    parseFile: Main
  }
]
