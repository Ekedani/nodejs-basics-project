const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization, JWT_SECRET);
    } else {
      throw createError(401, 'Authorization token must be provided');
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(createError(401, err.message));
    }
    if (!err.status) {
      next(createError(401, 'Invalid token'));
    }
    next(err);
  }
  next();
};
