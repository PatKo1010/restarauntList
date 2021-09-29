const mongoose = require('mongoose')
const restaurants = require('./restaurant.json')
const storeList = require('../restaurant.js')

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection
db.on ('error', () => {
  console.log ('mongodb error')
})

db.once ('open' , () => {
  console.log ('mongodb connected')
  for (let i = 0; i<restaurants.results.length; i++) {
    storeList.create(restaurants.results[i])
  }
  console.log ('done')
})