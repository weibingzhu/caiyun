import Base from '../Base'

/**
 * 解析个税里面的 人员excel（个税软件导出的）
 */
class Person extends Base {
  before (params) {
    debugger
    return {a: 'x'}
  }
  header (params) {
    return {b: 'x'}
  }
  body (params) {
    return {c: 'x'}
  }
  footer (params) {
    return {d: 'x'}
  }
  after (params) {
    return {e: 'x'}
  }
}
export default new Person()
