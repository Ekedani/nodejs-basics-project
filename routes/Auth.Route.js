const express = require('express');
const AuthController = require('../controllers/Auth.Controller');
const authMiddleware = require('../middlewares/auth');
const bearerMiddleware = require('../middlewares/bearer');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.use(bearerMiddleware);
router.use(authMiddleware);

// This terrible naming is temporary
router.put('/password', AuthController.changePassword);

module.exports = router;
