const express = require('express');
const router = express.Router();
const Order = require('../models/order');

router.get('/daily-orders', async (req, res) => {
  try {
    const orders = await Order.find();
    

    res.render('chart/daily-orders', { chartData }); 
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
