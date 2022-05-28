const createError = require('http-errors');
const User = require('../models/User.Model');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findById(id);
    if (!result) {
      throw createError(404, 'User not found');
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await User.findByIdAndDelete(id);
    if (!result) {
      throw createError(404, 'User not found');
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = new User(req.body);
    const result = await User.findByIdAndUpdate(id, updated, { new: true });
    if (!result) {
      throw createError(404, 'User not found');
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};
