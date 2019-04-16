const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const db = mongoose.connection;

const Restaurant = require('./models/restaurant');
db.on('error', () => {
  console.log('db is err')
});

db.once('open', () => {
  console.log('db is open')
});

app.get('/', (req, res) => {
  Restaurant.find((err, restaurants) => {
    if (err) return console.error(err);
    return res.render('index', { restaurants: restaurants });
  });
});


app.get('/restaurants/new', (req, res) => {
  return res.render('new');
});



app.post('/restaurants', (req, res) => {
  const restaurant = Restaurant({
    name: req.body.name,
    name_en: req.body.name_en,
    id: req.body.id,
    category: req.body.category,
    image: req.body.image,
    location: req.body.location,
    phone: req.body.phone,
    google_map: req.body.google_map,
    rating: req.body.rating,
    description: req.body.description,                       // name 是從 new 頁面 form 傳過來
  });

  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect('/');                        // 新增完成後，將使用者導回首頁
  });
});

app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
});
