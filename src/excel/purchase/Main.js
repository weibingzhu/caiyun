import Base from '../Base'
import utils from '../utils'
import EnumType from '../EnumType'

/**
 * 进项
 */
class Main extends Base {
  constructor () {
    super(EnumType.purchase)
  }
  before (config) {
  }
  header (config) {
    let rowsAddrres = config.rowsAddrres
    this.info = {type: this.info.type, taxId: rowsAddrres['B2'], month: rowsAddrres['H2']}
    return {info: this.info}
  }
  body (config) {
    return {data: utils.rows2Json(config)}
  }
  footer (config) {
    return {}
  }
  after (config, model) {
    return {model}
  }
}
export default new Main()
