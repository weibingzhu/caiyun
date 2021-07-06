import Base from '../Base'

/**
 * 解析个税里面的 人员excel（个税软件导出的）
 */
class Person extends Base {
  before (data, model) {
  }
  header (data, model) {
    let header = {name: data['A2'], month: data['A3']}
    return {header}
  }
  body (data, model) {
    let body = []
    // let subBody = {}
    for (const key of data) {
      let value = data[key]
      let item = model.find(m => m.title === value)
      if (item) continue
      // let keyChar = key.replace(/[^0-9]/ig, '')
      // let keyNumber = key.replace(/[^a-z]+/ig, '')

      // for (const item of model) {
      //   let title = item.title
      //   console.log(title)
      // }
    }
    return {body}
  }
  footer (data, model) {
    return {d: 'x'}
  }
  after (data, model) {
    return {e: 'x'}
  }
}
export default new Person()
