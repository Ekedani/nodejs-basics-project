const express = require('express');
const ShelfController = require('../controllers/Shelf.Controller');

const router = express.Router();

router.get('/', ShelfController.getAllShelves);
router.get('/:id', ShelfController.findShelfById);
router.post('/', ShelfController.createShelf);
router.put('/:id', ShelfController.updateShelf);
router.delete('/:id', ShelfController.deleteShelf);

module.exports = router;
