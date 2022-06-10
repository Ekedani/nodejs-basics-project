const express = require('express');
const BookController = require('../controllers/Recommendation.Controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);
router.get('/', BookController.getRandomBook);

module.exports = router;
