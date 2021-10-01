const express = require ('express')
const router = express.Router()
const storeList = require ('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  return storeList.create(req.body)
    .then(() => { res.redirect('/') })
    .catch(error => console.log(error))
})

router.get("/search", (req, res) => {
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

router.get('/:id', (req, res) => {
  const id = req.params.id
  storeList.findById(id)
    .lean()
    .then((store) => {
      res.render('show', { restaurant: store })
    })
    .catch(error => console.log(error))
})

router.get('/:id/edits', (req, res) => {
  const id = req.params.id
  storeList.findById(id)
    .lean()
    .then((store) => {
      res.render('edit', { restaurant: store })
    })
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  return storeList.findByIdAndUpdate(id, { $set: req.body })
    .then(() => { res.redirect(`/restaurants/${id}`) })
    .catch(error => console.log(error))
})

router.delete ('/:id', (req, res) => {
  
  const id = req.params.id
  return storeList.findById(id)
    .then(store => store.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})





module.exports = router