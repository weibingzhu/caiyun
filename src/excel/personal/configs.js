import models from './models'
import person from './person'

/**
 * condition: 比配对应的模型, 支持正则
 * header:    定义表格的头部位置
 * body:      对应的数据库模型
 * skip:      跳过
 * footer:    底部
 * parseFile: 解析模型的js文件
 */
export default [
  {
    conditions: [
      {address: 'A1', value: '种类'},
      {address: 'A2', value: '公司全名'},
      {address: 'A3', value: '区间'}
    ],
    header: ['姓名', '证件类型', '证件号码'],
    body: models.person,
    footer: [],
    skip: [],
    parseFile: person
  },
  {
    conditions: [
      {address: 'A2', value: '/b/'},
      {address: 'A5', value: '/a/'},
      {address: 'A8', value: '/a/'}
    ],
    parseFile: person,
    model: models.person
  }
]
