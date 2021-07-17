import Base from '../Base'
import utils from '../utils'
import EnumType from '../EnumType'

/**
 * 销项
 */
class Main extends Base {
  constructor () {
    super(EnumType.sales)
  }
  before (config) {
  }
  header (config) {
    let rowsAddrres = config.rowsAddrres
    this.info = {type: this.info.type, name: rowsAddrres['A2'], month: rowsAddrres['A4']}
    return {info: this.info}
  }
  body (config) {
    return {data: utils.rows2Json(config)}
  }
  footer (config) {
    return {}
  }
  after (config, model) {
    if (!model || !Array.isArray(model.data)) return {model}
    let details = ['商品名称', '规格', '单位', '数量', '单价', '金额', '税率', '税额', '税收分类编码']

    let tempData = []
    let lastItem = null
    let len = model.data.length
    for (let index = 0; index < len; index++) {
      let item = model.data[index]
      if (!item['发票代码']) {
        let detail = this._buidObj(item, details)
        lastItem.details.push(detail)
        continue
      }
      let detail = this._buidObj(item, details)
      item.details = []
      item.details.push(detail)
      lastItem = item
      tempData.push(lastItem)
    }
    model.data = tempData
    return {model}
  }

  _buidObj (data, attr) {
    if (!data || !attr) return {}
    let temp = {}
    for (const att of attr) {
      temp[att] = data[att]
      delete data[att]
    }
    return temp
  }
}
export default new Main()
