const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');




router.get('/rating', (req, res) => {
  Restaurant.find({})
    .sort({
      rating: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', { restaurants });
    });
});

router.get('/category', (req, res) => {
  Restaurant.find({})
    .sort({
      rating: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', { restaurants });
    });
});

router.get('/asc', (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'asc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants
      })
    })
});

// Z > A 降冪排序
router.get('/desc', (req, res) => {
  Restaurant.find({})
    .sort({
      name: 'desc'
    })
    .exec((err, restaurants) => {
      if (err) return console.error(err);
      return res.render('index', {
        restaurants
      })
    })
});











module.exports = router;