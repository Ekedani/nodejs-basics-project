const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    default: '629121cf23f06b34fd02ee72', // User-Role ID in our Database
    required: true
  }
});

const users = mongoose.model('users', UserSchema);
module.exports = users;
