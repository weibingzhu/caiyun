export default {
  index: '/',
  menus: [
    {
      title: ' 首页',
      index: '0120',
      icon: ' <i class="iconfont">&#xe750;</i>',
      route: '/'
    },
    {
      title: '员工管理',
      index: '012',
      icon: '&#xe715;',
      options: [{
        title: '员工列表',
        index: '012-01',
        route: '/user/list'
      }
      ]
    },
    {
      title: '监控管理',
      index: '02',
      icon: '&#xe639;',
      options: [{
        title: '打卡记录',
        index: '02-02',
        route: '/wears'
      },
      {
        title: '违规记录',
        index: '02-03',
        route: '/foul'
      },
      {
        title: '数据报表',
        index: '02-0333',
        route: '/data/report'
      }
      // {
      //   title: '头盔配件',
      //   index: '02-04',
      //   route: '/helmet/parts'
      // },
      // {
      //   title: '退盔申请',
      //   index: '02-05',
      //   route: '/helmet/refund'
      // }
      ]
    },
    {
      title: '产品管理',
      index: '011',
      icon: '&#xe602;',
      options: [{
        title: '产品订单',
        index: '011-01',
        route: '/order'
      },
      {
        title: '产品使用管理',
        index: '011-02',
        route: '/helmet/use-mgt'
      },
      {
        title: '退盔管理',
        index: '02-05',
        route: '/helmet/refund'
      },
      {
        title: '员工退盔管理',
        index: '02-06',
        route: '/helmet/return-employees'
      },
      {
        title: '平台退盔管理',
        index: '02-07',
        route: '/helmet/return-enterprise'
      }
      ]
    },
    {
      title: '账户管理',
      index: '05',
      icon: '&#xe70b;',
      options: [{
        title: '公司信息',
        index: '05-01',
        route: '/mine'
      },
      // {
      //   title: '子账号管理',
      //   index: '06-01',
      //   route: '/employees'
      // },
      {
        title: '登录账户',
        index: '06-011',
        route: '/mine/login-account'
      },
      {
        title: '地址管理',
        index: '05-02',
        route: '/basic/address'
      },
      {
        title: '发票管理',
        index: '05-03',
        route: '/basic/invoices'
      }
      ]
    },
    {
      title: '保险理赔',
      index: '014',
      icon: '&#xe70b;',
      options: [{
        title: '保险消费清单',
        index: '014-01',
        route: '/claims/consumption'
      },
      {
        title: '保险理赔管理',
        index: '014-02',
        route: '/claims/management'
      },
      {
        title: '赔付清单',
        index: '014-03',
        route: '/claims'
      }
      ]
    },
    {
      title: '钱包管理',
      index: '013',
      icon: '&#xe603;',
      options: [{
        title: '我的钱包',
        index: '05-04',
        route: '/mine/myMoney'
      },
      {
        title: '账户充值',
        index: '013-05',
        route: '/mine/recharge'
      },
      {
        title: '流水记录',
        index: '013-011',
        route: '/mine/statements-record'
      },
      {
        title: '申请开票',
        index: '013-03',
        route: '/basic/apply-invoices'
      },
      {
        title: '交易明细',
        index: '013-01',
        route: '/trade'
      },
      {
        title: '待付款账单',
        index: '013-02',
        route: '/trade/wait-payment'
      }
      ]
    }
  ]
}
