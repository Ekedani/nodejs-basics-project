const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      jwt.verify(req.headers.authorization, JWT_SECRET);
    } else {
      throw createError(401, 'Unauthorized access');
    }
  } catch (err) {
    next(err);
  }
  next();
};
