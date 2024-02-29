// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  orderId: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: String,
  userAddressId: String,
  paymentMode: { type: String, enum: ['cash', 'card', 'upi'] },
  feedback: {
    rating: { type: Number, min: 1, max: 5 },
    comment: String,
    image: String,
    textFileData: String,
  },
});

module.exports = mongoose.model('Order', orderSchema);
