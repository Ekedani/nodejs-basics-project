const express = require('express');
const RoleController = require('../controllers/Role.Controller');
const authMiddleware = require('../middlewares/auth');

const isAdmin = require('../middlewares/isAdmin');

const router = express.Router();
router.use(authMiddleware);
// TODO: Add admin middleware
router.get('/', isAdmin, RoleController.getAllRoles);

module.exports = router;
