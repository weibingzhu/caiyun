import axios from 'axios'
// import qs from 'qs'
// 创建axios实例
const $axios = axios.create({
  // baseURL: '/api_admin', // process.env.BASE_API, // api的base_url
  baseURL: '', // process.env.BASE_API, // api的base_url
  timeout: 10 * 1000 // 请求超时时间
})
let count = 0
$axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (config.headers && token && config.url !== '/api/Session/Login') { // 登录必须不带token
    // config.headers['x-admin-token'] = token
    // config.headers['Authorization'] = 'Bearer ' + token // zn99 style
    config.headers['Authorization'] = 'Token ' + token // .net
  }
  Object.assign(window.$$headers, {token: config.headers['token']})
  if (/^get$/i.test(config.method) && config.params) {
    config.params = JSON.parse(JSON.stringify(config.params))
    if (config.params.rows) { // rows 转化为per-page参加名
      config.params['per-page'] = config.params.rows
      delete config.params.rows
    }
    let keys = Object.keys(config.params)
    if (keys && keys.length) { // 以_time的为参数的时间
      keys.forEach(item => {
        if (/_time$/.test(item) && config.params[item] && !isNaN(config.params[item])) {
          config.params[item] = config.params[item] / 1000
        }
      })
    }
  }
  if (/^(post)|(put)|(delete)$/i.test(config.method)) { // 处理POST请求默认行为
    if (!config.headers['Content-Type']) {
      // TODO
      // if (typeof config.data === 'object') {
      //   config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      //   config.$data = config.data
      //   config.transformRequest = [function (data) {
      //     let d = qs.stringify(data, {arrayFormat: 'indices'})
      //     return d
      //   }]
      // } else {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      // }
    }
  }
  // console.log('context', config.context)
  if (config.options && config.options.context) {
    if (config.options.context._isVue) { // context为vue对象则修改loading状态
      config.options.context.loading = true
      if (config.options.successMsg === undefined) {
        config.options.successMsg = '提交成功'
      }
      if (config.options.errorMsg === undefined) {
        config.options.errorMsg = '提交失败'
      }
    } else if (config.options.context.nodeType === 1) { // context为dom对象则修改disabled状态
      if (config.options.context.parentNode.disabled !== undefined) {
        config.options.context = config.options.context.parentNode
      }
      config.options.context.disabled = true
      if (config.options.successMsg === undefined) {
        config.options.successMsg = '操作成功'
      }
      if (config.options.errorMsg === undefined) {
        config.options.errorMsg = '操作失败'
      }
    }
  }
  if (/^get$/.test(config.method)) {
    window.$$timer && clearTimeout(window.$$timer)
    if (process.browser && window.$nuxt) {
      window.$nuxt.$loading.start()
    }
    count++
  }
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

$axios.interceptors.response.use(res => {
  if (res.config.responseType === 'blob') { // 二进制 （xls 和 图片） 都过这里
    const blob = new Blob([res.data])
    // 图片处理
    if (res.data && (res.data.type.indexOf('image') !== -1)) {
      let url = URL.createObjectURL(blob)
      return url
    }
    // xls处理
    let fileName = `${Math.random().toString(36).substr(2)}.xls`
    if (res.config.fileName) {
      fileName = `${res.config.fileName}.xls`
    } else if (res['headers']['content-disposition'] && res['headers']['content-disposition'].split('filename=')[1]) {
      fileName = res['headers']['content-disposition'].split('filename=')[1]
    }
    if ('download' in document.createElement('a')) { // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else { // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    }
  }
  if (/^(post)|(put)|(delete)$/i.test(res.config.method)) {
    // console.log('res.context', res.config.context)
    if (res.config.options && res.config.options.context) { // 是否传上下文
      if (res.config.options.context._isVue) { // context为vue对象时则修改loading状态
        res.config.options.context.loading = false
        res.config.options.context = null
      } else if (res.config.options.context.nodeType === 1) { //  context为元素对象时则修改disabled状态
        res.config.options.context.disabled = false
      }
    }
  }
  if (/^get$/.test(res.config.method)) {
    if (count === 1) {
      if (process.browser && window.$nuxt) {
        window.$nuxt.$loading.finish()
      }
      window.$$onComplete && window.$$onComplete()
    }
    count--
  }
  if (res.status === 200) {
    if (/^(post)|(put)|(delete)$/i.test(res.config.method)) {
      if (res.config.options && res.config.options.successMsg) {
        let successMsg = res.config.options.successMsg
        window.$$root && window.$$root.$message.success(successMsg)
      }
    }
    return res.data
  } else if (res.status === 401) {
    localStorage.removeItem('token')
    if (window.$$root && window.$$root.$route.path !== '/signin') {
      if (window.$$root.$store.state && window.$$root.$store.state.user && window.$$root.$store.state.user.type === -1) {
        console.log('guest not signin')
      } else if (process.env.NODE_ENV === 'production') {
        window.$$root.$router.push({
          path: '/signin'
        })
      } else {
        window.$$root.$message.error('token失效，请重新登录')
      }
    }
    return Promise.reject(res.data)
  } else {
    if (!(res.config.options && res.config.options.errorMsg === false)) {
      window.$$root && res.data && res.data.msg && window.$$root.$message.error(res.data.msg)
    }
    return Promise.reject(res.data)
  }
}, error => {
  if (count > 0) {
    if (count === 1) {
      if (process.browser && window.$nuxt) {
        window.$nuxt.$loading.finish()
      }
      window.$$onComplete && window.$$onComplete()
    }
    count--
  }
  console.log('error', error)
  return Promise.reject(error)
})

export default $axios
