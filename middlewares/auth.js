const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw createError(401, 'Authorization token must be provided');
    }
    const type = req.headers.authorization.split(' ')[0];
    const token = req.headers.authorization.split(' ')[1];
    if (type !== 'Bearer' || !token) {
      throw new Error('Authentication failed');
    }
    req.token = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(createError(401, err.message));
    }
    if (!err.status) {
      next(createError(401, 'Invalid token'));
    }
    next(err);
  }
};
