const PasswordValidator = require('password-validator');
const createError = require('http-errors');

// Throws an exception if password is invalid
module.exports = (password) => {
  const passwordSchema = new PasswordValidator();
  passwordSchema.is().min(4).is().max(50).has().not().spaces();

  if (!passwordSchema.validate(password)) {
    throw createError(
      400,
      'Password length must be between 4 and 50; no spaces must be present in the password'
    );
  }
};
