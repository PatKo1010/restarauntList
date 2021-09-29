const express = require ('express')
const router = express.Router ()
const storeList = require ('../../models/restaurant')



router.get('/', (req, res) => {
  storeList.find()
    .lean()
    .sort({ _id: 'desc' })
    .then((store) => {
      res.render('index', { restaurants: store })
    })
    .catch(error => console.log(error))
})

module.exports = router
