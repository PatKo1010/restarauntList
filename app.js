const express = require('express')
const app = express()
const bodyParser = require ('body-Parser')
const port = 3000
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const storeList = require('./models/restaurant.js')

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
           .sort ({_id:'desc'})
           .then ((store) => {
             res.render('index', {restaurants:store})
           })
           .catch (error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render ('new')
})

app.post ('/restaurants/new', (req,res) => {
 return  storeList.create (req.body)
                  .then (()=> {res.redirect('/')})
                  .catch (error => console.log (error))
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
  return storeList.findByIdAndUpdate(id, {$set:req.body})
            .then (() => {res.redirect(`/restaurants/${id}`)})
            .catch (error => console.log (error))
})

app.post ('/restaurants/:id/delete', (req,res) => {

  const id = req.params.id
  return storeList.findById(id)
    .then (store => store.remove())
    .then (() => res.redirect('/'))
    .catch(error=>console.log (error))
})

app.get ('/search', (req,res) => {
  const keyword = req.query.keyword
  storeList.find({
    $or: [
      { name: { $regex: keyword, $options: 'i' } },
      { category: { $regex: keyword, $options: 'i' } },
      { location: { $regex: keyword, $options: 'i' } }
    ]
  })
    .lean()
    .then(restaurants => res.render('index', { restaurants, keyword }))
    .catch(error => console.log(error))
})



app.listen (port, () => {
  console.log (`Express is running on http://localhost:${port}`)
})