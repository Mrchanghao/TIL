const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,

  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  
}, {
  timestamps: true,
})

module.exports = mongoose.model('Users', userSchema);