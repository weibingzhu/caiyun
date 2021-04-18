export default {
  index: '/',
  menus: [
    {
      title: '客户管理',
      index: '0111',
      icon: '&#xe609;'
    },
    {
      title: '数据采集',
      index: '0113',
      icon: '&#xe609;'
    },
    {
      title: '账务管理',
      index: '0114',
      icon: '&#xe609;'
    },
    {
      title: '资产管理',
      index: '0113',
      icon: '&#xe609;',
      options: [{
        title: '固定资产购买',
        index: '0113-01',
        route: '/building/entrance'
      },
      {
        title: '固定资产折旧',
        index: '0113-01',
        route: '/building/parking'
      }]
    }

  ]
}
