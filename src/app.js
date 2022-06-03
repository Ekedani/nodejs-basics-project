const express = require('express');
const createError = require('http-errors');
const logger = require('../logs/logger');

const bookRoutes = require('../routes/Book.Route');
const shelfRoutes = require('../routes/Shelf.Route');
const userRoutes = require('../routes/User.Route');
const recommendationRoutes = require('../routes/Recommendation.Route');
const rolesRoutes = require('../routes/Role.Route');
const authRoutes = require('../routes/Auth.Route');

require('../database/databaseConection')();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.log({
    message: `Resource requested: ${req.method} ${req.originalUrl}`,
    level: 'info'
  });
  next();
});

app.use('/books', bookRoutes);
app.use('/shelves', shelfRoutes);
app.use('/users', userRoutes);
app.use('/recommendation', recommendationRoutes);
app.use('/roles', rolesRoutes);
app.use('/auth', authRoutes);

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
  logger.log({
    message: `${err.message} (status code ${err.status || 500})`,
    level: 'error'
  });
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message || 'An error occured'
    }
  });
});

module.exports = app;
