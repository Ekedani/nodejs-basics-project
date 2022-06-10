const express = require('express');
const BookController = require('../controllers/Book.Controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);
router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.findBookById);
router.post('/', BookController.createBook);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
