const createError = require('http-errors');
const mongoose = require('mongoose');
const Shelf = require('../models/Shelf.Model');
const Book = require('../models/Book.Model');

const NOT_FOUND_MSG = 'Shelf not found';

exports.getAllShelves = async (req, res, next) => {
  try {
    const { user } = req.token;
    const shelves = await Shelf.find({ user: user.id });
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
    const { user } = req.token;
    const shelf = new Shelf({
      name: req.body.name,
      tags: req.body.tags,
      user: user.id
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
    const { user } = req.token;
    const { id } = req.params;
    const result = await Shelf.findOne({
      _id: id,
      user: user.id
    });
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
    const { user } = req.token;
    const { id } = req.params;
    const result = await Shelf.findOneAndDelete({
      _id: id,
      user: user.id
    });
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
    const { user } = req.token;
    const { id } = req.params;
    const updated = {
      name: req.body.name,
      tags: req.body.tags
    };
    const result = await Shelf.findOneAndUpdate(
      {
        _id: id,
        user: user.id
      },
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

exports.getBooksOnShelf = async (req, res, next) => {
  try {
    const { user } = req.token;
    const { id } = req.params;
    const shelf = await Shelf.findOne({
      _id: id,
      user: user.id
    });
    if (!shelf) {
      throw createError(404, NOT_FOUND_MSG);
    }
    const result = await Book.find({ _id: { $in: shelf.books } });
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.addBookToShelf = async (req, res, next) => {
  try {
    const { user } = req.token;
    const { id } = req.params;
    const { bookId } = req.body;
    const book = await Book.findOne({
      _id: bookId,
      user: user.id
    });
    if (!book) {
      throw createError(404, 'Book not found');
    }
    const shelf = await Shelf.findOne({
      _id: id,
      user: user.id
    });
    if (!shelf) {
      throw createError(404, NOT_FOUND_MSG);
    }
    if (shelf.books.includes(bookId)) {
      throw createError(400, 'This book is already on the shelf');
    }
    const result = await Shelf.findByIdAndUpdate(
      id,
      { $push: { books: bookId } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteBookFromShelf = async (req, res, next) => {
  try {
    const { user } = req.token;
    const { id, bookId } = req.params;
    const shelf = await Shelf.findOne({
      _id: id,
      user: user.id
    });
    if (!shelf) {
      throw createError(404, NOT_FOUND_MSG);
    }
    if (!shelf.books.includes(bookId)) {
      throw createError(404, 'Book not found');
    }
    const result = await Shelf.findByIdAndUpdate(
      id,
      { $pull: { books: bookId } },
      { new: true }
    );
    res.send(result);
  } catch (err) {
    next(err);
  }
};
