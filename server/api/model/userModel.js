// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    maxlength: 10,
    minlength: 3,
    match: /^(?=.*[a-zA-Z])[a-zA-Z0-9]+$/
  },
  password: {
    type: String,
    required: true
  },
});

module.exports = mongoose.model('User', userSchema);
