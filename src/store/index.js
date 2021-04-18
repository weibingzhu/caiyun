import Vue from 'vue'
import Vuex from 'vuex'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(Vuex)
let user = localStorage.getItem('user')
let tax_or_acc = localStorage.getItem('tax_or_acc')
let period = localStorage.getItem('period')
let allCompanies = localStorage.getItem('allCompanies')
let selectCompanyId = localStorage.getItem('selectCompanyId')
let selectCompanyIds = localStorage.getItem('selectCompanyIds')
let state = {
  isDev: process.env.NODE_ENV !== 'production',
  loading: true,
  global: {},
  user: user ? JSON.parse(user) : {},
  tax_or_acc,
  period,
  allCompanies: allCompanies ? JSON.parse(allCompanies) : {},
  selectCompanyIds: selectCompanyIds ? JSON.parse(selectCompanyIds) : [],
  selectCompanyId
}
// actions
const actions = {
}
// mutations
const mutations = {
  LOADING (state, data) {
    state.loading = data
    if (data) {
      NProgress.start()
    } else {
      NProgress.done()
    }
  },
  USRE (state, data) {
    localStorage.setItem('user', JSON.stringify(data))
    state.user = data
  },
  TAX_OR_ACC (state, data) {
    localStorage.setItem('tax_or_acc', data)
    state.tax_or_acc = data
  },
  PERIOD (state, data) {
    localStorage.setItem('period', data)
    state.period = data
  },
  ALL_COMPANIES (state, data) { // 登录成功时 ，返回该账号下的所有公司
    localStorage.setItem('allCompanies', JSON.stringify(data))
    state.allCompanies = data
  },
  SELECT_COMPANY_IDS (state, cIds) { // 选过的公司列表
    localStorage.setItem('selectCompanyIds', JSON.stringify(cIds))
    state.selectCompanyIds = cIds
  },
  SELECT_COMPANY_ID (state, cId) { // 当前选择的公司ID
    if (state.selectCompanyIds) state.selectCompanyIds.push(cId)
    localStorage.setItem('selectCompanyId', cId)
    state.selectCompanyId = cId
  }
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  mutations,
  strict: debug
})
