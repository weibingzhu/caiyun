import utils from '../utils'
// import _ from 'lodash'
// import { formatDate } from 'element-ui/src/utils/date-util'

/**
 * 解析个税里面的 人员excel（个税软件导出的）
 */
const $$ = {
  async parse (file) {
    let sheetDatas = await utils.parse(file)
    if (!sheetDatas) return
    if (!Array.isArray(sheetDatas) || !sheetDatas[0]) return
    let rowsJson = sheetDatas[0].rowsJson
    let datas = []
    rowsJson.forEach((row, index) => {
      if (index === 0) return
      let data = {}
      pathMap.forEach(p => {
        data[p] = 'ss'
      })
      datas.push(data)
    })
    sheetDatas = null
  }
}
const config = {
  condition: {},
  title:
}
/**
 * ‘title’ excel的表头
 * ‘path’ 数据库的字段
 * ‘type’ 存储数据类型
 */
const pathMap = [
  { title: '工号', path: '工号', type: 'string' },
  { title: '*姓名', path: '*姓名', type: 'string' },
  { title: '*证件类型', path: '*姓名', type: 'string' },
  { title: '*证件号码', path: '*姓名', type: 'string' },
  { title: '*国籍(地区', path: '*姓名', type: 'string' },
  { title: '*性别', path: '*姓名', type: 'string' },
  { title: '*出生日期', path: '*姓名', type: 'string' },
  { title: '人员状态', path: '*姓名', type: 'string' },
  { title: '*任职受雇从业类型', path: '*姓名', type: 'string' },
  { title: '入职年度就业情形', path: '*姓名', type: 'string' },
  { title: '手机号码', path: '*姓名', type: 'string' },
  { title: '任职受雇从业日期', path: '*姓名', type: 'string' },
  { title: '离职日期', path: '*姓名', type: 'string' },

  { title: '是否残疾', path: '*姓名', type: 'string' },
  { title: '是否烈属', path: '*姓名', type: 'string' },
  { title: '是否孤老', path: '*姓名', type: 'string' },
  { title: '残疾证号', path: '*姓名', type: 'string' },
  { title: '烈属证号', path: '*姓名', type: 'string' },

  { title: '是否扣除减除费用', path: '*姓名', type: 'string' },
  { title: '个人投资额', path: '*姓名', type: 'string' },
  { title: '个人投资比例(%)', path: '*姓名', type: 'string' },
  { title: '备注', path: '*姓名', type: 'string' },
  { title: '中文名', path: '*姓名', type: 'string' },
  { title: '涉税事由', path: '*姓名', type: 'string' },
  { title: '出生国家(地区)', path: '*姓名', type: 'string' },
  { title: '首次入境时间', path: '*姓名', type: 'string' },
  { title: '预计离境时间', path: '*姓名', type: 'string' },
  { title: '其他证件类型', path: '*姓名', type: 'string' },

  { title: '户籍所在地（省）', path: '*姓名', type: 'string' },
  { title: '户籍所在地（市）', path: '*姓名', type: 'string' },
  { title: '户籍所在地（区县）', path: '*姓名', type: 'string' },
  { title: '户籍所在地（详细地址）', path: '*姓名', type: 'string' },

  { title: '经常居住地（省）', path: '*姓名', type: 'string' },
  { title: '经常居住地（市）', path: '*姓名', type: 'string' },
  { title: '经常居住地（区县）', path: '*姓名', type: 'string' },
  { title: '经常居住地（详细地址）', path: '*姓名', type: 'string' },

  { title: '联系地址（省）', path: '*姓名', type: 'string' },
  { title: '联系地址（市）', path: '*姓名', type: 'string' },
  { title: '联系地址（区县）', path: '*姓名', type: 'string' },
  { title: '联系地址（详细地址）', path: '*姓名', type: 'string' },

  { title: '电子邮箱', path: '*姓名', type: 'string' },
  { title: '学历', path: '*姓名', type: 'string' },
  { title: '开户银行', path: '*姓名', type: 'string' },
  { title: '银行账号', path: '*姓名', type: 'string' },
  { title: '开户行省份', path: '*姓名', type: 'string' },
  { title: '职务', path: '*姓名', type: 'string' }
]
export default $$
