import utils from './utils'
/**
 * 解析excel的抽象类
 */
module.exports = class Base {
  file = null
  rowsJson = null
  datas = []
  constructor (file) {
    this.file = file
  }
  async parse () {
    let sheetDatas = await utils.parse(this.file)
    if (!sheetDatas) return
    if (!Array.isArray(sheetDatas) || !sheetDatas[0]) return
    this.rowsJson = sheetDatas[0].rowsJson
  }

  condition (params, $user) {}
  header (params, $user) {}
  body (params, $user) {}
  footer (params, $user) {}
  after (params, $user) {}
}
