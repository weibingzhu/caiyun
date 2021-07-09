/**
 * 解析excel的抽象类
 */
export default class Base {
  info = null // {type:哪个类型（种类的excel）, name: 公司名称 || taxId:税号，month:月份}
  data = null // excel的主体数据
  constructor (type) {
    this.info = {type}
  }
  /**
   *处理一些，填充，跳过， 等清理工作
   */
  before (config) {
    return {}
  }
  header (config) {
    return {}
  }
  body (config) {
    return {}
  }
  footer (config) {
    return {}
  }
  /**
   * 合并 等
   */
  after (config) {
    return {}
  }
}
