const createError = require('http-errors');
/*eslint-disable */
const mongoose = require('mongoose');
const Role = require('../models/Role.Model');

exports.getAllRoles = async (req, res, next) => {
  try {
    const roles = await Role.find({});
    res.send(roles);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};
