/**
 * 解析excel的抽象类
 */
export default class Base {
  // constructor () {}
  before (data, model) {
    // 处理一些，填充，跳过， 等清理工作
    return {}
  }
  header (data, model) {
    return {}
  }
  body (data, model) {
    return {}
  }
  footer (data, model) {
    return {}
  }
  after (data, model) {
    // 合并 等
    return {}
  }
}
