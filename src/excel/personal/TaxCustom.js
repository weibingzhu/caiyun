import Base from '../Base'
import utils from '../utils'
import EnumType from '../EnumType'

/**
 * 咱们系统导给客户算税额的excel
 * 和手机端一样，就是跟客户看税款而已
 */
class TaxCustom extends Base {
  constructor () {
    super(EnumType.taxCustom)
  }
  before (config) {
  }
  header (config) {
    let rowsAddrres = config.rowsAddrres
    this.info = {type: this.info.type, name: rowsAddrres['B2'], month: rowsAddrres['B3']}
    return {info: this.info}
  }
  body (config) {
    return {data: utils.rows2Json(config)}
  }
  footer (config) {
    return {}
  }
  after (config) {
    return {}
  }
}
export default new TaxCustom()
