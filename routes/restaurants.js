const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');




router.get('/new', (req, res) => {
  return res.render('new');
});

router.put('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err);
    return res.render('detail', { restaurants });
  });
});

router.get('/:id/edit', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err);
    return res.render('edit', { restaurants });
  });
});



router.post('', (req, res) => {
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
    description: req.body.description,
  });
  restaurant.save(err => {
    if (err) return console.error(err);
    return res.redirect('/');                        // 新增完成後，將使用者導回首頁
  });
});

router.post('/:id', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err);
    restaurants.name = req.body.name,
      restaurants.name_en = req.body.name_en,
      restaurants.id = req.body.id,
      restaurants.category = req.body.category,
      restaurants.image = req.body.image,
      restaurants.location = req.body.location,
      restaurants.phone = req.body.phone,
      restaurants.google_map = req.body.google_map,
      restaurants.rating = req.body.rating,
      restaurants.description = req.body.description,

      restaurants.save(err => {
        if (err) return console.error(err);
        return res.redirect(`/${req.params.id}`);
      });
  });
});



router.delete('/:id/delete', (req, res) => {
  Restaurant.findById(req.params.id, (err, restaurants) => {
    if (err) return console.error(err);
    restaurants.remove(err => {
      if (err) return console.error(err);
      return res.redirect('/');
    });
  });
});

module.exports = router;

