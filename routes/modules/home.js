const express = require('express')
const router = express.Router()
// 引用  model
const Restaurant = require('../../models/restaurant')

// Read all
router.get('/', (req, res) => {
  const userId = req.user._id
  const sortby = '排序'
  Restaurant.find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then((restaurants) => res.render('index', { restaurants, sortby }))
    .catch((error) => console.error(error))
})

// Sort
router.get('/sort/:key/:value', (req, res) => {
  const userId = req.user._id
  const sortby = {
    name_asc: '名稱 A -> Z',
    name_desc: '名稱 Z -> A',
    category_asc: '類別',
    location_asc: '地區'
  }
  const sortSelected = `${req.params.key}_${req.params.value}`
  Restaurant.find({ userId })
    .lean()
    .sort({ [req.params.key]: req.params.value })
    .then((restaurants) =>
      res.render('index', { restaurants, sortby: sortby[sortSelected] })
    )
    .catch((error) => console.error(error))
})

// Search
router.get('/search', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  const sortby = '排序'
  return Restaurant.find({ name: { $regex: `${keyword}`, $options: 'i' }, userId: userId })
    .lean()
    .then((restaurants) => {
      if (Object.keys(restaurants).length === 0) { res.render('notFound', { keyword }) } else res.render('index', { restaurants, keyword, sortby })
    })
})

// 匯出路由模組
module.exports = router
