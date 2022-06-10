const express = require('express');
const AccountController = require('../controllers/Account.Controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);
router.put('/password', AccountController.changePassword);

module.exports = router;
