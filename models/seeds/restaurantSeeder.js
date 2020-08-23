const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const User = require('../user')
const Restaurant = require('../restaurant')
const restaurantList = require('./restaurant.json')
const db = require('../../config/mongoose')

const seedUsers = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678'
  },
  {
    name: 'user2',
    email: 'user2@example.com',
    password: '12345678'
  }
]

db.once('open', () => {
  function createData (user, restaurantId) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => User.create({
          name: user.name,
          email: user.email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from(
            { length: 3 },
            (_, i) => Restaurant.create({
              name: restaurantList.results[i + restaurantId].name,
              name_en: restaurantList.results[i + restaurantId].name_en,
              category: restaurantList.results[i + restaurantId].category,
              image: restaurantList.results[i + restaurantId].image,
              location: restaurantList.results[i + restaurantId].location,
              phone: restaurantList.results[i + restaurantId].phone,
              google_map: restaurantList.results[i + restaurantId].google_map,
              rating: restaurantList.results[i + restaurantId].rating,
              description: restaurantList.results[i + restaurantId].description,
              userId
            })
          )).then(() => resolve())
        })
    }).catch(err => console.log(err))
  }

  async function seeder (seedUsers) {
    try {
      await createData(seedUsers[0], 0)
      await createData(seedUsers[1], 3)
    } catch (err) {
      console.log(err)
    }
  }
  seeder(seedUsers)
    .then(() => {
      console.log('done.')
      process.exit()
    })
    .catch(err => console.log(err))
})
