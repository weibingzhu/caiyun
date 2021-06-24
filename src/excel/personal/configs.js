import models from './models'
import person from './person'
/**
 * condition: 比配对应的模型
 * main: 解析模型的js文件
 */
export default [
  {
    conditions: [
      {address: 'B1', value: /电话/},
      {address: 'A1', value: /姓名/}
    ],
    parseFile: person,
    model: models.person
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
