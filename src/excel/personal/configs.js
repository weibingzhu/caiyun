import models from './models'
import EnumType from '../EnumType'

import person from './Person'
import Payroll from './Payroll'
import foreigners from './Foreigners'
import yearAwards from './YearAwards'
import TaxSystem from './TaxSystem'
import TaxCustom from './TaxCustom'

/**
 * condition: 比配对应的模型, 支持正则
 * header:    定义表格的头部位置
 * type:      对应的模型
 * bodyMap:   对应的数据库模型
 * skip:      跳过
 * footer:    底部
 * parseFile: 解析模型的js文件
 */
export default [
  {
    conditions: [
      {address: 'B1', value: '人员信息'},
      {address: 'A2', value: /公司全称/},
      {address: 'A3', value: '区间'}
    ],
    type: EnumType.person,
    header: ['姓名', '证件类型', '证件号码'],
    bodyMap: models.person,
    footer: [],
    skip: [],
    parseFile: person
  },
  {
    conditions: [
      {address: 'B1', value: '薪金收入'},
      {address: 'A2', value: '公司全称'},
      {address: 'A3', value: '区间'}
    ],
    type: EnumType.payroll,
    header: ['姓名', '*证件号码', '*本期收入'],
    bodyMap: models.payroll,
    footer: [],
    skip: [],
    parseFile: Payroll
  },
  {
    conditions: [
      {address: 'B1', value: '外籍人员信息'},
      {address: 'A2', value: '公司全称'},
      {address: 'A3', value: '区间'}
    ],
    type: EnumType.foreigners,
    header: ['姓名', '*证件号码', '*本期收入'],
    bodyMap: models.foreigners,
    footer: [],
    skip: [],
    parseFile: foreigners
  },
  {
    conditions: [
      {address: 'B1', value: '一次性年终奖'},
      {address: 'A2', value: '公司全称'},
      {address: 'A3', value: '区间'}
    ],
    type: EnumType.yearAwards,
    header: ['姓名', '*证件号码', '*全年一次性奖金额'],
    bodyMap: models.yearAwards,
    footer: [],
    skip: [],
    parseFile: yearAwards
  }
  // {
  //   conditions: [
  //     {address: 'B1', value: '一次性年终奖'},
  //     {address: 'A2', value: '公司全称'},
  //     {address: 'A3', value: '区间'}
  //   ],
  //   type: EnumType.yearAwards,
  //   header: ['姓名', '*证件号码', '*全年一次性奖金额'],
  //   bodyMap: models.yearAwards,
  //   footer: [],
  //   skip: [],
  //   parseFile: TaxCustom
  // },
  // {
  //   conditions: [
  //     {address: 'B1', value: '一次性年终奖'},
  //     {address: 'A2', value: '公司全称'},
  //     {address: 'A3', value: '区间'}
  //   ],
  //   type: EnumType.yearAwards,
  //   header: ['姓名', '*证件号码', '*全年一次性奖金额'],
  //   bodyMap: models.TaxSystem,
  //   footer: [],
  //   skip: [],
  //   parseFile: TaxSystem
  // }
]
