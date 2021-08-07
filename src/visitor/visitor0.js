export default {
  index: '/',
  menus: [
    {
      title: '合伙人管理',
      index: '0183',
      icon: '&#xe604;',
      options: [{
        title: '合伙人列表',
        index: '0183-01',
        route: '/partner/list'
      },
      {
        title: '合伙人数据',
        index: '0183-02',
        route: '/partner/data'
      },
      {
        title: '流失的客户',
        index: '01-03',
        route: '/customer/leave'
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
    }
  ]
}
