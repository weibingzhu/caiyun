export default {
  index: '/',
  menus: [
    {
      title: '我的客户',
      index: '01',
      icon: '&#xe604;',
      options: [{
        title: '合同管理',
        index: '01-01',
        route: '/customer/contract'
      },
      {
        title: ' 客户列表',
        index: '01-02',
        route: '/customer/list'
      }]
    },
    {
      title: '初值化管理',
      index: '02',
      icon: '&#xe604;',
      route: '/init/index'
    },
    {
      title: '数据采集',
      index: '03',
      icon: '&#xe604;',
      // route: '/data/adopt'
      options: [{
        title: '个税',
        index: '03-01',
        route: '/data/adopt'
      },
      {
        title: '一般人增值税',
        index: '03-02',
        route: '/tax/index'
      },
      {
        title: '小规模增值税',
        index: '03-03',
        route: '/tax/index'
      },
      {
        title: '企业所得',
        index: '03-04',
        route: '/tax/index'
      },
      {
        title: '汇算清缴',
        index: '04-05',
        route: '/tax/index'
      }]
    },

    {
      title: '税务进度',
      index: '0114',
      icon: '&#xe604;',
      route: '/tax/progress'
    },
    {
      title: '账务进度',
      index: '0115',
      icon: '&#xe604;',
      route: '/acc/progress'
    },
    {
      title: '统计管理',
      index: '0116',
      icon: '&#xe604;',
      options: [{
        title: '账税统计',
        index: '0116-01',
        route: '/statistics'
      },
      {
        title: '税务统计',
        index: '0116-02',
        route: '/tax/index'
      },
      {
        title: '账务统计',
        index: '0116-03',
        route: '/acc/index'
      }]
    },
    {
      title: '个税管理',
      index: '0117',
      icon: '&#xe604;',
      options: [{
        title: '人员信息采集',
        index: '0116-01',
        route: '/statistics'
      },
      {
        title: '专项附加扣除',
        index: '0116-02',
        route: '/tax/index'
      },
      {
        title: '综合所得申报',
        index: '0116-03',
        route: '/tax/declare'
      },
      {
        title: '非居民所得申报',
        index: '0116-04',
        route: '/tax/declareNonResident'
      },
      {
        title: '申报扣款',
        index: '0116-05',
        route: '/tax/pay'
      },
      {
        title: '作废修改',
        index: '0116-06',
        route: '/tax/fix'
      }]
    },
    {
      title: '资产管理',
      index: '0113',
      icon: '&#xe604;',
      options: [{
        title: '固定资产购买',
        index: '0113-01',
        route: '/payroll/info'
      },
      {
        title: '固定资产折旧',
        index: '0113-01',
        route: '/building/parking'
      }]
    },
    {
      title: '系统配置',
      index: '0153',
      icon: '&#xe604;',
      options: [{
        title: '货币汇率',
        index: '0153-01',
        route: '/setting/rate'
      },
      {
        title: '系统设置',
        index: '0153-01',
        route: '/setting/system'
      }]
    },
    {
      title: 'testPage',
      index: '0115',
      icon: '&#xe604;',
      route: '/test/sheetjs'
    },
    {
      title: '任务列表',
      index: '010015',
      icon: '&#xe604;',
      route: '/task/index'
    }
  ]
}
