const express = require('express');
const BookController = require('../controllers/Book.Controller');

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.findBookById);
router.post('/', BookController.createBook);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);

module.exports = router;
