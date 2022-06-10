const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const PasswordValidator = require('password-validator');
const User = require('../models/User.Model');
const Role = require('../models/Role.Model');

const { JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

exports.register = async (req, res, next) => {
  try {
    const passwordSchema = new PasswordValidator();
    passwordSchema.is().min(4).is().max(50).has().not().spaces();

    if (!passwordSchema.validate(req.body.password)) {
      throw createError(
        400,
        'Password length must be between 4 and 50; no spaces must be present in the password'
      );
    }
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
