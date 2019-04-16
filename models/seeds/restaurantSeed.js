const mongoose = require('mongoose');
const Restaurant = require('../restaurant');
const RestaurantData = require('../restaurant.json');

mongoose.connect('mongodb://localhost/restaurants', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', () => {
  console.log('db Seeder error');
});

db.once('open', () => {
  const data = RestaurantData.results;
  for (let i = 0; i < data.length; i++) {
    Restaurant.create({
      name: data[i].name,
      name_en: data[i].name_en,
      category: data[i].category,
      image: data[i].image,
      location: data[i].location,
      phone: data[i].phone,
      google_map: data[i].google_map,
      rating: data[i].rating,
      description: data[i].description
    });
  }
  console.log(Restaurant)
  console.log('db Seeder ok');
});