const express = require('express');
const AuthController = require('../controllers/Auth.Controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.use(authMiddleware);

module.exports = router;
