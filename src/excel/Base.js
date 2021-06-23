/**
 * 解析excel的抽象类
 */
module.exports = class Base {
  // constructor () {}
  before (params) {
    return {}
  }
  header (params) {}
  body (params) {}
  footer (params) {}
  after (params) {}
}
