const express = require('express');
const UserController = require('../controllers/User.Controller');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.findUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;
