const express = require('express');
const RoleController = require('../controllers/Role.Controller');

const router = express.Router();

router.get('/', RoleController.getAllRoles);

module.exports = router;
