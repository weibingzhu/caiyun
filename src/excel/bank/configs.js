import models from './models'

export default [
  {
    conditions: [
      {address: 'B2', value: /电话/},
      {address: 'A2', value: /姓名/}
    ],
    // parseFile: require('./person'),
    model: models.person
  }
]
