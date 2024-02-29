// routes/feedback.js
const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');
const Order = require('../models/order');
const multer = require('multer');
const fs = require('fs');

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Feedback route
router.post('/:orderId', upload.single('image'), async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    const feedbackData = {
      orderId: order._id,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    if (req.file) {
      feedbackData.image = req.file.path;
    }

    if (req.file && req.file.mimetype === 'text/plain') {
      const textData = fs.readFileSync(req.file.path, 'utf-8');
      feedbackData.textFileData = textData;
    }

    const feedback = new Feedback(feedbackData);
    await feedback.save();

    res.redirect('/food'); // Redirect to food list or any other page
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
