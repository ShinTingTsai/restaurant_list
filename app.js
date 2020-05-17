const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
// 引用路由器
const routes = require('./routes')


const app = express()
const port = 3000

const Restaurant = require('./models/restaurant')

// 資料庫連線
mongoose.connect('mongodb://localhost/restaurant-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride("_method"));

// 將 request 導入路由器
app.use(routes)


app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})
