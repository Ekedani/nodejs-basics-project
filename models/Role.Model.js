const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const RoleModel = mongoose.model('roles', RoleSchema);
module.exports = RoleModel;
