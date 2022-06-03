const express = require('express');
const ShelfController = require('../controllers/Shelf.Controller');

const router = express.Router();

router.get('/', ShelfController.getAllShelves);
router.get('/:id', ShelfController.findShelfById);
router.post('/', ShelfController.createShelf);
router.put('/:id', ShelfController.updateShelf);
router.delete('/:id', ShelfController.deleteShelf);

/* We don't need operations similar to ones from /book router here.
 It's just work with collections of IDs */

router.get('/:id/books/', ShelfController.getBooksOnShelf);
router.post('/:id/books', ShelfController.addBookToShelf);
router.delete('/:id/books/:bookId', ShelfController.deleteBookFromShelf);

module.exports = router;
