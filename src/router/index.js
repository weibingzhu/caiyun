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
        meta: {
          title: '信息页面'
        },
        component: () => import('@/views/message/index.vue')
      },
      {
        path: '/php',
        meta: {
          title: '个人主页'
        },
        component: () => import('@/views/php.vue')
      },
      {
        path: '/data/adopt',
        meta: {
          title: '数据采集'
        },
        component: () => import('@/views/data/adopt.vue')
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
        path: '/data',
        component: () => import('@/views/data/general/index.vue'),
        meta: {
          title: '一般人数据'
        },
        children: [
          {
            path: 'Sales',
            meta: {
              title: '销项数据'
            },
            component: () => import('@/views/data/sales/list.vue')
          },
          {
            path: 'Purchase',
            meta: {
              title: '进项数据'
            },
            component: () => import('@/views/data/purchase/list.vue')
          },
          {
            path: 'PurchaseCustoms',
            component: () => import('@/views/data/purchaseCustoms/list.vue')
          },
          {
            path: 'SalesCustoms',
            component: () => import('@/views/data/salesCustoms/list.vue')
          },
          {
            path: 'ManualBill',
            component: () => import('@/views/data/manualBill/list.vue')
          },
          {
            path: 'TableGeneral',
            meta: {
              title: '报税税表'
            },
            component: () => import('@/views/data/general/tableGeneral.vue')
          },
          {
            path: 'Charge',
            component: () => import('@/views/data/charge/list.vue')
          }
        ]
      },
      {
        path: '/tax/progress',
        component: () => import('@/views/tax/progress.vue'),
        meta: {
          title: '账务进度'
        }
      },
      {
        path: '/tax/statistics',
        component: () => import('@/views/tax/statistics.vue'),
        meta: {
          title: '税务统计'
        }
      },
      {
        path: '/acc/statistics',
        component: () => import('@/views/acc/statistics.vue'),
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
        path: '/member/index',
        component: () => import('@/views//member/index.vue'),
        meta: {
          title: '成员管理'
        }
      },
      {
        path: '/permission/index',
        component: () => import('@/views/permission/index.vue'),
        meta: {
          title: '权限设置'
        }
      },
      {
        path: '/role/index',
        component: () => import('@/views/role/index.vue'),
        meta: {
          title: '角色管理'
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
        path: '/customer/leave',
        component: () => import('@/views/customer/list.vue'),
        meta: {
          title: '客户列表'
        }
      },
      {
        path: '/customer/yearCheck',
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
      {
        path: '/acc/voucherBook',
        component: () => import('@/views/acc/voucherBook/index.vue'),
        meta: {
          title: '凭证账簿'
        }
      },
      {
        path: '/acc/report',
        component: () => import('@/views/acc/report/index.vue'),
        meta: {
          title: '报表管理'
        }
      },
      {
        path: '/partner/list',
        component: () => import('@/views//partner/list.vue'),
        meta: {
          title: '合伙人列表'
        }
      },
      {
        path: '/partner/data',
        component: () => import('@/views/partner/data.vue'),
        meta: {
          title: '合伙人数据'
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
