const express = require('express');
const AuthController = require('../controllers/Auth.Controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
// TODO: Add auth middleware for request bellow
router.use(authMiddleware);
// This terrible naming is temporary
router.put('/password', AuthController.changePassword);

module.exports = router;
