const express = require('express');
const bookRoutes = require('../routes/Book.Route');

const app = express();

app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'You can use /books prefix to test it'
  });
});

module.exports = app;
