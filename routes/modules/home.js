const express = require ('express')
const router = express.Router ()
const storeList = require ('../../models/restaurant')



router.get('/', (req, res) => {
  const sort = req.query.sort
  const sortMethods = {
    'a-z': {name:"asc"},
    'z-a': {name: "desc"},
    'location':{location: 'asc'},
    'rating': {rating : 'desc'},
    'category' : {category : 'asc'}
  } 
 
  const sortValue = sort ? { [sort]: true } : { "a-z": true }

    storeList.find()
      .lean()
      .sort(sortMethods[sort]|| {name:'asc'})
      .then((store) => {
        res.render('index', { restaurants: store, sortValue })
      })
      .catch(error => console.log(error))

})

module.exports = router
