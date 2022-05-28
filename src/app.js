const express = require('express');
const createError = require('http-errors');

const bookRoutes = require('../routes/Book.Route');
const userRoutes = require('../routes/User.Route');
const recommendationRoutes = require('../routes/Recommendation.Route');

require('../database/databaseConection')();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/recommendation', recommendationRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'You can use /books prefix to test it'
  });
});

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // TODO: We can put here logger later
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});

module.exports = app;
