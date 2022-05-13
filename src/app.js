const express = require('express');
const bookRoutes = require('../routes/Book.Route');
const userRoutes = require('../routes/User.Route');

const app = express();

app.use('/books', bookRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'You can use /books prefix to test it'
  });
});

module.exports = app;
