const express = require('express');
const RoleController = require('../controllers/Role.Controller');
const authMiddleware = require('../middlewares/auth');
const isAdminMiddleware = require('../middlewares/isAdmin');

const router = express.Router();
router.use(authMiddleware);
router.use(isAdminMiddleware);
router.get('/', RoleController.getAllRoles);

module.exports = router;
