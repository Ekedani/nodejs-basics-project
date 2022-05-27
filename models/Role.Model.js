const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const roles = mongoose.model('roles', RoleSchema);
module.exports = roles;
