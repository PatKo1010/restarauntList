const express = require('express')
const app = express()
const port = 3000

const restaurants = require('./restaurant.json')

const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use (express.static('public'))

app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurants.results})
})


app.get ('/restaurants/:id', (req,res) => {
  const id = Number(req.params.id)
  const restaurant = restaurants.results.filter ( (element) => { 
    return Number (element.id) === id 
  })
  res.render ('show', {restaurant: restaurant[0]})
})

app.get ('/search', (req,res) => {
  const keyword = req.query.keyword
  const searchedRestaurants = restaurants.results.filter ((element) => {
    return element.name.toLowerCase().replace(/\s*/g, "").includes(req.query.keyword.toLowerCase().replace(/\s*/g, "")) ||element.category.toLowerCase().includes (req.query.keyword.toLowerCase())
  })
  res.render ('index', {restaurants: searchedRestaurants, keyword: keyword})
})

app.listen (port, () => {
  console.log (`Express is running on http://locolhost:${port}`)
})