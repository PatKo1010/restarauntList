const mongoose = require('mongoose')
const storeList = require('/Users/kohsi-yang/ac_exercising/restaurant_list/models/restaurant.js')
const db = mongoose.connection
const restaurants = require('/Users/kohsi-yang/ac_exercising/restaurant_list/restaurant.json')

mongoose.connect('mongodb://localhost/restaurant-list')

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