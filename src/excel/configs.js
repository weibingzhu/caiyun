import personal from './personal/configs'
import bank from './bank/configs'
/**
 * 特殊excel的所有比配
 */
export default []
  .concat(personal)
  .concat(bank)

/**
  该结构体一个不能少
  {
    conditions: [
      {address: 'A1', value: '种类'},
    ],
    header: [],
    bodyMap: xx,
    footer: [],
    skip: [],
    parseFile: xx
  }
   */
