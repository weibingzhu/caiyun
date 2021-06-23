import utils from './utils'
import configs from './configs'

/**
 * excel解析管理类
 *
 */
class Manager {
  rowsJson = null
  parseFile = null
  model = null
  async parse (file) {
    let sheetDatas = await utils.parse(file)
    if (!sheetDatas) return
    if (!Array.isArray(sheetDatas) || !sheetDatas[0]) return
    this.rowsJson = sheetDatas[0].rowsJson
  }
  /**
   * 定位是哪个excel
   */
  match () {
    if (!this.rowsJson) return '解析excel失败，确认excel格式或版本'

    let config = configs.find(c => {
      let condition = c.condition
      if (!condition || !Array.isArray(condition)) return false
      for (const item of condition) {
        let v = this.rowsJson[item.address]
        if (!item.value || !item.value.test(v)) return false
      }
    })

    if (!config) return 'excel文件比配失败'
    if (!config.parseFile) return 'config没有比配解析js文件'
    this.parseFile = config.parseFile
  }
  parseModel () {
    this.model = Object.assign(this.model, this.parseFile.before())
    this.model = Object.assign(this.model, this.parseFile.header())
    this.model = Object.assign(this.model, this.parseFile.body())
    this.model = Object.assign(this.model, this.parseFile.footer())
    this.model = Object.assign(this.model, this.parseFile.after())
  }
}

module.exports = new Manager()
