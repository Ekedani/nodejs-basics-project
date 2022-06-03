const createError = require('http-errors');
const mongoose = require('mongoose');
// eslint-disable-next-line no-unused-vars
const jwt = require('jsonwebtoken');
const Shelf = require('../models/Shelf.Model');

const NOT_FOUND_MSG = 'Shelf not found';

exports.getAllShelves = async (req, res, next) => {
  try {
    /* Uncomment this and info below when everything else will be ready
    const { user } = jwt.decode(req.headers.authorization.substr(7)); */

    const user = '629121bd23f06b34fd02ee6f';
    const shelves = await Shelf.find({ user });
    res.send(shelves);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.createShelf = async (req, res, next) => {
  try {
    /* Uncomment this and info below when everything else will be ready
    const { user } = jwt.decode(req.headers.authorization.substr(7)); */

    const user = '629121bd23f06b34fd02ee6f';
    const shelf = new Shelf({
      name: req.body.name,
      tags: req.body.tags,
      user
      // user: user.id
    });
    const result = await shelf.save();
    res.send(result);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.findShelfById = async (req, res, next) => {
  try {
    /* Uncomment this and info below when everything else will be ready
    const { user } = jwt.decode(req.headers.authorization.substr(7)); */

    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';
    const { id } = req.params;
    const result = await Shelf.findById(id);
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

exports.deleteShelf = async (req, res, next) => {
  try {
    /* Uncomment this and info below when everything else will be ready
    const { user } = jwt.decode(req.headers.authorization.substr(7)); */

    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';
    const { id } = req.params;
    const result = await Shelf.findByIdAndDelete(id);
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

exports.updateShelf = async (req, res, next) => {
  try {
    /* Uncomment this and info below when everything else will be ready
    const { user } = jwt.decode(req.headers.authorization.substr(7)); */

    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';
    const { id } = res.params;
    const updated = {
      name: req.body.name,
      tags: req.body.tags
    };
    const result = await Shelf.findByIdAndUpdate(id, updated, { new: true });
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
