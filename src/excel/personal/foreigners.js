import Base from '../Base'
import utils from '../utils'
import EnumType from '../EnumType'

/**
 * 外籍人员信息
 */
class Foreigners extends Base {
  constructor () {
    super(EnumType.foreigners)
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
export default new Foreigners()
