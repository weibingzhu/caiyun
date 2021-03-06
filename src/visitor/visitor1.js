export default {
  index: '/',
  menus: [
    {
      title: '我的客户',
      index: '01',
      icon: '&#xe604;',
      options: [{
        title: '客户列表',
        index: '01-01',
        route: '/customer/list'
      },
      {
        title: '客户超管',
        index: '01-02',
        route: '/customer/member/list'
      },
      {
        title: '合同管理',
        index: '01-03',
        route: '/customer/contract/list'
      },
      {
        title: '工商年审(备忘)',
        index: '01-04',
        route: '/customer/yearCheck'
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
      route: '/data/Purchase?module=Purchase&tax_or_acc=true'
    },
    {
      title: '自动化管理',
      index: '019',
      icon: '&#xe604;',
      options: [{
        title: '机器人状态',
        index: '019-01',
        route: '/data/personal/adopt'
      },
      {
        title: '任务列表',
        index: '019-02',
        route: '/data/general/adopt'
      }]
    },
    {
      title: '税务管理',
      index: '04',
      icon: '&#xe604;',
      options: [{
        title: '个税',
        index: '03-01',
        route: '/data/personal/adopt'
      },
      {
        title: '一般人增值税',
        index: '03-02',
        route: '/data/general/adopt'
      },
      {
        title: '小规模增值税',
        index: '03-03',
        route: '/data/small/adopt'
      },
      {
        title: '企业所得',
        index: '03-04',
        route: '/data/company/adopt'
      },
      {
        title: '汇算清缴',
        index: '04-05',
        route: '/data/year/adopt'
      }]
    },
    {
      title: '账务管理',
      index: '05',
      icon: '&#xe604;',
      options: [{
        title: '凭证账簿',
        index: '05-01',
        route: '/acc/voucherBook'
      },
      {
        title: '报表管理',
        index: '05-02',
        route: '/acc/report'
      }]
    },
    {
      title: '数据统计',
      index: '0116',
      icon: '&#xe604;',
      options: [{
        title: '税务统计',
        index: '0116-02',
        route: '/tax/statistics'
      },
      {
        title: '账务统计',
        index: '0116-03',
        route: '/acc/statistics'
      },
      {
        title: '账税统计',
        index: '0116-01',
        route: '/statistics'
      }]
    },
    {
      title: '个税管理',
      index: '0117',
      icon: '&#xe604;',
      options: [{
        title: '非居民所得申报',
        index: '0117-04',
        route: '/tax/declareNonResident'
      },
      {
        title: '往期修改',
        index: '0117-06',
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
    // {
    //   title: '权限管理',
    //   index: '021',
    //   icon: '&#xe604;',
    //   route: '/permission/list'
    // },
    {
      title: '角色管理',
      index: '020',
      icon: '&#xe604;',
      route: '/role/list'
    },
    {
      title: '成员管理',
      index: '020',
      icon: '&#xe604;',
      route: '/member/list'
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
        index: '0153-02',
        route: '/setting/system'
      }]
    }
  ]
}
