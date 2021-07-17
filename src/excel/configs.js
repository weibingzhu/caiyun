import personal from './personal/configs'
import sales from './sales/configs'
import purchase from './purchase/configs'
import bank from './bank/configs'
/**
 * 特殊excel的所有比配
 */
export default []
  .concat(personal)
  .concat(sales)
  .concat(purchase)
  .concat(bank)

/**
  该结构体一个不能少
  {
    conditions: [
      {address: 'excel的地址', value: 'excel地址对应的值'},
      {address: 'A1', value: '种类'},
    ],
    info: {type,name|taxId,month},
    header: ['头部包含的字段','最好2到5个','多的没什么用'],
    footer: [/尽量用正则/],
    skip: [/尽量用正则/],
    bodyMap: 对应models.js里面的,
    parseFile: 对应 extends Base 的一个类
  }
   */
