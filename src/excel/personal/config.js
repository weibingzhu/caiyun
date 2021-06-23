/**
 * condition: 比配对应的模型
 * main: 解析模型的js文件
 */
module.exports = [
  {
    condition: [
      {address: 'A2', value: '=/查询*号*'},
      {address: 'A5', value: '=/借方发生总额*'},
      {address: 'A8', value: '=/查询时间范围*'}
    ],
    main: require('./person')
  }
]
