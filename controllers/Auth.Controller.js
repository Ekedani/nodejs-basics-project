const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const EmailValidator = require('email-validator');
const User = require('../models/User.Model');
const Role = require('../models/Role.Model');
const validatePassword = require('../helpers/validatePassword');

const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

exports.register = async (req, res, next) => {
  try {
    if (!EmailValidator.validate(req.body.email)) {
      throw createError(400, 'Invalid email');
    }
    validatePassword(req.body.password);
    const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = new User({
      name: req.body.name,
      password,
      email: req.body.email
    });
    const result = await user.save();
    const userTokenData = {
      id: result.id,
      name: result.name,
      email: result.email,
      role: result.role
    };
    const token = jwt.sign({ userTokenData }, JWT_SECRET, { expiresIn: '1h' });
    res.send({
      message: 'Account has been successfully created',
      token
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw createError(400, 'This account does not exist');
    }
    const role = await Role.findById({ _id: user.role }).select('name -_id');
    const comparisonResult = await bcrypt.compare(password, user.password);
    if (comparisonResult) {
      const userTokenData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: role.name
      };
      const token = jwt.sign({ user: userTokenData }, JWT_SECRET, {
        expiresIn: '1h'
      });
      res.send({ token });
    } else {
      throw createError(400, 'Account or password is incorrect');
    }
  } catch (err) {
    next(err);
  }
};
