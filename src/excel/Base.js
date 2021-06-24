/**
 * 解析excel的抽象类
 */
export default class Base {
  // constructor () {}
  before (params) {
    return {}
  }
  header (params) {
    return {}
  }
  body (params) {
    return {}
  }
  footer (params) {
    return {}
  }
  after (params) {
    return {}
  }
}
