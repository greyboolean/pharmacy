const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'manager', 'cashier'],
    default: 'user'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
