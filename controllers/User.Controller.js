const createError = require('http-errors');
/* eslint-disable */
const mongoose = require('mongoose');
const User = require('../models/User.Model');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    next(err);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const user = new User.create(req.body);
    const result = await user.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = User.find({ id: id });
    res.send(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = User.findByIdAndDelete(id);
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
    const result = User.findByIdAndUpdate(id);
    if (!result) {
      throw createError(404, 'User not found');
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};
