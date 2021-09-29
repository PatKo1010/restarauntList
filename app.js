const express = require('express')
const app = express()
const bodyParser = require ('body-Parser')
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const storeList = require('./models/restaurant.js')
const routes = require ('./routes')

mongoose.connect('mongodb://localhost/restaurant-list')
const db = mongoose.connection 

db.on ('error', () => {
  console.log ('mongodb error')
})

db.once ('open' , () => {
  console.log ('mongodb connected')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(routes)




app.listen (port, () => {
  console.log (`Express is running on http://localhost:${port}`)
})