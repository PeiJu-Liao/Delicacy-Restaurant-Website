// 載入express package
const express = require('express')
const app = express()
// 設定相關變數
const port = 3000
// 載入handlebars package
const exphbs = require('express-handlebars')

// 設定樣板引擎在express上
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
// 告知express現在view檔案要從hhandlebars裡的main檔案回傳html資料
app.set('view engine', 'handlebars')

// 設置靜態檔案static files
app.use(express.static('public'))

// 載入json資料
const restaurantsList = require("./restaurant.json")

// 設定路徑及伺服回應
app.get('/', (req, res) => {
  res.render('index', { restaurant: restaurantsList.results })
})

app.get('/restaurants/:index', (req, res) => {
  const restaurant = restaurantsList.results.find((item) => {
    return item.id.toString() === req.params.index
  })
  res.render('show', { diningInfo: restaurant })
})

// 建立搜尋路徑
app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim()
  const searchResult = restaurantsList.results.filter((item) => {
    return item.name.toLowerCase().includes(keyword.toLowerCase()) || item.category.toLowerCase().includes(keyword.toLowerCase())
  })
  res.render('index', { restaurant: searchResult, keyword })
})

// 監聽
app.listen(port, () => {
  console.log(`頁面載入成功`);
})