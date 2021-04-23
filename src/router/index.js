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
        component: () => import('@/views/statistics.vue'),
        meta: {
          title: '账税统计'
        }
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
        path: '/data/personal/adopt',
        component: () => import('@/views/data/personal/adopt.vue'),
        meta: {
          title: '个税列表'
        }
      },
      {
        path: '/data/company/adopt',
        component: () => import('@/views/data/company/adopt.vue'),
        meta: {
          title: '企业所得列表'
        }
      },
      {
        path: '/data/general/adopt',
        component: () => import('@/views/data/general/adopt.vue'),
        meta: {
          title: '一般人列表'
        }
      },
      {
        path: '/data/small/adopt',
        component: () => import('@/views/data/small/adopt.vue'),
        meta: {
          title: '小规模列表'
        }
      },
      {
        path: '/data/year/adopt',
        component: () => import('@/views/data/year/adopt.vue'),
        meta: {
          title: '汇算清缴'
        }
      },
      {
        path: '/data/personal/index',
        component: () => import('@/views/data/personal/index.vue'),
        meta: {
          title: '个税数据'
        }
      },
      {
        path: '/data/general',
        component: () => import('@/views/data/general/index.vue'),
        meta: {
          title: '一般人数据'
        },
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
        component: () => import('@/views/tax/index.vue'),
        meta: {
          title: '税务统计'
        }
      },
      {
        path: '/acc/index',
        component: () => import('@/views/acc/index.vue'),
        meta: {
          title: '账务统计'
        }
      },
      {
        path: '/acc/progress',
        component: () => import('@/views/acc/progress.vue'),
        meta: {
          title: '账务进度'
        }
      },
      {
        path: '/tax/progress',
        component: () => import('@/views/tax/progress.vue'),
        meta: {
          title: '税务进度'
        }
      },
      {
        path: '/customer/contract',
        component: () => import('@/views/customer/contract.vue'),
        meta: {
          title: '合同管理'
        }
      },
      {
        path: '/customer/contract-form',
        component: () => import('@/views/customer/contract-form.vue'),
        meta: {
          title: '合同编辑'
        }
      },
      {
        path: '/customer/list',
        component: () => import('@/views/customer/list.vue'),
        meta: {
          title: '客户列表'
        }
      },
      {
        path: '/init/index',
        component: () => import('@/views/init/index.vue'),
        meta: {
          title: '初值化'
        }
      },
      {
        path: '/setting/rate',
        component: () => import('@/views/setting/rate.vue'),
        meta: {
          title: '行业汇率'
        }
      },
      {
        path: '/setting/system',
        component: () => import('@/views/setting/system.vue'),
        meta: {
          title: '系统配置'
        }
      },
      // {
      //   path: '/test/sheetjs',
      //   component: () => import('@/test/sheetjs.vue')
      // },
      {
        path: '/task/index',
        component: () => import('@/views/task/index.vue'),
        meta: {
          title: '任务列表'
        }
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
