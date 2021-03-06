const express = require('express');
const createError = require('http-errors');
const logger = require('../logs/logger');

const bookRoutes = require('../routes/Book.Route');
const shelfRoutes = require('../routes/Shelf.Route');
const userRoutes = require('../routes/User.Route');
const recommendationRoutes = require('../routes/Recommendation.Route');
const rolesRoutes = require('../routes/Role.Route');
const authRoutes = require('../routes/Auth.Route');
const accountRoutes = require('../routes/Account.Route');

require('../database/databaseConection')();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info({
    message: `Resource requested: ${req.method} ${req.originalUrl}`
  });
  next();
});

app.get('/', (req, res) => {
  res.send({
    message:
      'You should login or register and then use any of implemented endpoints'
  });
});

app.use('/auth', authRoutes);
app.use('/account', accountRoutes);
app.use('/books', bookRoutes);
app.use('/shelves', shelfRoutes);
app.use('/recommendation', recommendationRoutes);
app.use('/users', userRoutes);
app.use('/roles', rolesRoutes);

app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const errors = [];
  if (!Array.isArray(err)) {
    errors.push({
      status: err.status || 500,
      message: err.message || 'An error occured'
    });
  } else {
    err.forEach((x) => {
      errors.push({
        status: x.status || 500,
        message: x.message || 'An error occured'
      });
    });
  }
  errors.forEach((x) => {
    logger.error({
      message: `${x.message} (status code ${x.status || 500})`
    });
  });

  res.status(errors[0].status || 500);
  res.send({ errors });
});

module.exports = app;
