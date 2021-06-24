import utils from './utils'
import configs from './configs'

/**
 * excel解析管理类
 */
class Manager {
  rowsJson = null
  parseFile = null
  model = {}

  async parse (file) {
    await this._parse(file)
    let r = this._match()
    if (r) return r
    this._parseModel()
    debugger
    let tempModel = JSON.parse(JSON.stringify(this.model))
    this.rowsJson = null
    this.parseFile = null
    this.model = null
    file = null
    return tempModel
  }

  /**
   * 把excel解析成row的json或[]
   */
  async _parse (file) {
    let sheetDatas = await utils.parse(file)
    if (!sheetDatas) return
    if (!Array.isArray(sheetDatas) || !sheetDatas[0]) return
    this.rowsJson = sheetDatas[0].rowsJson
  }

  /**
   * 定位excel对应的模型
   * 拿到对应的解析文件（把rowJson解析成对应的模型）
   */
  _match () {
    if (!this.rowsJson) return '解析excel失败，确认excel格式或版本'
    let config = this._getConfig()
    if (!config) return 'excel文件比配失败'
    if (!config.parseFile) return 'config没有比配解析js文件'
    this.parseFile = config.parseFile
  }

  /**
   * 跟进condition获取config
   */
  _getConfig () {
    for (const config of configs) {
      let conditions = config.conditions
      if (!conditions || !Array.isArray(conditions)) continue
      for (const condition of conditions) {
        let excelValue = this.rowsJson[condition.address]
        console.log('condition.value', condition.value)
        if (condition.value.test(excelValue)) return config
      }
    }
  }

  /**
   * 解析 rowJson到对应的模型
   */
  _parseModel () {
    debugger
    this.model = Object.assign(this.model, this.parseFile.before(this.rowsJson))
    this.model = Object.assign(this.model, this.parseFile.header(this.rowsJson))
    this.model = Object.assign(this.model, this.parseFile.body(this.rowsJson))
    this.model = Object.assign(this.model, this.parseFile.footer(this.rowsJson))
    this.model = Object.assign(this.model, this.parseFile.after(this.rowsJson))
  }
}

export default new Manager()
