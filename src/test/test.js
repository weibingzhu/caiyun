let onRequest = null
let onResponse = null
let aaData = []
await page.setRequestInterception(true)


let reqDataPromise = async (pageIndex, pageNum) => {
  return new Promise(async (resolve, reject) => {
    onRequest =  (request) => {
      common.tempCache(request)
      interception.editPostData_dikou(request, [{ name: 'xxxxxx', value: pageIndex },{ name: 'iDisplayLength', value: pageNum }], tjyf)
    }
    onResponse = (response) => {
      response.text().then(result => { resolve(result) }).catch(error => { reject(error) })
    }
    page.once('request', onRequest)
    page.once('response', onResponse)
    try {
      if (currMonth != configMonth) {
        await page.click('#wq_search')                                                                         // 发票清单查询
      } else {
        await page.click('#dq_tip_info > div:nth-child(1) > span.floatR_btn.font_1 > a:nth-child(3)')          // 发票清单查询 {当期的}
      }
    } catch (error) {
      reject(error)
    }
  })
}

let reqDataFun = async (pageIndex, pageNum) =>{
  page.removeListener('request', onRequest)
  page.removeListener('response', onResponse)
  let tempData = await reqDataPromise(pageIndex, pageNum)
  page.removeListener('request', onRequest)
  page.removeListener('response', onResponse)
  tempData = tempData.substring(tempData.indexOf('(') + 1, tempData.lastIndexOf(')'))
  return JSON.parse(tempData)
}
let reqData = reqDataFun(0, 100)
let total = reqData.key3.iTotalRecords
config.invoiceTotal = config.invoiceTotal ? config.invoiceTotal + total : total

if(total > 100){
  let len = parseInt(total / 100) + (total % 100 == 0 ? 0 : 1)
  for (let index = 1; index < len; index++) {
    let eachData = await reqDataFun(0, 100)
    aaData = aaData.concat(eachData.key3.aaData)
  }
}

await page.setRequestInterception(false)

return await $.getDetail(page, aaData, config)
