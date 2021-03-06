const createError = require('http-errors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const EmailValidator = require('email-validator');
const User = require('../models/User.Model');
const Role = require('../models/Role.Model');
const validatePassword = require('../helpers/validatePassword');

const NOT_FOUND_MSG = 'User not found';
const SALT_ROUNDS = 10;

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    if (!EmailValidator.validate(req.body.email)) {
      throw createError(400, 'Invalid email');
    }
    validatePassword(req.body.password);
    const password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = new User({
      name: req.body.name,
      password,
      email: req.body.email,
      role: req.body.role
    });
    const result = await user.save();
    res.send(result);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
      throw createError(404, NOT_FOUND_MSG);
    }
    res.send(result);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, NOT_FOUND_MSG);
    }
    res.send(result);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = {
      name: req.body.name,
      role: req.body.role
    };
    if (req.body.email) {
      if (!EmailValidator.validate(req.body.email)) {
        throw createError(400, 'Invalid email');
      }
      updated.email = req.body.email;
    }
    if (req.body.password) {
      validatePassword(req.body.password);
      updated.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    }
    const result = await User.findByIdAndUpdate(id, updated, { new: true });
    if (!result) {
      throw createError(404, NOT_FOUND_MSG);
    }
    res.send(result);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;
    const user = await User.findById(id);

    validatePassword(newPassword);
    const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);
    await User.findByIdAndUpdate(user.id, { password: newPasswordHash });
    res.send({
      message: `Password was successfully changed for user with id ${id}`
    });
  } catch (err) {
    next(err);
  }
};

exports.grantAdminPermissions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      throw createError(404, NOT_FOUND_MSG);
    }
    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) {
      throw createError(404, 'Admin role is not implemented in the database');
    }
    if (user.role === adminRole.id) {
      throw createError(400, 'User already has admin permissions');
    }
    await User.findByIdAndUpdate(id, { role: adminRole.id });
    res.send({
      message: `Admin role was successfully granted to user with id ${id}`
    });
  } catch (err) {
    next(err);
  }
};
