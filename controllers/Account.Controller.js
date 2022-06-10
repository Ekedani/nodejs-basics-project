const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/User.Model');
const validatePassword = require('../helpers/validatePassword');

const SALT_ROUNDS = 10;

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.token.user.id);
    const comparisonResult = await bcrypt.compare(oldPassword, user.password);
    if (!comparisonResult) {
      throw createError(401, 'Incorrect old password');
    }

    validatePassword(newPassword);
    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await User.findByIdAndUpdate(user.id, { password: newPasswordHash });
    res.send({ message: 'Password was successfully changed' });
  } catch (err) {
    next(err);
  }
};
