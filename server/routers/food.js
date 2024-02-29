// routes/food.js
const express = require('express');
const router = express.Router();
const Food = require('../models/food');

router.get('/', (req, res) => {
  // Fetch and render food items
  Food.find({}, (err, foods) => {
    if (err) {
      console.log(err);
    } else {
      res.render('food/index', { foods });
    }
  });
});

module.exports = router;
