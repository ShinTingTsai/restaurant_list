const express = require('express')
const router = express.Router()
// 引用  model
const Restaurant = require('../../models/restaurant')

// Create
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/create', (req, res) => {
  if (req.body.image.length === 0) {
    req.body.image =
      'https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png'
  }
  const restaurant = req.body
  restaurant.userId = req.user._id
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})
// Read Single
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch((error) => console.error(error))
})
// Update
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch((error) => console.error(error))
})
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch((error) => console.error(error))
})
// Delete
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.error(error))
})

// 匯出路由模組
module.exports = router
