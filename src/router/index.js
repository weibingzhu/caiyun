import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
let routes = [
  {
    path: '/',
    component: () => import('@/views/index.vue'),
    meta: {
      title: 'test'
    },
    children: [
      {
        path: '/developing/:id',
        component: () => import('@/views/developing.vue')
      },
      {
        path: '/',
        component: () => import('@/views/console.vue')
      },
      {
        path: '/statistics',
        component: () => import('@/views/statistics.vue')
      },
      {
        path: '/example',
        component: () => import('@/views/example/index.vue')
      },
      {
        path: '/message',
        component: () => import('@/views/message/index.vue')
      },
      {
        path: '/data/adopt',
        component: () => import('@/views/data/adopt.vue'),
        meta: {
          title: '数据采集'
        }
      },
      {
        path: '/data/personal',
        component: () => import('@/views/data/personal/index.vue')
      },
      {
        path: '/data/general',
        component: () => import('@/views/data/general/index.vue'),
        children: [
          {
            path: 'accPurchase',
            component: () => import('@/views/data/general/accPurchase.vue')
          },
          {
            path: 'accSales',
            component: () => import('@/views/data/general/accSales.vue')
          },
          {
            path: 'taxPurchase',
            component: () => import('@/views/data/general/taxPurchase.vue')
          },
          {
            path: 'taxSales',
            component: () => import('@/views/data/general/taxSales.vue')
          },
          {
            path: 'accPurchaseCustoms',
            component: () => import('@/views/data/general/accPurchaseCustoms.vue')
          },
          {
            path: 'accSalesCustoms',
            component: () => import('@/views/data/general/accSalesCustoms.vue')
          },
          {
            path: 'taxPurchaseCustoms',
            component: () => import('@/views/data/general/taxPurchaseCustoms.vue')
          },
          {
            path: 'taxSalesCustoms',
            component: () => import('@/views/data/general/taxSalesCustoms.vue')
          },
          {
            path: 'accManualBil',
            component: () => import('@/views/data/general/accManualBil.vue')
          },
          {
            path: 'taxManualBil',
            component: () => import('@/views/data/general/taxManualBil.vue')
          },
          {
            path: 'tableGeneral',
            component: () => import('@/views/data/general/tableGeneral.vue')
          }
        ]
      },
      {
        path: '/tax/index',
        component: () => import('@/views/tax/index.vue')
      },
      {
        path: '/acc/index',
        component: () => import('@/views/acc/index.vue')
      },
      {
        path: '/acc/progress',
        component: () => import('@/views/acc/progress.vue')
      },
      {
        path: '/tax/progress',
        component: () => import('@/views/tax/progress.vue')
      },
      {
        path: '/customer/contract',
        component: () => import('@/views/customer/contract.vue')
      },
      {
        path: '/customer/contract-form',
        component: () => import('@/views/customer/contract-form.vue')
      },
      {
        path: '/customer/list',
        component: () => import('@/views/customer/list.vue')
      },
      {
        path: '/init/index',
        component: () => import('@/views/init/index.vue')
      },
      {
        path: '/setting/rate',
        component: () => import('@/views/setting/rate.vue')
      },
      {
        path: '/setting/system',
        component: () => import('@/views/setting/system.vue')
      }
    ]
  },
  {
    path: '/signin',
    component: () => import('@/views/signin.vue')
  }
]

export default new Router({
  mode: 'history',
  routes
})
