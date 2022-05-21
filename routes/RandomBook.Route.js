const express = require('express');
const BookController = require('../controllers/Random.Controller');

const router = express.Router();

router.get('/random', BookController.getRandomBook);

module.exports = router;
