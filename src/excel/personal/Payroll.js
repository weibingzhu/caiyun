import Base from '../Base'
import utils from '../utils'
import EnumType from '../EnumType'

/**
 * 薪金所得（）
 */
class Payroll extends Base {
  constructor () {
    super(EnumType.Payroll)
  }
  before (config) {
  }
  header (config, model) {
    let rowsAddrres = config.rowsAddrres
    this.info = {type: this.info.type, name: rowsAddrres['B2'], month: rowsAddrres['B3']}
    return {info: this.info}
  }
  body (config, model) {
    return {data: utils.rows2Json(config)}
  }
  footer (config, model) {
    return {}
  }
  after (config, model) {
    return {}
  }
}
export default new Payroll()
