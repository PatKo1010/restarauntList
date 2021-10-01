const express = require('express')
const app = express()
const bodyParser = require ('body-Parser')
const port = 3000
const exphbs = require('express-handlebars')
const storeList = require('./models/restaurant.js')
const routes = require ('./routes')
const methodOverride = require ('method-override')


require('./config/mongoose')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use (methodOverride('_method'))

app.use(routes)




app.listen (port, () => {
  console.log (`Express is running on http://localhost:${port}`)
})