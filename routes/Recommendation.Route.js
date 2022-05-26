const express = require('express');
const BookController = require('../controllers/Recommendation.Controller');

const router = express.Router();

router.get('/', BookController.getRandomBook);

module.exports = router;
