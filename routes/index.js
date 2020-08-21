// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', home)
// 將網址結構符合 /todos 字串開頭的 request 導向 todos 模組
router.use('/restaurants', restaurants)
router.use('/users', users)

// 匯出路由器
module.exports = router
