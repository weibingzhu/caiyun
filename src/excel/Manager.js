import utils from './utils'
import configs from './configs'

/**
 * excel解析管理类
 */
class Manager {
  config = null
  sheet = null
  rowsAddrres = null

  /**
   * file 的内容
   * info 头部信息
   */
  async parse (file, info) {
    this.model = {}
    await this._parse(file)
    let r = this._match(info)
    if (r) return r
    let m = this._parseModel(info)
    if ((typeof m) === 'string') return m

    let model = JSON.parse(JSON.stringify(m))
    Object.assign(this.config, model)
    return this.config
  }

  /**
   * 把excel解析成row的json或[]
   */
  async _parse (file) {
    let sheetDatas = await utils.parse(file)
    if (!sheetDatas) return
    if (!Array.isArray(sheetDatas) || !sheetDatas[0]) return
    this.sheet = sheetDatas[0].sheet
    this.rowsAddrres = sheetDatas[0].rowsAddrres
  }

  /**
   * 定位excel对应的模型
   * 拿到对应的解析文件（把rowJson解析成对应的模型）
   */
  _match (info) {
    if (!this.rowsAddrres) return '解析excel失败，确认excel格式或版本'
    this.config = this._getConfig(info)
    if (!this.config) return '自动配比种类失败，请选择对应种类上传'
    Object.assign(this.config, {rowsAddrres: this.rowsAddrres, sheet: this.sheet})
  }

  /**
   * 跟进condition获取config
   * 如果是string 是判断全等
   * 如果是正则（/ * /）就用test比配
   */
  _getConfig (info) {
    for (const config of configs) {
      debugger
      let conditions = config.conditions
      if (!conditions || !Array.isArray(conditions)) continue
      asdf
      if (info) return conditions.some(c => c.type === info.type) // 无头解析，上传之前已经确定了info
      let isConfig = conditions.every(condition => {
        let cellValue = this.rowsAddrres[condition.address]
        let condValue = condition.value
        if (!cellValue || !condValue) return false
        if ((typeof condValue) === 'string' && condValue === cellValue) return true
        if (this._isReg(condValue) && condValue.test(cellValue)) return true
        return false
      })
      if (isConfig) return config
    }
  }

  /**
   * 解析rowJson到对应的模型
   */
  _parseModel (info) {
    let jsFile = this.config.parseFile
    if (!jsFile) return '没有找到对应的解析脚本，请联系管理人员'

    let model = {}
    Object.assign(model, jsFile.before(this.config))
    Object.assign(model, info ? {info} : jsFile.header(this.config))
    Object.assign(model, jsFile.body(this.config))
    Object.assign(model, jsFile.footer(this.config))
    Object.assign(model, jsFile.after(this.config))
    return model
  }

  _isReg (reg) {
    let isReg
    try {
      // eslint-disable-next-line no-eval
      isReg = eval(reg) instanceof RegExp
    } catch (e) {
      isReg = false
    }
    return isReg
  }
}

export default new Manager()
