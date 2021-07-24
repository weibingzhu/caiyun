import axios from '@axios'
import areaJSON from '@areaJSON'
// import Vue from 'vue'
// import {MessageBox} from '@element-ui'
// Vue.use(MessageBox)
export default {
  install (Vue, options) {
    // 用法
    // this.Utils.handleBaseSortable('/v1/member', this.query, obj, (pagedata) => { this.pageData = pagedata })
    Vue.prototype.Utils = {
      /**
       * 必须定义有 region
       * form 下必须定义有 province city area （省 市 区）
       * @param {要提交的form} form
       * @param {省 市 区 选择的array} region
       */
      handleRegion2PCA (form, region) {
        if (region) {
          if (region.length >= 1) {
            form.province = region[0]
          }
          if (form.region.length >= 2) {
            form.city = region[1]
          }
          if (form.region.length === 3) {
            form.area = region[2]
          }
        }
      },
      getPCD (format = 'P-C-D') { // TODO format
        let data = areaJSON
        let _areaJSON = []
        data.forEach(e => {
          let children = []
          _areaJSON.push({ label: e.label, value: e.value, children: children })
          e.children.forEach(ee => {
            children.push({ label: ee.label, value: ee.value })
          })
        })
        return _areaJSON
      },
      fliterItem (ids, isShow = false) { // isShow 删掉的话连input都看不见了
        console.log('ids:', ids)
        let data = this.getPCD()
        for (let id of ids) {
          let item = this.getDataByValue(data, id)
          if (item) {
            console.log('label', item.label, item.value)
            item['disabled'] = true
          }
        }
        return data
      },
      getDataByValue (data, id) {
        for (let e of data) {
          if (e.value === id) {
            return e
          }
          for (let ee of e.children) {
            if (ee.value === id) {
              return ee
            }
          }
        }
      },
      // 去重 多维数组值 一维值引用好弄https://segmentfault.com/a/1190000016418021
      unique (array) {
        let res = []
        for (let i = 0, len = array.length; i < len; i++) {
          let current = array[i].toString()
          if (res.indexOf(current) !== -1) {
            return true
          } else {
            res.push(current)
          }
        }
        return false
      },
      tabReplace (thiss, page = 1) {
        let query = Object.assign(thiss.query, { page })
        thiss.$router.replace({
          path: thiss.$route.path,
          query
        })
      },

      strTime2PeriodObj (period) {
        if (!period) return { y: new Date().getFullYear(), m: new Date().getMonth() }
        let index = period.indexOf('-')
        return { y: parseInt(period.substring(0, index)), m: parseInt(period.substring(index + 1)) }
      },
      /**
       * 获取 store 里面的 period 的对象 '2020-10' => {y:2020,m:10}
       */
      getStorePeriodObj (thiss) {
        let period = thiss.$store.state.period
        if (thiss._.isDate(period)) {
          return { y: period.getFullYear(), m: period.getMonth() + 1 }
        } else if (thiss._.isString(period)) {
          let index = period.indexOf('-')
          return { y: parseInt(period.substring(0, index)), m: parseInt(period.substring(index + 1)) }
        } else {
          let date = new Date()
          let y = date.getFullYear()
          let m = date.getMonth()
          if (m === 0) {
            --y
            m = 12
          }
          thiss.$store.commit('PERIOD', y + '-' + m)
          return { y, m }
        }
      },

      /**
       * 上下一家
       * @param {*} number -1 上一家 ，1 下一家
       */
      offsetCompany (thiss, offset, arr = []) {
        let csl = arr.length ? arr : thiss.$store.state.allCompanies
        let sc = thiss.$store.state.selectCompanyId
        let currIndex = thiss._.findIndex(csl, (e) => { return e.value === sc })
        currIndex = currIndex + offset
        if (currIndex >= csl.length) currIndex = 0
        if (currIndex < 0) currIndex = csl.length - 1
        let selectCompanyId = csl[currIndex].value
        thiss.$store.commit('SELECT_COMPANY_ID', selectCompanyId)

        let routerPath = thiss.$route.path
        thiss.$router.push({ path: routerPath, query: { companyId: selectCompanyId } })

        return currIndex
      },

      // 跟进ID获取index
      getIndexByCompanyId (thiss, companyId) {
        let cs = thiss.$store.state.allCompanies
        return thiss._.findIndex(cs, (o) => { return o.value === companyId })
      }

    }

    // 这里封装了axios 的增删改查，
    // 两个满足不了，自己在外部实现，也可在这里进行扩展
    // 增改： handleAddAndUpdate
    // 查：   handleFetch/handleBaseSortable
    // 删：   handleDelete
    // 在业务重使用：this.UtilsAxios.handleXXX()
    Vue.prototype.UtilsAxios = {
      /**
       * 获取后台数据
       * @param {请求地址} url
       * @param {参数} query
       * @param {回调函数} responseFun
       */
      handleFetch (url, responseFun, query = null) {
        let params
        if (query) {
          params = JSON.parse(JSON.stringify(query))
          if (params.state == 0) { // eslint-disable-line
            delete params.state // 去掉state为0
          }
        }
        return axios({
          url,
          params
        }).then(res => {
          responseFun(res)
        }).catch((e) => {
          console.log('UtilsAxios.handleFetch error', e)
        })
      },
      handleFetchPost (url, responseFun, query = null, method = 'POST') {
        let data
        if (query) {
          data = JSON.parse(JSON.stringify(query))
          if (data.state == 0) { // eslint-disable-line
            delete data.state // 去掉state为0
          }
        }
        return axios({
          url,
          data,
          method
        }).then(res => {
          responseFun(res)
          return res
        }).catch((e) => {
          console.log('UtilsAxios.handleFetch error', e)
        })
      },
      /**
      * 表格排序
      * @param {*} url            请求的url
      * @param {*} query          整个请求的参数
      * @param {*} obj            排序的参数
      * @param {*} responseFun    axios回调的函数
      */
      handleBaseSortable (url, query, obj, responseFun) {
        if (obj && obj.order != null) {
          let order = obj.order
          let prop = obj.prop // 属性名
          order = order === 'descending' ? 'desc' : 'asc'
          query['orderby'] = prop + ' ' + order // 注意有一个空格
          let params = JSON.parse(JSON.stringify(query))
          return axios({
            url: url,
            params
          }).then(res => {
            query.orderby = ''
            query.attr = ''
            responseFun(res)
          })
        }
      },
      /**
       * 添加和更新的
       * 只要针对
       * TODO 不用传 parentThis就更好了，需要在axios改
       * @param {*} url           添加回更新的url
       * @param {*} currThis      调用的实例的this
       * @param {*} data          更新的参数
       * @param {*} responseFun   axios回调的函数
       */
      handleAddAndUpdate (url, data, currThis, responseFun = null) {
        return axios({
          url,
          method: currThis.query ? 'PUT' : 'POST',
          data,
          options: {
            context: currThis
          }
        }).then((res) => {
          responseFun && responseFun(res)
        })
      },
      /**
       * POST 或 PUT 提交
       */
      handlePostOrPut (url, method, data, context, message = null, responseFun = null) {
        return axios({
          url,
          method,
          data,
          options: {
            context,
            message
          }
        }).then((res) => {
          responseFun && responseFun(res)
        })
      },
      /**
       * 删除一条数据
       * TODO 不需要传 event 就更好，需要在axios改
       * @param {*} url 删除url
       * @param {*} tipStr 提示语
       * @param {*} responseFun 回调
       */
      // handleDelete (url, tipStr, responseFun, event, title = '提示') {
      //   MessageBox.confirm(tipStr, title, {
      //     type: 'warning'
      //   }).then(() => {
      //     return axios({
      //       url,
      //       method: 'DELETE',
      //       options: {
      //         context: event.target
      //       }
      //     }).then((res) => {
      //       responseFun(res)
      //     })
      //   })
      // },
      /**
       * 导出函数
       * @param {*} url 导出url
       * @param {*} data 导出参数
       * @param {*} responseFun 回调函数
       */
      handleExport (url, data = null, fileName = null, responseFun = null) {
        if (data) {
          return axios({
            url,
            method: 'POST',
            responseType: 'blob',
            fileName,
            data
          }).then((res) => {
            responseFun && responseFun(res)
          })
        } else {
          return axios({
            url,
            method: 'GET',
            responseType: 'blob',
            fileName
          })
        }
      }
    }

    // 用法
    //  <el-select placeholder="" v-model="form.xxxxx">
    //   <el-option v-for="item in znData.xxxx" :key="item.value" :label="item.label" :value="item.value"></el-option>
    //  </el-select>
    Vue.prototype.znData = {
      modulesMapping: {
        AccauxBank: 'bank',
        AccauxCharge: 'charge',
        AccauxCustomsPurchase: 'customsPurchase',
        AccauxCustomsSales: 'customsSales',
        AccauxFixedAsset: 'fixedAsset',
        AccauxFixedAssetDepreciation: 'fixedAssetDepreciation',
        AccauxManualBill: 'manualBill',
        AccauxPayroll: 'payroll',
        AccauxPurchase: 'purchase',
        AccauxSales: 'sales',
        AccauxTaxPersonal: 'taxPersonal',
        AccauxTicket: 'ticket'
      },
      declareSuccessStatus: ['declare-success', 'pay-queue-up', 'pay-processing', 'pay-fail', 'pay-success', 'completed'],
      paySuccessStatus: ['pay-success', 'completed'],
      taxStatus: {
        'declare-success': '成功',
        'pay-success': '成功/1234.12'
      },
      taxType: {
        taxPersonal: 'taxPersonal',
        taxGeneral: 'taxGeneral',
        taxSmall: 'taxSmall',
        taxCompany: 'taxCompany'
      },
      declareStatus: [
        { value: '1', label: '未申报' },
        { value: '2', label: '已申报' },
        { value: '3', label: '申报异常' },
        { value: '4', label: '未扣款' },
        { value: '5', label: '已扣款' },
        { value: '6', label: '扣款异常' }
      ],

      bookkeepingType: [
        { value: '2', label: '按月' },
        { value: '3', label: '按季' },
        { value: '4', label: '半年' },
        { value: '5', label: '一年' },
        { value: '6', label: '不计' }
      ],
      qualificationItem: [
        { value: '1', label: '一般纳税人' },
        { value: '2', label: '小规模纳税人' },
        { value: '0', label: '未知' }
      ],
      // 申报状态对应的文字
      declareStatusTxt: {
        'calc': '统计',
        'calc-fail': '统计失败',
        'calc-success': '申报', // '统计成功',

        'declare-queue-up': '申报排队',
        'declare-processing': '申报中',
        'declare-fail': '申报异常',
        'declare-success': '扣款',

        'pay-queue-up': '扣款排队',
        'pay-processing': '扣款中',
        'pay-fail': '扣款失败',
        'pay-success': '扣款成功',

        'completed': '报税完成'
      },
      // 申报状态对应的颜色 默认样式
      declareStatusColor: {
        'calc': '',
        'calc-fail': '',
        'calc-success': '',

        'declare-queue-up': 'primary',
        'declare-processing': 'warning',
        'declare-fail': 'danger',
        'declare-success': 'primary',

        'pay-queue-up': 'primary',
        'pay-processing': 'warning',
        'pay-fail': 'danger',
        'pay-success': 'primary',

        'completed': 'primary'
      },
      // 自动化任务状态
      autoTaskStatus: [
        { value: 'queue-up', label: '排队中' },
        { value: 'processing', label: '处理中' },
        { value: 'fail', label: '失败' },
        { value: 'timeout', label: '超时' },
        { value: 'success', label: '成功' },
        { value: 'cancel', label: '取消' }
      ],
      // 一般纳税人增值税
      APP_CLASSIFY_GENERAL: {
        normal_declare: 'normal_declare',
        normal_declare_off: 'normal_declare_off',
        normal_zero_declare: 'normal_zero_declare',
        normal_pay: 'normal_pay',
        normal_cancel: 'normal_cancel',

        general_declare: 'general_declare',
        general_zero_declare: 'general_zero_declare',
        general_pay: 'general_pay',
        general_cancel: 'general_cancel',
        general_result: 'general_result'
      },
      // 个税的
      APP_CLASSIFY_PERSONAL: {
        personal_declare_status: 'personal_declare_status',
        personal_declare_off: 'personal_declare_off',

        personal_declare: 'personal_declare',
        personal_pay: 'personal_pay',
        personal_cancel: 'personal_cancel',
        personal_result: 'personal_result'
      },
      // APP_CLASSIFY: Object.assign(JSON.parse(JSON.stringify(APP_CLASSIFY_GENERAL)), APP_CLASSIFY_PERSONAL),
      APP_CLASSIFY_STATUS: [
        { value: 'general_pay', label: 'TODO1' },
        { value: 'general_declare', label: 'TODO2' }
      ],
      WEB_CLASSIFY_STATUS: [
        { value: 'general_pay', label: 'TODO11' },
        { value: 'general_declare', label: 'TODO22' }
      ]
    }
  }
}
