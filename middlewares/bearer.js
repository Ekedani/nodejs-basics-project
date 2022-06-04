const createError = require('http-errors');

module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization.startsWith('Bearer ')) {
      req.headers.authorization = req.headers.authorization.substring(7);
    } else {
      throw createError(401, 'Token type must be bearer');
    }
  } catch (err) {
    next(err);
  }
  next();
};
