const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: String,
  role: { type: String, enum: ['admin', 'superuser', 'user'], default: 'user' },
});

module.exports = mongoose.model('User', userSchema);
