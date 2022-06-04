const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  try {
    const { user } = jwt.decode(req.headers.authorization);
    const roleId = user.role;
    const adminId = '62920ae323f06b34fd02ee7f';

    if (roleId === adminId) {
      jwt.verify(req.headers.authorization, JWT_SECRET);
    } else {
      throw createError(401, 'Authorization token must be provided');
    }
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      next(createError(401, err.message));
    }
    next(err);
  }
  next();
};
