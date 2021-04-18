// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router'
import store from '@/store'
import '@/element-ui/index.scss'
import '@/e-ui/index.scss'
import '@/styles/index.scss'
import '@/components'
import ElementUI from '@element-ui'
import '@/e-ui'
import filters from '@/filters'
import '@/directives'
import DomPortal from 'vue-dom-portal'
import axios from '@axios'
import mixins from 'e-ui/lib/mixins'
import * as MS from '../packages'

import common from '@/utils/common.js'
import _ from 'lodash'

window.$mixins = mixins

Vue.prototype.$axios = axios
Vue.prototype._ = _
Vue.config.productionTip = false
Vue.use(DomPortal)
Vue.use(ElementUI)
Vue.use(common)
Vue.use(MS)
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/*
页面进度条控制
*/
router.beforeEach((to, from, next) => {
  store.commit('LOADING', true)
  next()
})
router.afterEach(() => {
  window.$$timer = setTimeout(() => {
    store.commit('LOADING', false)
  }, 200)
  store.$$onComplete = () => {
    store.commit('LOADING', false)
  }
})
window.$$onComplete = function () {
  store.commit('LOADING', false)
}

let initRootFontSize = function () {
  let width = window.innerWidth
  if (window.devicePixelRatio > 1 && document.ontouchstart !== undefined) {
    width = width * window.devicePixelRatio
  }
  let fontSize = 12
  fontSize = 14 / 1643 * width
  if (fontSize > 16) {
    fontSize = 16
  }
  if (fontSize < 12) {
    fontSize = 12
  }
  document.documentElement.style.fontSize = `${fontSize}px`// 计算设计稿和实际像素的缩放比。向上取整1px = 0.01rem
}
window.addEventListener('resize', initRootFontSize)
initRootFontSize()
if (window.top !== window) {
  document.body.classList.add('is-iframe')
}
window.Vue = Vue
/* eslint-disable no-new */
window.$$root = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
