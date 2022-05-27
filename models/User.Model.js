const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  passwordHesh: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  roleID: {
    type: Number,
    required: true
  }
});

const users = mongoose.model('users', UserSchema);
module.exports = users;
