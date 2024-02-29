// models/chartData.js
const mongoose = require('mongoose');

const chartDataSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  foodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Food' },
  orderCount: Number,
});

module.exports = mongoose.model('ChartData', chartDataSchema);
