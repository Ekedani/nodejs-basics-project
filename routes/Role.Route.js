const express = require('express');
const RoleController = require('../controllers/Role.Controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();
router.use(authMiddleware);
// TODO: Add admin middleware
router.get('/', RoleController.getAllRoles);

module.exports = router;
