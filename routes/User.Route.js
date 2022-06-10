const express = require('express');
const UserController = require('../controllers/User.Controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);
// TODO: Add admin middleware
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.findUserById);
router.post('/', UserController.createUser);
router.patch('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.put('/:id/password', UserController.changePassword);
router.post('/:id/admin-permissions', UserController.grantAdminPermissions);

module.exports = router;
