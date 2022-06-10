const bcrypt = require('bcrypt');
const createError = require('http-errors');
const PasswordValidator = require('password-validator');
const User = require('../models/User.Model');

const SALT_ROUNDS = 10;

exports.changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.token.user.id);
    const comparisonResult = await bcrypt.compare(oldPassword, user.password);
    if (!comparisonResult) {
      throw createError(401, 'Incorrect old password');
    }

    const passwordSchema = new PasswordValidator();
    passwordSchema.is().min(4).is().max(50).has().not().spaces();

    if (!passwordSchema.validate(newPassword)) {
      throw createError(
        400,
        'Password length must be between 4 and 50; no spaces must be present in the password'
      );
    }

    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await User.findByIdAndUpdate(user.id, { password: newPasswordHash });
    res.send({ message: 'Password was successfully changed' });
  } catch (err) {
    next(err);
  }
};
