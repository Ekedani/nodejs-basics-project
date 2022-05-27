const express = require('express');

const bookRoutes = require('../routes/Book.Route');
const userRoutes = require('../routes/User.Route');
const recommendationRoutes = require('../routes/Recommendation.Route');

require('../database/databaseConection')();

const app = express();

app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/recommendation', recommendationRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'You can use /books prefix to test it'
  });
});

module.exports = app;
