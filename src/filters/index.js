/*
对Date的扩展，将 Date 转化为指定格式的String
月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
(new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
(new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
*/
Date.prototype.format = function (fmt = 'yyyy-MM-dd') { //eslint-disable-line
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}
export default {

  // 申报状态映射
  declareStatusTxt (value, thiss) {
    let txtMap = thiss.znData.declareStatusTxt
    let v = txtMap[value] ? txtMap[value] : '未申报'
    return v
  },
  // 公司名称缩写
  filterName (value) {
    if (!value) return ''
    let filterArr = ['深圳市', '(深圳)', '（深圳）', '深圳', '广州市', '东莞市', '科技有限公司', '科技有限公司', '（有限合伙）', '(有限合伙)', '有限公司']
    for (const item of filterArr) {
      let index = value.indexOf(item)
      if (index >= 0) value = value.replace(item, '')
    }
    return value
  },
  toAmount (value) {
    if (!value) return ''
    // 金额转换 分->元 保留2位小数 并每隔3位用逗号分开 1,234.56
    let str = (value / 100).toFixed(2) + ''
    let intSum = str.substring(0, str.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ',') // 取到整数部分
    let dot = str.substring(str.length, str.indexOf('.')) // 取到小数部分搜索
    return intSum + dot
  },
  dateFormat: Date.prototype.format,
  /**
   * @description 格式化金额
   * @param number：要格式化的数字
   * @param decimals：保留几位小数 默认0位
   * @param decPoint：小数点符号 默认.
   * @param thousandsSep：千分位符号 默认为,
   */
  formatMoney (number, decimals = 2, decPoint = '.', thousandsSep = ',') {
    if (number === 0) return 0
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  }
}
