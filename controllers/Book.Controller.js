const createError = require('http-errors');
const Book = require('../models/Book.Model');

exports.getAllBooks = async (req, res, next) => {
  try {
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const books = await Book.find();
    res.send(books);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const book = new Book(req.body);
    const result = await book.save();
    res.send(result);
  } catch (err) {
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
      throw createError(404, 'Book doesn`t exist.');
    }
    res.send(result);
  } catch (err) {
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
      throw createError(404, 'Book doesn`t exist.');
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    // TODO: Will be changed when auth will be implemented
    // eslint-disable-next-line no-unused-vars
    const user = '629121bd23f06b34fd02ee6f';

    const { id } = res.params;
    const updated = req.body;
    const result = await Book.findByIdAndUpdate(id, updated, { new: true });
    if (!result) {
      throw createError(404, 'Book doesn`t exist.');
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};
