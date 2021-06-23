/**
 * 解析excel的抽象类
 */
module.exports = class Base {
  // constructor () {}
  before (params, $user) {}
  header (params, $user) {}
  body (params, $user) {}
  footer (params, $user) {}
  after (params, $user) {}
}
