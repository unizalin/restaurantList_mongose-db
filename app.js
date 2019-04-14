const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');
const bodyPrarser = require('body-parser');
const mongoose = require('mongoose');


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));
app.use(bodyPrarser.urlencoded({ extended: true }))

const db = mongoose.connection;

db.on('error', () => {
  console.log('db is err')
})

db.once('open', () => {
  console.log('db is open')
})




app.listen(port, () => {
  console.log(`The express is listening on localhost:${port}.`)
})
