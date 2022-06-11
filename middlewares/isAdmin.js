const createError = require('http-errors');

module.exports = (req, res, next) => {
  if (!(req.token.user.role === 'admin')) {
    next(createError(403, 'Admin permissions are required'));
  }
  next();
};
