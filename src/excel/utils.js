import FileSaver from 'file-saver'
import ExcelJS from 'exceljs'
import _ from 'lodash'
import {
  formatDate
} from 'element-ui/src/utils/date-util'

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
   *
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
        sheet,
        name: sheet.name,
        index: i,
        rowsAddrres: {},
        rowsArray: []
      }
      let rowCount = sheet.rowCount
      for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        let row = sheet.getRow(rowIndex)
        let rowArray = []
        for (let cellIndex = 1; cellIndex <= row.cellCount; cellIndex++) {
          let value = ''
          let cell = row.getCell(cellIndex)
          if (cell.type === 4) { // type:2数值,3字符串,4日期,6公式
            value = cell.value || 0
            rowArray.push(new Date(value).getTime()) // rowData.push(formatDate(new Date(cell.value)))
          } else {
            value = cell.text || ''
            value = value.trim()
            rowArray.push(value)
          }
          sheetData.rowsAddrres[cell.address] = value
        }
        sheetData.rowsArray.push(rowArray)
      }

      sheetDatas.push(sheetData)
    }
    return sheetDatas
  },

  rows2Json (config) {
    if (!config || !config.sheet) return {}
    if (!config.header || !Array.isArray(config.header)) return {}
    // if (!config.skip || !Array.isArray(config.skip)) return {}
    // if (!config.footer || !Array.isArray(config.footer)) return {}

    let keys = []
    let dataArray = []

    config.sheet.eachRow((row, rowIndex) => {
      let rowValues = row.values
      if (keys.length === 0 && _.intersection(rowValues, config.header).length === config.header.length) { // 获取头部
        keys = rowValues
        return
      }
      if (keys.length > 0) { // 跳过头部
        let isSkip = config.skip ? config.skip.length === 0 : true
        let isFooter = config.footer ? config.footer.length === 0 : true
        if (!isSkip) isSkip = !$$._isSkip(rowValues, config)
        if (!isFooter) isFooter = !$$._isFooter(rowValues, config)
        if (isSkip && isFooter) { // 跳过skip，跳过footer; 余下的就是body
          let rowDict = $$.eachCell(keys, row)
          dataArray.push(rowDict)
        }
      }
    })
    return dataArray
  },

  /**
   * 过滤掉需要跳过的
   */
  _isSkip (rowValues, config) {
    return $$._excelVSconfig(rowValues, config.skip)
  },

  /**
   * 过滤掉底部
   */
  _isFooter (rowValues, config) {
    return $$._excelVSconfig(rowValues, config.footer)
  },

  /**
   * excel的内容和config文件的过滤文件（支持正则）
   */
  _excelVSconfig (excelRows, vsDatas) {
    if (!excelRows || !vsDatas || !Array.isArray(excelRows) || !Array.isArray(vsDatas)) return
    let isAllString = vsDatas.some(e => (typeof e) === 'string')
    if (isAllString) {
      return _.intersection(excelRows, vsDatas).length === vsDatas.length
    } else {
      return vsDatas.every(vsData => {
        if ((typeof vsData) === 'string' && excelRows.includes(vsData)) {
          return true
        } else if ($$.isRegExp(vsData)) {
          return excelRows.some(cellValue => {
            return cellValue ? vsData.test(cellValue) : false
          })
        } else {
          return false
        }
      })
    }
  },

  /**
   *  type: 2数值,3字符串,4日期,6公式
   */
  eachCell (keys, row) {
    let data = {}
    row.eachCell((cell, colIndex) => {
      let value = null
      if (cell.type === 4) {
        value = cell.value
        if (value) value = new Date(value).getTime() // rowData.push(formatDate(new Date(cell.value)))
      } else {
        value = cell.value || ''
        value = value.trim()
        if (typeof value === 'object') value = value.text
      }
      data[keys[colIndex]] = value
    })
    return data
  },

  /**
   * 数据类型转换
   */
  convert (value, type, format = null) {
    if (!value || !type) return value
    type = type.toLocaleLowerCase()
    switch (type) {
      case 'date':
        value = formatDate(new Date(value), format)
        break
      default:
        break
    }
    return value
  },

  isRegExp (reg) {
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

export default $$
