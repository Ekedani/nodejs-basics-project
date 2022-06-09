const createError = require('http-errors');
const mongoose = require('mongoose');
const Book = require('../models/Book.Model');

const NOT_FOUND_MSG = 'Book not found';

exports.getAllBooks = async (req, res, next) => {
  try {
    const { user } = req.token;
    const books = await Book.find({ user: user.id });
    res.send(books);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const { user } = req.token;
    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      user: user.id
    });
    const result = await book.save();
    res.send(result);
  } catch (err) {
    if (err instanceof mongoose.Error.ValidatorError) {
      next(createError(400, err.message));
    }
    next(err);
  }
};

exports.findBookById = async (req, res, next) => {
  try {
    const { user } = req.token;
    const { id } = req.params;
    const result = await Book.findOne({ _id: id, user: user.id });
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

exports.deleteBook = async (req, res, next) => {
  try {
    const { user } = req.token;
    const { id } = req.params;
    const result = await Book.findOneAndDelete({ _id: id, user: user.id });
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

exports.updateBook = async (req, res, next) => {
  try {
    const { user } = req.token;
    const { id } = req.params;
    const updated = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description
    };
    const result = await Book.findOneAndUpdate(
      { _id: id, user: user.id },
      updated,
      { new: true }
    );
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
