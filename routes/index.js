const express = require ('express')
const router = express.Router()
const home = require('./modules/home')
const stores = require('./modules/store')

//導入路由
router.use ('/',home)
router.use ('/restaurants', stores)




//匯出總路由器
module.exports = router