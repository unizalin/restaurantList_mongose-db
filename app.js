const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const db = mongoose.connection;

const Restaurant = require('./models/restaurant');
db.on('error', () => {
  console.log('db is err');
});

db.once('open', () => {
  console.log('db is open');
});

app.use('/', require('./routes/home'));
app.use('/restaurants', require('./routes/restaurants'));
app.use('/sort', require('./routes/sort'));





app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`);
});
