// models/feedback.js
const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  rating: { type: Number, min: 1, max: 5 },
  comment: String,
  image: String,
  textFileData: String,
});

module.exports = mongoose.model('Feedback', feedbackSchema);
