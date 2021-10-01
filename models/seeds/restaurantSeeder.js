const db = require('../../config/mongoose')
const restaurants = require('./restaurant.json')
const storeList = require('../restaurant.js')

db.once ('open', () => {
  for (let i of restaurants.results){
    storeList.create (i)
  }
  console.log ('done')
})
