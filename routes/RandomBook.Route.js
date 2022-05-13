const express = require('express');
const BookController = require('../controllers/Book.Controller');

const router = express.Router();

router.get('/book', BookController.getRandomBook);

module.exports = router;
