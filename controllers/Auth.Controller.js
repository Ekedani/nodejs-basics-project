const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/User.Model');

const { JWT_SECRET } = process.env;

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = User.findOne({ email });
    if (!user) {
      throw createError(400, 'This account does not exist');
    }
    if (await bcrypt.compare(password, user.password)) {
      const userTokenData = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      const token = jwt.sign(
        {
          user: userTokenData
        },
        JWT_SECRET,
        {
          expiresIn: '1h'
        }
      );
      res.send({ token });
    } else {
      throw createError(400, 'Account or password is incorrect');
    }
  } catch (err) {
    next(err);
  }
};
