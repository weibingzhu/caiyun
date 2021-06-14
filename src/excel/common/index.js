import FileSaver from 'file-saver'
import ExcelJS from 'exceljs'
import _ from 'lodash'
// import { formatDate } from 'element-ui/src/utils/date-util'

/**
 * 通用的导出excel模板， 复杂的请用：
 */
const $$ = {

  /**
   * 导出excel的模板
   * handers = [{ title: '姓名', path: 'name' }, { title: '电话', path: 'phone' }, { title: '职位', path: 'position' }]
   * datas = [{ name: 'name1', phone: '18945897856', position: '秘书' }, { name: 'name2', phone: '18945897856', position: '程序员' }]
   * 没有datas就是模板
   * 注意：里面不支持 value 转换，必须转换好在用
   * @param {*} handers     头部的名称和数据path的映射
   * @param {*} datas       数据源
   * @param {*} exportName  导出的excel的默认名称
   * @param {*} sheetName   sheet的名称
   */
  export (handers, datas, exportName, sheetName = null) {
    if (!handers) return
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(sheetName)

    handers.forEach((hander, i) => {
      let row = worksheet.getRow(1)
      let cell = row.getCell(1 + i++)
      cell.value = hander.title
      datas.forEach((d, ii) => {
        row = worksheet.getRow(2 + ii)
        cell = row.getCell(i)
        cell.value = _.get(d, hander.path)
      })
    })

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], {
        type: 'application/octet-stream'
      })
      FileSaver.saveAs(blob, exportName)
    })
  },

  /**
   * 解析excel
   */
  async parse (file) {
    if (!file) return
    this.workbook = new ExcelJS.Workbook()
    await this.workbook.xlsx.load(file, {})
    let sheets = this.workbook.worksheets
    let sheetDatas = []
    for (let i = 0; i < sheets.length; i++) {
      let sheet = sheets[i]
      let sheetData = {
        name: sheet.name,
        index: i,
        rows: []
      }
      let rowCount = sheet.rowCount
      for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        let row = sheet.getRow(rowIndex)
        let rowData = []
        for (let cellIndex = 1; cellIndex <= row.cellCount; cellIndex++) {
          let cell = row.getCell(cellIndex)
          // type:2数值,3字符串,4日期,6 公式
          if (cell.type === 4 && cell.value) {
            rowData.push(new Date(cell.value).getTime())
            // rowData.push(formatDate(new Date(cell.value)))
          } else {
            rowData.push(cell.text.trim())
          }
        }
        sheetData.rows.push(rowData)
      }
      sheetDatas.push(sheetData)
    }
    return sheetDatas
  }
}

export default $$
