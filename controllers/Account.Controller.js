/*eslint-disable */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/User.Model');

exports.changePassword = async (req, res, next) => {
  try {
    const { user } = jwt.decode(req.headers.authorization);
    const { oldPassword, newPassword } = req.body;
    const comparisonResult = await bcrypt.compare(oldPassword, user.password);
  } catch (err) {
    next(err);
  }
};
