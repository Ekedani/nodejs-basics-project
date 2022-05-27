const createError = require('http-errors');
/* eslint-disable */
const mongoose = require('mongoose');

const Book = require('../models/Book.Model');

exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (err) {
    next(err);
  }
};

exports.createBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    const result = await book.save();
    res.send(result);
  } catch (err) {
    next(err);
  }
};

exports.findBookById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      throw createError(404, 'Book doesn`t exist.');
    }
    res.send(book);
  } catch (err) {
    next(err);
  }
};

exports.deleteBook = async (req, res, next) => {
  const id = req.params.id;
  try {
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
  const { id } = res.params;
  const updates = req.body;
  const options = { new: true };
  try {
    const result = await Book.findByIdAndUpdate(id, updates, options);
    if (!result) {
      throw createError(404, 'Book doesn`t exist.');
    }
    res.send(result);
  } catch (err) {
    next(err);
  }
};
