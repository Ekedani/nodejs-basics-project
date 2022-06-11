const express = require('express');
const UserController = require('../controllers/User.Controller');
const authMiddleware = require('../middlewares/auth');

const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();

router.use(authMiddleware);
// TODO: Add admin middleware
router.get('/', isAdmin, UserController.getAllUsers);
router.get('/:id', isAdmin, UserController.findUserById);
router.post('/', isAdmin, UserController.createUser);
router.patch('/:id', isAdmin, UserController.updateUser);
router.delete('/:id', isAdmin, UserController.deleteUser);

router.put('/:id/password', isAdmin, UserController.changePassword);
router.post(
  '/:id/admin-permissions',
  isAdmin,
  UserController.grantAdminPermissions
);

module.exports = router;
