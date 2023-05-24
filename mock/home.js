const data = require('./data.json')
module.exports = [
  {
    url: '/home',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data
      }
    }
  }
]