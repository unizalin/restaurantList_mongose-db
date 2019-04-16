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






app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`)
});
