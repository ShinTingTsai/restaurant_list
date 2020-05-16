const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

const Restaurant = require("./models/restaurant");

// 資料庫連線
mongoose.connect("mongodb://localhost/restaurant-list", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// const restaurantList = require('./restaurant.json')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))

//Setup Router
//Read all
app.get("/", (req, res) => {
  Restaurant.find()
  .lean()
  .then(restaurants => res.render('index', { restaurants }))
  .catch(error => console.error(error))
});
//Create
app.get("/restaurants/new", (req, res) => {
  return res.render("new");
});

app.post("/restaurants/create", (req, res) => {
  if (req.body.image.length === 0) {
    req.body.image = "https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-33.png";
  }
  const restaurant = req.body;
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
});
// Read Single
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(error => console.error(error))
})
// Update
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render("edit", { restaurant }))
    .catch((error) => console.error(error));
});
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  // const restaurant = req.body;
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, req.body);
      return restaurant.save();
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch((error) => console.error(error));
})
// Delete
app.post("/restaurants/:id/delete", (req, res) => {
  const id = req.params.id;
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
});


app.get('/search', (req, res) => {
  const keyword = req.query.keyword

  return Restaurant.find({ name: { $regex: `${keyword}`, $options: "i" } })
    .lean()
    .then((restaurants) => {
      if (Object.keys(restaurants).length === 0) res.render('notFound', { keyword })
      else res.render('index', { restaurants, keyword })
    });

  // const restaurants = restaurantList.results.filter(restaurant => {
  //   return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  // })
  if (Object.keys(restaurants).length === 0) {
    res.render('notFound', { keyword: keyword })
  } else {
    res.render('index', { restaurants: restaurants, keyword: keyword })
  }
})


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
