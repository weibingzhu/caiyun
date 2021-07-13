import personal from './personal/configs'
import sales from './sales/configs'
import purchase from './purchase/configs'
/**
 * 特殊excel的所有比配
 */
export default []
  .concat(personal)
  .concat(sales)
  .concat(purchase)

/**
  该结构体一个不能少
  {
    conditions: [
      {address: 'A1', value: '种类'},
    ],
    info: {},
    header: [],
    footer: [],
    skip: [],
    bodyMap: xx,
    parseFile: xx
  }
   */
