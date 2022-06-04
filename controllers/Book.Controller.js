const createError = require('http-errors');
/*eslint-disable */
const mongoose = require('mongoose');
const Book = require('../models/Book.Model');

const NOT_FOUND_MSG = 'Book not found';

exports.getAllBooks = async (req, res, next) => {
  try {
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const books = await Book.find({});
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
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const book = new Book({
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      user
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
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const { id } = req.params;
    const result = await Book.findById(id);
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
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
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
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const { id } = req.params;
    const updated = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description
    };
    const result = await Book.findByIdAndUpdate(id, updated, { new: true });
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
