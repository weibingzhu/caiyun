import Base from '../Base'
import utils from '../utils'
import EnumType from '../EnumType'

/**
 * 个税软件导出的税额excel
 */
class TaxSystem extends Base {
  constructor () {
    super(EnumType.taxSystem)
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
export default new TaxSystem()
