const express = require('express')
const app = express()
const bodyParser = require ('body-Parser')
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const storeList = require('/Users/kohsi-yang/ac_exercising/restaurant_list/models/restaurant.js')

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



app.get('/', (req, res) => {
  storeList.find()
           .lean()
           .then ((store) => {
             res.render('index', {restaurants:store})
           })
           .catch (error => console.log(error))
})


app.get('/restaurants/new', (req, res) => {
  res.render ('new')
})

app.get ('/restaurants/:id', (req,res) => {
  const id = req.params.id
  storeList.findById(id)
           .lean()
           .then ( (store) => {
             res.render ('show', {restaurant:store})
          })
          .catch(error => console.log(error))
})

app.get('/restaurants/:id/edits', (req,res) => {
  const id = req.params.id
  storeList.findById (id)
           .lean ()
           .then ( (store) => {
             res.render ('edit', {restaurant:store})
           })
           .catch (error => console.log (error))
})

app.post ('/restaurants/:id/edits' , (req,res) => {
  const id = req.params.id
  const name = req.body.name
  const address = req.body.address
  const phone = req.body.phoneNumber
  const description = req.body.description
  return storeList.findById (id)
             .then ( (store) => {
              store.name = name
              store.location = address
              store.phone = phone
              store. description = description
              return store.save()
             })
             . then (()=> {res.redirect('/')})
             .catch (error => console.log (error))
})

app.get ('/search', (req,res) => {
  const keyword = req.query.keyword
  const searchedRestaurants = restaurants.results.filter ((element) => {
    return element.name.toLowerCase().replace(/\s*/g, "").includes(req.query.keyword.toLowerCase().replace(/\s*/g, "")) ||element.category.toLowerCase().includes (req.query.keyword.toLowerCase())
  })
  res.render ('index', {restaurants: searchedRestaurants, keyword: keyword})
})



app.listen (port, () => {
  console.log (`Express is running on http://localhost:${port}`)
})